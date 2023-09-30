import { getDataFromToken } from "@/helpers/getDatafromToken";

import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
connectDB()
export async function GET(request : NextRequest) {
    
    try {
         const UserId = await getDataFromToken(request)
    const user = await User.findOne({_id : UserId}).select("-password")

    return NextResponse.json({
        message :"User Found", 
        data : user
    })
    } catch (error) {
         return NextResponse.json({
       error : error.message
    }) 
    }
   


}