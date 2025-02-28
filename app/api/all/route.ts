import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { Quotes } from "../Schemas";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";



export async function GET(request: NextRequest){
    try {
        //let mongo_uri:string | undefined = process.env.NEXT_PUBLIC_MONGO_URI;
        let mongo_uri:string | undefined = process.env.MONGO_URI;

        console.log(mongo_uri);

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri,{
                dbName:'Finance-Quotes',
            });
        } else {
            return NextResponse.json("Could Not Connect To Database", {status: 500});
        }

        let query = await Quotes.find({});

        return NextResponse.json(query, {status: 200});
  
    } catch (error) {
  
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.log(error);
    }
}