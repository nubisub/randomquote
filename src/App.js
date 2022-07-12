import logo from './logo.svg';
import fetch from 'node-fetch';

import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Container, CssBaseline} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import {useEffect, useState} from "react";

function Quote(props){
    return (
        <>
            <p className="text-3xl mx-0">{props.quote}</p>
            <p className="text-xl text-center sm:text-right my-4 font-light " >- Beverly Sills</p>
        </>
    )
}

function Tombol(){

    const [count, setCount] = useState(0)
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6878024220mshd9eb70b208c93eap163c79jsna2fce556f4a4',
                'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
            }
        };

        fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
            .then(response => response.json())
            .then(
                response =>  {
                   setQuote(response.content)
                }
            )
    },[count] );


    return(
        <>
        <Quote quote={quote}/>
    <div className="sm:grid sm:grid-cols-2 sm:mt-8" >
            <div className="flex sm:justify-start justify-left">
                <Button sx={{width: {xs: 1/2, sm:"auto"},}} variant="contained" ><TwitterIcon/></Button>
                <Button sx={{ml: 1, width: {xs: 1/2, sm:"auto"}}}  variant="contained" ><RedditIcon/></Button>
            </div>
            <div className="flex sm:justify-end justify-left sm:mt-0 mt-2">
                <Button onClick={() => setCount((c) => c + 1)}  sx={{textTransform: 'none',  width: {xs: 1, sm:"auto"}}} variant="contained" >New Quote</Button>
            </div>
        </div>
        </>
    )
}

function App() {
  return (
    <div className="App h-screen flex items-center">
        <Container maxWidth="sm" className="">
            <Box className="p-12 " sx={{ bgcolor: '#cfe8fc' }} >
                <Tombol/>
            </Box>
        </Container>
    </div>
  );
}

export default App;
