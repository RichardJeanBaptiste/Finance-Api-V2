import { NextResponse } from "next/server";
import { Logins } from "../Schemas";
import mongoose from "mongoose";
import  bcrypt  from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

const saltRounds = 10;
let secretKey: Secret; 

// if(process.env.NEXT_PUBLIC_SECRET_KEY != undefined){
//   secretKey= process.env.NEXT_PUBLIC_SECRET_KEY;
// };

if(process.env.SECRET_KEY != undefined){
    secretKey = process.env.SECRET_KEY;
};


function generateToken(payload: any) {
    return jwt.sign({data: payload}, secretKey, { expiresIn: 60 * 60 });
}


export async function POST(request: Request){


    try {
        let mongo_uri:string | undefined = process.env.MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri,{
                dbName:'Finance-Quotes',
            });
        }
    
        let data = await request.json();
        let passwordAttempt = data.password;


        let query: null | boolean = await Logins.findOne({username: data.username}).then((docs) => {

            if(docs === null){
                return null;
            } 


            return new Promise((resolve, reject) => {
                bcrypt.compare(passwordAttempt,docs.password ,function(err, result){
                    //console.log(result);
                    if(err){
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        });

        if(query === true){
            return NextResponse.json({msg: "Correct", token: generateToken(data.username)}, {status: 200});
        } else if(query === false){
            return NextResponse.json({msg: "Incorrect"}, {status: 200});
        } else if(query === null){
            return NextResponse.json({msg: "Incorrect"}, {status: 200});
        } else {
            console.log(query);
            return NextResponse.json({msg: "Error"}, {status: 200});
        }

        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}