"use server"

import { SignInType } from "@/components/forms/schemas/auth"
import { Session } from "@/types/auth-response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function login(data: SignInType) {

  try {
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
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
