import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import cookie from 'cookie';
import { cookies } from "next/headers";

connectDB();

export async function POST(request: NextApiRequest) {
  try {
    /// here we get the data from body
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ error: "User does not exist" }, { status: 400 });
    }
    // console.log("user exists");

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return Response.json({ error: "Invalid password" }, { status: 400 });
    }
    // console.log(user);

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, "ASIMKHAN", { expiresIn: "1d" });

    // console.log(token)
    const response = Response.json({
      message: "Login successful",
      success: true,
    });
    // console.log(response)

    cookies().set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
