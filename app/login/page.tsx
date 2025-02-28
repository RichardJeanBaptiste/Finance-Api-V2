"use client"

import {useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import "./styles.css";


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
        axios.post(`/api/login`, {
            username: username,
            password: password
        }).then((response) => {
            console.log(response)
            if(response.data.msg === "Correct"){
                alert("Login Successful");
                localStorage.setItem("jwtToken", response.data.token);
                router.push(`/dashboard/${username}`);
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
        <div className='root'>
            <div className='form_container'>
                <h3 style={{ textAlign: 'center', marginTop: '20%'}}>Admin Login</h3>
                <br/>
                <form action={handleSubmit} className='login_form'>
                    <div className='login_form1'>
                        <input type="text" placeholder='username' onChange={handleUsername}/>
                        <input type="password" placeholder='password' onChange={handlePassword}/>
                        <input type="submit"/>
                    </div>
                </form>
            </div> 
        </div>
    )   
    
}