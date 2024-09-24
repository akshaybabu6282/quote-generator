import React, { useEffect, useState } from 'react'
import './quoteGenerator.css'
import axios from 'axios'

function QuoteGenerator() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const handleQuote = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/quotes/random')
            setQuote(response.data.quote)
            setAuthor(response.data.author)
        } catch (error) {
            console.log('Error fetching the quote', error);
        }
    }
    useEffect(()=>{
        handleQuote();
    },[])
    return (
        <>
            <div
                style={{
                    backgroundImage: `url("https://imgs.search.brave.com/9OfOqmo49gaLADW42WpF3fkAY8c0PKsS1NmRQFO9lzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzg0LzQyLzQz/LzM2MF9GXzI4NDQy/NDMwMV9GNDNUeHdm/bk16NGZDZ3NzNDV2/MTlSN21iOTlvZ2xQ/bC5qcGc")`,
                    width: "100%", height: "745px", backgroundRepeat: "no-repeat", backgroundSize: "cover"
                }}>
                <div style={{ width: "100%", height: "745px" }} className='background'>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div>
                                <h2 style={{ color: "white", textAlign: "center" }} className='heading'>Quote Generator</h2>
                                <div className='inner-div'>
                                    <p className='text-center pb-1 pt-2 content'>{quote}</p>
                                    <p className='author'>- {author}</p>
                                    <hr />
                                    <button className='btn btn-outline-light mt-1 mb-2 ' onClick={handleQuote}>Get New Quote</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuoteGenerator