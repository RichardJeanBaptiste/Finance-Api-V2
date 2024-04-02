import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { Quotes } from "../Schemas";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";



export async function GET(request: NextRequest){
    try {
        let mongo_uri:string | undefined = process.env.NEXT_PUBLIC_MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri,{
                dbName:'Finance-Quotes',
            });
        }


        const names = await Quotes.distinct('name');
        //console.log(names);

        return NextResponse.json(names, {status: 200});

    } catch (error) {
  
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.log(error);
    }
}