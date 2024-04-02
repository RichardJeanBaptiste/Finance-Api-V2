import { NextResponse } from "next/server";
import jwt, { Secret } from 'jsonwebtoken';


let secretKey: Secret; 

if(process.env.NEXT_PUBLIC_SECRET_KEY != undefined){
  secretKey= process.env.NEXT_PUBLIC_SECRET_KEY;
};

function verifyToken(token: string) {

    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      return null; // Token is invalid
    }
  }

export async function POST(request: Request){
    try {
    
        let data = await request.json();
        
        let isLoggedIn = verifyToken(data.token);

        return NextResponse.json({isLoggedIn: isLoggedIn}, {status: 200});

        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}