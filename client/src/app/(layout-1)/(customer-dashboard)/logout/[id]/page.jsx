"use client";
import { useRouter } from "next/navigation";

export default async function Orders() {
    const router = useRouter()
    if(typeof window != "undefined") {
        localStorage.clear()
        router.push("/login")
    }
  }
