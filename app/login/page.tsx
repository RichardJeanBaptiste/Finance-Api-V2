"use client"

import {useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function Login() {

    const router = useRouter();
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");

    const handleUsername = (e:any) => {
        SetUsername(e.target.value);
    }

    const handlePassword = (e:any) => {
        SetPassword(e.target.value);
    }

    const handleSubmit = (e:any) => {
        // `${uri}}/api/login`
        axios.post(`/api/login`, {
            username: username,
            password: password
        }).then((response) => {
            if(response.data.msg === "Correct"){
                alert("Login Successful");
                router.push('/dashboard');
            } else if(response.data.msg === "Incorrect"){
                alert("Username of Password incorrect");
            } else {
                alert(" Server Error :(");
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div>
            <h3>Admin Login</h3>
            <br/>
            <form action={handleSubmit}>
                <input type="text" placeholder='username' onChange={handleUsername}/>
                <input type="password" placeholder='password' onChange={handlePassword}/>
                <input type="submit"/>
            </form>
        </div>
    )   
    
}