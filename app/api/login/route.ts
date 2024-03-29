import { NextResponse } from "next/server";
import { Logins } from "../Schemas";
import  bcrypt  from 'bcrypt';



export async function POST(request: Request){

    const saltRounds = 10;

    try {
        let mongo_uri:string | undefined = process.env.NEXT_PUBLIC_MONGO_URI;

        
    } catch (error) {
        
        // console.log(process.env.MONGO_URI);
        console.log(error);
        
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}