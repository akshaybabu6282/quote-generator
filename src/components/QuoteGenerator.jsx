import React, { useEffect, useState } from 'react'
import './quoteGenerator.css'
import axios from 'axios'

function QuoteGenerator() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [isFav, setIsFav] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    const handleQuote = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/quotes/random')
            setQuote(response.data.quote)
            setAuthor(response.data.author)
            setIsFav(favorites.some(fav => fav.quote === response.data.quote && fav.author === response.data.author)); 
        } catch (error) {
            console.log('Error fetching the quote', error);
        }
    }

    const handleTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=" ${quote} " - ${author}`);
    }

    const handleFav = () => { 
        if (!isFav) { //
            setFavorites([...favorites, { quote, author }])//
            setIsFav(true); 
        }
    }
    const handleSeeFav = () => {
        setShowFavorites(!showFavorites); 
    }

    const handleRemoveFav = (index) => { 
        const removedQuote = favorites[index];
        const updatedFavorites = favorites.filter((_, i) => i !== index);
        setFavorites(updatedFavorites);
        if (removedQuote.quote === quote && removedQuote.author === author) {
            setIsFav(false);
        }
    };

    useEffect(() => {
        handleQuote();
    }, [])
    return (
        <>
            <div
                style={{
                    backgroundImage: `url("https://imgs.search.brave.com/9OfOqmo49gaLADW42WpF3fkAY8c0PKsS1NmRQFO9lzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzg0LzQyLzQz/LzM2MF9GXzI4NDQy/NDMwMV9GNDNUeHdm/bk16NGZDZ3NzNDV2/MTlSN21iOTlvZ2xQ/bC5qcGc")`,
                    width: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover"
                }}>
                <div style={{ width: "100%", paddingBottom: "300px" }} className='background'>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div>
                                <h2 style={{ color: "white", textAlign: "center" }} className='heading'>Quote Generator</h2>
                                <div className='inner-div'>
                                    <p className='text-center pt-2 content'>" {quote} "</p>
                                    <p className='author' style={{ textAlign: 'right' }}>- {author}</p>
                                    <hr />
                                    {/* Buttons for new quote */}
                                    <button className='btn btn-outline-light mt-1 mb-2 ' onClick={handleQuote}>Get New Quote</button>

                                    {/* Favorite button */}
                                    {isFav ?
                                        <button className='btn btn-outline-light mt-1 mb-2 ms-3' disabled><i class="fa-solid fa-heart" style={{ color: "red" }}></i></button> :
                                        <button className='btn btn-outline-light mt-1 mb-2 ms-3' onClick={handleFav}><i class="fa-solid fa-heart" ></i></button>
                                    }

                                    {/* Button to show/hide favorite quotes */}
                                    <button className='btn btn-outline-light mt-1 mb-2 ms-3' onClick={handleSeeFav}>
                                        {showFavorites ? "Hide Favorites" : "See Favorites"}
                                    </button>
                                    <button className='btn btn-outline-light mt-1 mb-2 ms-3' style={{float:"right"}} onClick={handleTwitter}><i class="fa-brands fa-x-twitter"></i></button>

                                </div>
                            </div>

                            {showFavorites && (
                                <div className=" mt-3">
                                    <h4 className='mt-5 mb-5' style={{ color: 'white', textAlign: 'center' }}>Favorite Quotes</h4>
                                    {favorites.length > 0 ? (
                                        <ul className='text-light'>
                                            {favorites.map((fav, index) => (
                                                <li key={index}>
                                                    <p className=' text-light'>"{fav.quote}"</p>
                                                    <p className=' text-light' style={{ textAlign: 'right' }}>- {fav.author}</p>
                                                    <button
                                                        className='btn btn-danger mt-1 mb-2'
                                                        onClick={() => handleRemoveFav(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                    <hr style={{ color: "white" }} />
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p style={{ textAlign: 'center', color: 'white' }}>No favorite quotes yet!</p>
                                    )}
                                </div>
                            )} 

                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuoteGenerator