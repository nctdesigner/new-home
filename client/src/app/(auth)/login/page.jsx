"use client";

import { LoginPageView } from "pages-sections/sessions/page-view";

export default function Login() {
  if (typeof window !== 'undefined') {
    const userToken = localStorage.getItem(
      process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY
      );
      return <LoginPageView authToken={userToken} />;
    }
  }