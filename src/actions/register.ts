"use server"

import { SignUpType } from "@/components/forms/schemas/auth";
import { Session } from "@/types/auth-response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function register(data: SignUpType) {

  try {
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Помилка: ${response.statusText}`);
      }



    const result = await response.json() as Session

    cookies().set("session", result.sessionToken);
    cookies().set("user", JSON.stringify(result.user))

    redirect("/rooms")
  } catch (error) {
    throw error;
  }
}
