import connectToMongoDB from "db/config";
import Users from "models/User.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToMongoDB();

export const POST = async (NextRequest) => {
  try {
    const body = await NextRequest.json();
    const { serverPass } = body;
    const token = NextRequest.cookies.get("token")?.value || "";
    console.log({token})

    if (serverPass !== process.env.NEXT_PUBLIC_SERVER_PASSWORD) {
      const response = NextResponse.json(
        {
          password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
          error: "Access denied...",
        },
        {
          status: 400,
        }
      );
      return response;
    }

    if (token !== "") {
      const jwt__Key = process.env.NEXT_PUBLIC_NCT_JWT_KEY;
      try {
        const data = jwt.verify(token, jwt__Key);

        const userData = await Users.findById(data.credentials.id).select(
          "-_password"
        );
        if (!userData) {
          const response = NextResponse.json(
            {
              password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
              error: "Token validation failed...",
            },
            {
              status: 400,
            }
          );
          return response;
        } else {
          const response = NextResponse.json(
            {
              password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
              message: "User data fetched successfully...",
              data: userData,
            },
            {
              status: 200,
            }
          );
          return response;
        }
      } catch (error) {
        const response = NextResponse.json(
          {
            password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
            error: "Token validation failed...",
          },
          {
            status: 400,
          }
        );
        return response;
      }
    } else {
      const response = NextResponse.json(
        {
          password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
          error: "Token validation failed...",
        },
        {
          status: 400,
        }
      );
      return response;
    }
  } catch (error) {
    console.log("Error", error);
    const response = NextResponse.json(
      {
        password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
        error: "Internal server error...",
      },
      {
        status: 500,
      }
    );
    return response;
  }
};
