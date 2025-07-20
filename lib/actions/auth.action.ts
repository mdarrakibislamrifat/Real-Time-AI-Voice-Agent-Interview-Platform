"use server";

import { auth, db } from "@/firebase/admin";

import { cookies } from "next/headers";

interface SignUpParams {
  uid: string;
  name: string;
    email: string;
    password: string;
}



export async function signup(params: SignUpParams) {
  const { uid, name, email, password } = params;

  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (userDoc.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    // If user does not exist, create
    await db.collection("users").doc(uid).set({
      name,
      email,
      password
      
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating a user:", error);
    return {
      success: false,
      message: "Failed to create user",
    };
  }
}

export async function signIn(params: SignInParams) { 
    const { email, idToken } = params;
    try {

        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord) {
            return {
                success: false,
                message: "User not found. Please sign up.",
            };
        }
        await setSessionCookie(idToken);
        return {
            success: true,
            message: "User signed in successfully",
        };
        
    }catch (error: any) {
        
        return {
            success: false,
            message: "Failed to sign in",
        };
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 * 7 * 1000,
    })
    cookieStore.set('session', sessionCookie, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',

    })
    
}


export async function getCurrentUser(): Promise<User | null>{
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) return null;
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie,true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
        if (!userRecord.exists) return null;
        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    }catch (error: any) {
        console.error("Error getting current user:", error);
        return null;
    }

}



export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}