import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { Quotes } from "../../Schemas";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";



export async function GET(request: NextRequest){

    const url = new URL(request.url);
    let modifiedUrl = url.href.replace(`${process.env.NEXT_PUBLIC_HOST}/api/all/`, '');
    modifiedUrl = modifiedUrl.replace("_", " ");

    console.log("author route")
    console.log(modifiedUrl)

    try {
        let mongo_uri:string | undefined = process.env.NEXT_PUBLIC_MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri,{
                dbName:'Finance-Quotes',
            });
        }

        let query = await Quotes.find({"name": modifiedUrl});
    
        return NextResponse.json(query, {status: 200});
  
    } catch (error) {
  
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.log(error);
    }
}