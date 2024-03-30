"use client"

import {useState} from 'react';
import axios from 'axios';


export default function Dashboard() {

    const [currentQuote, SetCurrentQuote] = useState("");
    const [quotes, SetQuotes] = useState<any>([]);
    const [formValues, SetFormValues] = useState({
        name: '',
        image: '',
        quote: '',
        desc: '',
        life: '',
        wiki: '',
        education: '',
        occupation: '',
    })

    const handleChange = (e: any) => {
        console.log(e);
        const { name, value } = e.target;
        console.log(name + " " + value);
        SetFormValues({ ...formValues, [name]: value });
    }

    const handleCurrentQuote = (e: any) => {
        SetCurrentQuote(e.target.value);
    }

    const addQuoteToList = (e: any) => {

        e.preventDefault();

        if(currentQuote != ""){
            let temp = [...quotes];
            temp.push(currentQuote);
            SetQuotes(temp);
            SetCurrentQuote("");
        } 
    }

    const removeQuote = (quoteToRemove: string) => {

        let temp =[...quotes];
        temp = temp.filter((item) => item !== quoteToRemove);
        SetQuotes(temp);
    }

    
    const handleSubmit = (e: any) => {

        e.preventDefault();

        axios.post('/api/add_quote', formValues)
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
        console.log("submit");
    }

    const clearFields = () => {
        SetFormValues({
            name: '',
            image: '',
            quote: '',
            desc: '',
            life: '',
            wiki: '',
            education: '',
            occupation: '',
        })
    }


    return (
        <div>
            <h3>Dashboard</h3>

            <button onClick={clearFields}>Clear</button>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column'}}>
                    <input placeholder="Name" type="text" name="name" onChange={handleChange} value={formValues.name}/>
                    <input placeholder="Image" type="text" name="image" onChange={handleChange} value={formValues.image}/>
                    <textarea placeholder="Description" name="desc" rows={4} cols={50} onChange={handleChange} value={formValues.desc}/>
                    <input placeholder="Life" type="text" name="life" onChange={handleChange} value={formValues.life}/>
                    <input placeholder="Wiki" type="text" name="wiki" onChange={handleChange} value={formValues.wiki}/>
                    <input placeholder="Education" name="education" type="text" onChange={handleChange} value={formValues.education}/>
                    <input placeholder="Occupation" name="occupation" type="text" onChange={handleChange} value={formValues.occupation}/>
                    <input value="Submit" type="submit"/>
                </form>

                <div>
                    <form onSubmit={addQuoteToList}>
                        <input placeholder="Enter Quote" value={currentQuote} type="text" onChange={handleCurrentQuote}/>
                        <button type="submit">+</button>
                    </form>
                </div>

                <div>
                    <ul>
                        {quotes.map((x: string, i:any) => {
                            return (
                                <div style={{ display: 'flex', flexDirection: 'row'}} key={i}>
                                    <li key={i}>{x}</li>
                                    <button onClick={() => removeQuote(x)}>X</button>
                                </div>
                            )
                        })}
                    </ul>
                </div> 
                
            </div>
        </div>
    )
}