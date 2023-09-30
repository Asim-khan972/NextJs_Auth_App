import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextApiRequest } from "next";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

console.log(process.env.TOKEN_SECRET_KEY);

export async function POST(request: NextApiRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return Response.json({ error: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const SaveNewUser = await newUser.save();

    console.log(SaveNewUser);

    await sendEmail({ email, emailType: "VERIFY", userId: SaveNewUser._id });

    return Response.json({
      message: "User created successfully",
      success: true,
      SaveNewUser,
    });
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
