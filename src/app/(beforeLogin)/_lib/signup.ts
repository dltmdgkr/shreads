import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signUpHandler = async (prevState: any, formData: FormData) => {
  const supabase = await createServerSupabaseClient();

  if (!formData?.get("email") || !(formData.get("email") as string)?.trim()) {
    return { message: "no_email" };
  }
  if (!formData?.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }

  const imageFile = formData?.get("image");

  if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0) {
    return { message: "no_image" };
  }

  let shouldRedirect = false;
  try {
    const email = formData.get("email") as string;
    const username = formData.get("name") as string;
    const password = formData.get("password") as string;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Image upload error:", uploadError.message);
      return { message: "image_upload_error" };
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const avatarUrl = publicUrlData?.publicUrl;

    if (!avatarUrl) {
      return { message: "image_url_error" };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          email: email,
          user_name: username,
          avatar_url: avatarUrl,
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_SHREADS_URL
          ? `${process.env.NEXT_PUBLIC_SHREADS_URL}/auth/callback`
          : "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.error("Sign up error:", error.message);
      return { message: "sign_up_error" };
    }

    shouldRedirect = true;
  } catch (err) {
    console.error(err);
    return { message: "unexpected_error" };
  }

  if (shouldRedirect) {
    redirect("/login");
  }

  return { message: null };
};

export default signUpHandler;
