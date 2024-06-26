import { NextResponse } from "next/server";
import { Quotes } from "../Schemas";
import mongoose from "mongoose";



export async function POST(request: Request){

    try {
        let mongo_uri:string | undefined = process.env.NEXT_PUBLIC_MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri,{
                dbName:'Finance-Quotes',
            });
        }
    
        let data = await request.json();

        for(let i = 0; i < data.quotes.length; i++){
            let newQuote = new Quotes({
                name: data.name.toLowerCase(),
                quote: data.quotes[i],
                image: data.image,
                bio: {
                    desc: data.desc,
                    life: data.life,
                    wiki: data.wiki,
                    education: data.education,
                    occupation: data.occupation
                }
            })
            
            await newQuote.save();
        }
        
        mongoose.disconnect();
        return NextResponse.json({msg: "Quote Saved"}, {status: 200});
        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}