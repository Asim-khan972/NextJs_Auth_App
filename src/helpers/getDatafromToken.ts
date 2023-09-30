import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
export const getDataFromToken = (request : NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value ||""

    const decodeToken : any =  jwt.verify(token, "ASIMKHAN")

    return decodeToken.id
    } catch (error) {
       console.log(error)
    }
}