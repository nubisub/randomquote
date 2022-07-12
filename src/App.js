import fetch from 'node-fetch';

import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Container} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import {useEffect, useState} from "react";

function Quote(props){
    return (
        <>
            <p id="text" className="text-3xl mx-0">{props.quote.quote}</p>
            <p id="author" className="text-xl text-center sm:text-right my-4 font-light " >- {props.quote.author}</p>
        </>
    )
}

function App(){

    const [count, setCount] = useState(0)
    const [quote, setQuote] = useState({quote:'', author:''});
    const [color, setColor] = useState('')

    function colorRespond(){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6878024220mshd9eb70b208c93eap163c79jsna2fce556f4a4',
                'X-RapidAPI-Host': 'random-palette-generator.p.rapidapi.com'
            }
        };

        fetch('https://random-palette-generator.p.rapidapi.com/palette/10/3', options)
            .then(response => response.json())
            .then(response => setColor(response.data[0].palette[0]))
    }

    function quoteRespond(){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6878024220mshd9eb70b208c93eap163c79jsna2fce556f4a4',
                'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
            }
        };

        fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
            // .then(response => console.log(response.status))
            .then(
                response =>
                    response.json())
            .then(
                response =>  {
                    if(response.message === "You have exceeded the rate limit per second for your plan, BASIC, by the API provider"){
                        let updatedValue = {
                            quote : "Too Many Request :( ",
                            author : "Hirohito"
                        }
                        setQuote(quote => ({
                            ...quote,
                            ...updatedValue
                        }))
                    } else {
                        let updatedValue = {
                            quote : response.content,
                            author : response.originator.name
                        }
                        setQuote(quote => ({
                            ...quote,
                            ...updatedValue
                        }))
                    }
                }
            )
    }

    useEffect(() => {
        quoteRespond()
        colorRespond()

    },[count] );


    return(
        <div id="quote-box" className="App h-screen flex items-center p-8" style={{backgroundColor : color}} >
            <Container maxWidth="sm" className="">
                <Box className="p-12 " sx={{ bgcolor: '#cfe8fc' }} >
                    <Quote quote={quote}/>
                    <div className="sm:grid sm:grid-cols-2 sm:mt-8" >
                        <div className="flex sm:justify-start justify-left">
                            <Button id="tweet-quote" style={{backgroundColor : color}}  sx={{padding:0, width: {xs: 1/2, sm:"auto"},}} variant="contained" ><a target="_blank" className="h-full w-full flex items-center justify-center" href={"https://twitter.com/intent/tweet?text="+ quote.quote + " - "+ quote.author}><TwitterIcon/></a></Button>
                            <Button style={{backgroundColor : color}}  sx={{ml: 1, width: {xs: 1/2, sm:"auto"}}}  variant="contained" ><a className="h-full w-full flex items-center justify-center" href="#"><RedditIcon/></a></Button>
                        </div>
                        <div className="flex sm:justify-end justify-left sm:mt-0 mt-2">
                            <Button id="new-quote" style={{backgroundColor : color}}  onClick={() => setCount((c) => c + 1)}  sx={{textTransform: 'none',  width: {xs: 1, sm:"auto"}}} variant="contained" >New Quote</Button>
                        </div>
                    </div>
                </Box>
            </Container>
        </div>
    )
}

export default App;
