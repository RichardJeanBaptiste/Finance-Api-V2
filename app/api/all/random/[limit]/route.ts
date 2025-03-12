import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { Quotes } from "../../../Schemas";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";



export async function GET(request: NextRequest){

    const url = new URL(request.url);
    let modifiedUrl = url.href.replace(`${process.env.NEXT_PUBLIC_HOST}/api/all/`, '');
    let lastIndex = modifiedUrl.lastIndexOf("/");
    modifiedUrl = modifiedUrl.substring(lastIndex + 1);

    try {
        let mongo_uri:string | undefined = process.env.NEXT_PUBLIC_MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri,{
                dbName:'Finance-Quotes',
            });
        }

        let query = await Quotes.find({}).then((docs) => {

            let random = Math.floor(Math.random() * docs.length)

            let quotelist = [];

            for(let i = 0; i < parseInt(modifiedUrl); i++){
                random = Math.floor(Math.random() * docs.length);
                quotelist.push(docs[random])
            }

            mongoose.disconnect();
            console.log(quotelist);
            return quotelist;
        });
    
        const response = NextResponse.json({query}, {status: 200});
        response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
        response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        response.headers.set('cache', 'no-store');

        return response;
        //return NextResponse.json(query, {status: 200})
  
    } catch (error) {
  
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.log(error);
    }
}