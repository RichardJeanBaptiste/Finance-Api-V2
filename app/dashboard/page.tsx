"use client"

import {useState} from 'react';
import axios from 'axios';


export default function dashboard() {

    const [name, SetName] = useState("");
    const [image, SetImage] = useState("");
    const [quote, SetQuote] = useState("");
    const [desc, SetDesc] = useState("");
    const [life, SetLife] = useState("");
    const [wiki, SetWiki] = useState("");
    const [education, SetEducation] = useState("");
    const [occupation, SetOccupation] = useState("");


    const handleName = (e: any) => {
        SetName(e.target.value);
    }

    const handleImage = (e:any) => {
        SetImage(e.target.value);
    }

    const handleQuote = (e: any) => {
        SetQuote(e.target.value);
    }

    const handleDesc = (e: any) => {
        SetDesc(e.target.value);
    }

    const handleLife = (e: any) => {
        SetLife(e.target.value);
    }

    const handleWiki = (e: any) => {
        SetWiki(e.target.value);
    }

    const handleEducation = (e: any) => {
        SetEducation(e.target.value);
    }

    const handleOccupation = (e: any) => {
        SetOccupation(e.target.value);
    }
    
    const handleSubmit = (e: any) => {

        e.preventDefault();

        axios.post('/api/add_quote', {
            name: name,
            image: image,
            quote: quote,
            desc: desc,
            life: life,
            wiki: wiki,
            education: education,
            occupation: occupation
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
        console.log("submit");
    }
    const clearFields = () => {
        SetName("");
        SetImage("");
        SetQuote("");
        SetDesc("");
        SetLife("");
        SetWiki("");
        SetEducation("");
        SetOccupation("");
    }


    return (
        <div>
            <h3>Dashboard</h3>

            <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column'}}>
                    <input placeholder="Name" type="text" onChange={handleName} value={name}/>
                    <input placeholder="Image" type="text" onChange={handleImage} value={image}/>
                    <input placeholder="Quote" type="text"onChange={handleQuote} value={quote}/>
                    <textarea placeholder="Description" rows={4} cols={50} onChange={handleDesc} value={desc}/>
                    <input placeholder="Life" type="text" onChange={handleLife} value={life}/>
                    <input placeholder="Wiki" type="text" onChange={handleWiki} value={wiki}/>
                    <input placeholder="Education" type="text" onChange={handleEducation} value={education}/>
                    <input placeholder="Occupation" type="text" onChange={handleOccupation} value={occupation}/>
                    <input value="Submit" type="submit"/>
                </form> 

                <button onClick={clearFields}>Clear</button>
            </div>
        </div>
    )
}