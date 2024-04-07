import connectToMongoDB from "db/config";
import Users from "models/User.model";
import { NextRequest, NextResponse } from "next/server";

connectToMongoDB();

export const POST = async (NextRequest) => {
  try {
    const body = await NextRequest.json();
    const { userUpdates, serverPass, id } = body;
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

    if (!userUpdates) {
      const response = NextResponse.json(
        {
          password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
          error: "User updates are required...",
        },
        {
          status: 401,
        }
      );
      return response;
    }

    await Users.findByIdAndUpdate(id, userUpdates);
    const updatedUser = await Users.findById(id);

    if (!updatedUser) {
        const response = NextResponse.json(
            {
              password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
              error: "User updation thread failed...",
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
              message: "User updation thread flaged...",
              data: updatedUser
            },
            {
              status: 200,
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
