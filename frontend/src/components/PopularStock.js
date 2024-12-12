import React, { useState, useEffect } from 'react';
import stockData from '../data/stockData'; // Adjust the path as necessary
import './styles/global.css'; // Import the CSS for styling
import { Sparklines, SparklinesLine } from 'react-sparklines'; // Import Sparklines for charting
import axios from 'axios'; // Import axios for making HTTP requests

const PopularStock = ({ userId }) => {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [stockDetails, setStockDetails] = useState({});

    // Fetch stock details for all favorite stocks when component mounts or stocks list changes
    useEffect(() => {
        const fetchAllStockDetails = async () => {
            if (!stocks.length) return;
            
            try {
                const symbols = stocks.join(',');
                const response = await axios.get(
                    `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=1day&apikey=${process.env.REACT_APP_TWELVE_DATA_API_KEY}`
                );
                console.log('Fetched stock details:', response.data);
                setStockDetails(response.data);
            } catch (error) {
                console.error('Error fetching stock details:', error);
            }
        };

        fetchAllStockDetails();
    }, [stocks]);

    // Fetch user's favorite stocks when the component mounts or when userId changes
    useEffect(() => {
        const fetchStocks = async () => {
            if (!userId) return; // Exit if userId is not available

            try {
                const response = await fetch(`http://localhost:8081/user/stocks/favorites/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched user data:', data); // Log the response
                    setStocks(data.favorites || []); // Ensure stocks is always an array
                } else {
                    console.error('Error fetching stocks:', await response.text());
                    setStocks([]); // Reset to empty array on error
                }
            } catch (error) {
                console.error('Error fetching stocks:', error);
                setStocks([]); // Reset to empty array on fetch failure
            }
        };

        fetchStocks();
    }, [userId]); // Added userId to the dependency array to prevent infinite requests

    // Update filtered stocks based on search term
    useEffect(() => {
        const results = stockData.data.filter(stock =>
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStocks(results);
    }, [searchTerm]);

    const addStock = async (symbol) => {
        if (!userId) {
            console.error('No userId available');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/user/stocks/favorites', {
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
                // Immediately update the stocks state with the new symbol
                setStocks(prevStocks => {
                    // Check if the symbol is already in the list to avoid duplicates
                    if (!prevStocks.includes(symbol)) {
                        return [...prevStocks, symbol];
                    }
                    return prevStocks;
                });
                setSearchTerm(''); // Clear search after adding
            } else {
                console.error('Error adding stock:', await response.json());
            }
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };

    const removeStock = async (symbol) => {
        if (!userId) {
            console.error('No userId available');
            return;
        }

        // Optimistically update the UI
        setStocks(prev => prev.filter(stock => stock !== symbol));

        try {
            const response = await fetch('http://localhost:8081/user/stocks/favorites', {
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
                setStocks(prev => [...prev, symbol]);
                console.error('Error removing stock:', await response.json());
            }
        } catch (error) {
            // Revert the optimistic update on error
            setStocks(prev => [...prev, symbol]);
            console.error('Error removing stock:', error);
        }
    };

    const generateChartData = (symbol) => {
        // Function to generate chart data for the given stock symbol
        return [1, 2, 3, 4, 5]; // Sample data for demonstration
    };

    const getStockPrice = (symbol) => {
        return stockDetails[symbol]?.price || 'N/A';
    };

    const get24hChange = (symbol) => {
        return stockDetails[symbol]?.changePercent || 0;
    };

    const getChangeColor = (symbol) => {
        const change = get24hChange(symbol);
        return change >= 0 ? 'green' : 'red'; // Determine color based on change
    };

    const getArrowDirection = (symbol) => {
        const change = get24hChange(symbol);
        return change >= 0 ? '↑' : '↓'; // Determine arrow direction based on change
    };

    return (
        <div className="sidebar2">
            <div className="stock-list">
                <input
                    type="text"
                    placeholder="Search stocks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '20px', padding: '5px', width: '100%' }}
                />
                <ul>
                    {searchTerm && filteredStocks.map((stock, index) => (
                        <li 
                            key={`${stock.symbol}-${index}`}
                            onClick={() => addStock(stock.symbol)}
                            style={{ cursor: 'pointer', color: 'white', marginBottom: '5px' }}
                        >
                            {stock.symbol} - {stock.name}
                        </li>
                    ))}
                </ul>
                <h4>Your Favorite Stocks</h4>
{Array.isArray(stocks) && stocks.length > 0 ? (
    <ul>
        {stocks.map((symbol, index) => (
            <li 
                key={`${symbol}-${index}`}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <div style={{ flex: '1', display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '5px' }}>
                    <span onClick={() => removeStock(symbol)} style={{ marginRight: '20px', cursor: 'pointer', color: 'gray' }}>
                        X
                    </span>
                    {symbol}: {getStockPrice(symbol)} USD
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
    <p>No stocks added.</p>
)}
            </div>
        </div>
    );
};

export default PopularStock;
