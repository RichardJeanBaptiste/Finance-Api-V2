import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { Quotes } from "../../../Schemas";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { parse } from "path";



export async function GET(request: NextRequest){

    const url = new URL(request.url);

    
    let modifiedUrl = url.href.replace(`${process.env.NEXT_PUBLIC_HOST}/api/all/`, '');
    let modifiedUrlArr = modifiedUrl.split("/");

    let author = modifiedUrlArr[2].replaceAll("_", " ");
    let limit = modifiedUrlArr[3];


    try {
        let mongo_uri:string | undefined = process.env.NEXT_PUBLIC_MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri,{
                dbName:'Finance-Quotes',
            });
        }

        let query = await Quotes.find({name: author}).then((docs) => {

            let range;

            if(parseInt(limit) > docs.length){
                range = docs.length;
            } else {
                range = parseInt(limit);
            }
    
            let random = Math.floor(Math.random() * docs.length)

            let quotelist = [];

            
            for(let i = 0; i < range; i++){
                //random = Math.floor(Math.random() * docs.length);
                quotelist.push(docs[i])
            }

            mongoose.disconnect();
            return quotelist;
        });
    
        return NextResponse.json(query, {status: 200})
  
    } catch (error) {
  
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.log(error);
    }
}