// BudgetGadget/frontend/src/components/PopularCrypto.js
import React, { useState, useEffect } from 'react';
import './styles/global.css'; // Import the CSS for styling

const FavoriteCrypto = ({ apiKey, userId }) => {
    const [cryptos, setCryptos] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const popularCryptos = [
        'BTC/USD', 'ETH/USD', 'LTC/USD', 'BNB/USD', 'XRP/USD',
        'ADA/USD', 'SOL/USD', 'DOT/USD', 'DOGE/USD', 'AVAX/USD'
    ]; // Top 10 popular cryptos

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                if (!apiKey) {
                    throw new Error('API key is missing');
                }
                const responses = await Promise.all(popularCryptos.map(pair =>
                    fetch(`https://api.twelvedata.com/time_series?symbol=${pair}&interval=1day&apikey=${apiKey}`)
                ));
                const data = await Promise.all(responses.map(res => res.json()));
                setCryptos(data);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchCryptoData();
    }, [apiKey]);

    const toggleFavorite = async (symbol) => {
        try {
            const response = await fetch('http://localhost:8081/user/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, symbol }),
            });

            if (response.ok) {
                setFavorites(prev => prev.includes(symbol) ? prev.filter(fav => fav !== symbol) : [...prev, symbol]);
            } else {
                console.error('Error updating favorites:', await response.text());
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    const calculate24hChange = (data) => {
        if (data && data.values && data.values.length > 1) {
            const latestPrice = parseFloat(data.values[0].close);
            const previousPrice = parseFloat(data.values[1].close);
            const change = ((latestPrice - previousPrice) / previousPrice) * 100;
            return change.toFixed(2); // Return as a percentage
        }
        return null;
    };

    return (
        <div className="sidebar">
            <div className="crypto-list">
                <h3>Popular Cryptos</h3>
                <ul>
                    {cryptos.map((crypto, index) => {
                        if (!crypto.meta || !crypto.values) {
                            console.error('Invalid crypto data:', crypto);
                            return <li key={index}>Data unavailable</li>;
                        }
                        const change = calculate24hChange(crypto);
                        const changeColor = change > 0 ? 'green' : change < 0 ? 'red' : 'black';
                        return (
                            <li key={crypto.meta.symbol}>
                                {crypto.meta.symbol}: {crypto.values[0].close} USD
                                <br />
                                24h Change: <span style={{ color: changeColor }}>{change}%</span>
                                <span 
                                    onClick={() => toggleFavorite(crypto.meta.symbol)} 
                                    style={{ cursor: 'pointer', color: favorites.includes(crypto.meta.symbol) ? 'gold' : 'gray' }}
                                >
                                    {favorites.includes(crypto.meta.symbol) ? '★' : '☆'}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default FavoriteCrypto;