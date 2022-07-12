import fetch from "node-fetch";

const getRespond = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6878024220mshd9eb70b208c93eap163c79jsna2fce556f4a4',
            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
    };

    let res = await fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
    return await res.json();
}
let respond = await getRespond();
console.log(respond.content)
console.log(respond.originator.name)