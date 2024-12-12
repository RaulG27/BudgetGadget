import React, { useState, useEffect } from 'react';
import cryptoData from '../data/cryptoData'; // Adjust the path as necessary
import './styles/global.css'; // Import the CSS for styling
import { Sparklines, SparklinesLine } from 'react-sparklines'; // Import Sparklines for charting

const PopularCrypto = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCryptos, setFilteredCryptos] = useState([]);

    // Fetch user's favorite cryptocurrencies when userId changes
    useEffect(() => {
        const fetchFavorites = async (userId) => {
            if (!userId) return; // Exit if userId is not available

            try {
                const response = await fetch(`http://localhost:8081/user/cryptos/favorites/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched user data:', data); // Log the response
                    if (data.favorites) {
                        setFavorites(data.favorites); // Set favorites from the user data
                    } else {
                        console.error('favorite_cryptos not found in response:', data);
                    }
                } else {
                    console.error('Error fetching favorites:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites(userId);
    }, [userId]);

    // Update filtered cryptos based on search term
    useEffect(() => {
        const results = cryptoData.data.filter(crypto =>
            crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCryptos(results);
    }, [searchTerm]);

    const addFavorite = async (symbol) => {
        if (!userId) {
            console.error('No userId available');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/user/cryptos/favorites', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    symbol
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setFavorites(data.favorites); // Update favorites state with the updated list
                setSearchTerm(''); // Clear search after adding
            } else {
                console.error('Error adding favorite:', await response.json());
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    const removeFavorite = async (symbol) => {
        if (!userId) {
            console.error('No userId available');
            return;
        }

        // Optimistically update the UI
        setFavorites(prev => prev.filter(fav => fav !== symbol));

        try {
            const response = await fetch('http://localhost:8081/user/cryptos/favorites', {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    symbol
                }),
            });

            if (!response.ok) {
                // If the response is not ok, revert the optimistic update
                setFavorites(prev => [...prev, symbol]);
                console.error('Error removing favorite:', await response.json());
            }
        } catch (error) {
            // Revert the optimistic update on error
            setFavorites(prev => [...prev, symbol]);
            console.error('Error removing favorite:', error);
        }
    };

    const generateChartData = (symbol) => {
        // Function to generate chart data for the given crypto symbol
        return [1, 2, 3, 4, 5]; // Sample data for demonstration
    };

    const getCryptoPrice = (symbol) => {
        // Function to get the crypto price for the given symbol
        return 100; // Sample price for demonstration
    };

    const getChangeColor = (symbol) => {
        // Function to get the change color for the given symbol
        return 'green'; // Sample color for demonstration
    };

    const get24hChange = (symbol) => {
        // Function to get the 24h change for the given symbol
        return 1; // Sample 24h change for demonstration
    };

    const getArrowDirection = (symbol) => {
        // Function to get the arrow direction for the given symbol
        return '↑'; // Sample arrow direction for demonstration
    };

    return (
        <div className="sidebar">
            <div className="crypto-list">
                <input
                    type="text"
                    placeholder="Search cryptocurrencies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '20px', padding: '5px', width: '100%' }}
                />
                <ul>
                    {searchTerm && filteredCryptos.map((crypto, index) => (
                        <li 
                            key={`${crypto.symbol}-${index}`}
                            onClick={() => addFavorite(crypto.symbol)}
                            style={{ cursor: 'pointer', color: 'white', marginBottom: '5px' }}
                        >
                            {crypto.symbol} - {crypto.name}
                        </li>
                    ))}
                </ul>
                <h4>Your Favorite Cryptos</h4>
                {favorites.length > 0 ? (
                    <ul>
                        {favorites.map((symbol, index) => (
                            <li 
                                key={`${symbol}-${index}`}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <div style={{ flex: '1', display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '5px' }}>
                                    <span onClick={() => removeFavorite(symbol)} style={{ marginRight: '20px', cursor: 'pointer', color: 'gray' }}>
                                        X
                                    </span>
                                    {symbol}: {getCryptoPrice(symbol)} USD
                                    <br />
                                    24h Change: 
                                    <span style={{ color: getChangeColor(symbol), marginTop: '25px', marginRight: '25px' }}>
                                        {get24hChange(symbol).toFixed(2)}% {getArrowDirection(symbol)}
                                    </span>
                                    <div style={{ width: '80px', height: '80px', marginLeft: '5px', marginTop: '50px' }}>
                                        <Sparklines data={generateChartData(symbol)}>
                                            <SparklinesLine color={getChangeColor(symbol)} />
                                        </Sparklines>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No favorites added.</p>
                )}
            </div>
        </div>
    );
};

export default PopularCrypto;
