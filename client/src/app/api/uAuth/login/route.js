import connectToMongoDB from "db/config";
import Users from "models/User.model";
import { NextRequest, NextResponse } from "next/server";
import Ignite__Decryption from "lib/decryption/decrypter";
import jwt from "jsonwebtoken";

connectToMongoDB();

export const POST = async (NextRequest) => {
  try {
    const body = await NextRequest.json();
    const { email, password, serverPass } = body;
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

    if (!email || !password) {
      const response = NextResponse.json(
        {
          password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
          error: "Email & password is required...",
        },
        {
          status: 401,
        }
      );
      return response;
    }

    let user = await Users.findOne({
      _email: email,
    });
    if (!user) {
      const response = NextResponse.json(
        {
          password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
          error: "Wrong credentials entered...",
        },
        {
          status: 400,
        }
      );
      return response;
    }

    let decryptedPassword = Ignite__Decryption(user._password);
    if (password === decryptedPassword) {
      const payload = {
        credentials: {
          id: user._id,
        },
      };

      const token = jwt.sign(payload, process.env.NEXT_PUBLIC_NCT_JWT_KEY);

      const response = NextResponse.json(
        {
          message: "Authentication successfully flaged...",
          password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
          credentials: {
            authToken: token,
          },
        },
        {
          status: 200,
        }
      );

      response.cookies.set("token", token, { httpOnly: true });
      return response;
    } else {
      const response = NextResponse.json(
        {
          password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
          error: "Wrong credentials entered...",
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
