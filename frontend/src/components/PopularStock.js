import React, { useState, useEffect } from 'react';
import './styles/global.css'; // Import the CSS for styling

const FavoriteStock = ({ userId }) => {
    const [stocks, setStocks] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchTopStocks = async () => {
            try {
                const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'BRK.B', 'NVDA', 'JPM', 'SPX']; // SPX is often used for S&P 500
                const stockNames = {
                    SPX: 'S&P 500',
                    AAPL: 'Apple',
                    MSFT: 'Microsoft',
                    GOOGL: 'Google',
                    AMZN: 'Amazon',
                    TSLA: 'Tesla',
                    FB: 'Facebook',
                    NVDA: 'NVIDIA',
                    JPM: 'JPMorgan Chase',
                };

                const responses = await Promise.all(symbols.map(symbol =>
                    fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${process.env.REACT_APP_TWELVE_DATA_API_KEY}`)
                ));
                const data = await Promise.all(responses.map(res => res.json()));
                setStocks(data.map((stock, index) => ({ ...stock, name: stockNames[symbols[index]] })));
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchTopStocks();
    }, []);

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
        <div className="sidebar2">
            <div className="stock-list">
                <h3>Popular Stocks</h3>
                <ul>
                    {stocks.map((stock, index) => {
                        if (!stock.meta || !stock.values) {
                            console.error('Invalid stock data:', stock);
                            return <li key={index}>Data unavailable</li>;
                        }
                        const change = calculate24hChange(stock);
                        const changeColor = change > 0 ? '#00FF00' : change < 0 ? 'red' : 'black';
                        return (
                            <li key={stock.meta.symbol}>
                                {stock.name}: {stock.values[0].close} USD
                                <br />
                                24h Change: <span style={{ color: changeColor }}>{change}%</span>
                                <span 
                                    onClick={() => toggleFavorite(stock.meta.symbol)} 
                                    style={{ cursor: 'pointer', color: favorites.includes(stock.meta.symbol) ? 'gold' : 'gray' }}
                                >
                                    {favorites.includes(stock.meta.symbol) ? '★' : '☆'}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default FavoriteStock;