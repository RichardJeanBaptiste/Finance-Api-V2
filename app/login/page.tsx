"use client"

import {useState} from 'react';

const uri = "localhost:3000";

export default function Login() {

    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");

    const handleUsername = (e:any) => {
        SetUsername(e.target.value);
    }

    const handlePassword = (e:any) => {
        SetPassword(e.target.value);
    }


    return (
        <div>
            <form action={`${uri}}/api/login`}>
                <input type="text" placeholder='username' onChange={handleUsername}/>
                <input type="password" placeholder='password' onChange={handlePassword}/>
                <input type="submit"/>
            </form>
        </div>
    )   
    
}