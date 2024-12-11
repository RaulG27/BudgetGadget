import React, { useState, useEffect } from 'react';
import stockData from '../data/stockData'; // Adjust the path as necessary
import './styles/global.css'; // Import the CSS for styling
import { Sparklines, SparklinesLine } from 'react-sparklines'; // Import Sparklines for charting

const PopularStock = ({ userId }) => {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStocks, setFilteredStocks] = useState([]);

    // Fetch user's favorite stocks when userId changes
    useEffect(() => {
        const fetchStocks = async (userId) => {
            if (!userId) return; // Exit if userId is not available
    
            try {
                const response = await fetch(`http://localhost:8081/user/stocks/favorites/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched user data:', data); // Log the response
                    if (data.favorites) { // Look for 'favorites' in the response
                        setStocks(data.favorites); // Set stocks from the 'favorites' key
                    } else {
                        console.error('favorites not found in response:', data);
                    }
                } else {
                    console.error('Error fetching stocks:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };
    
        fetchStocks(userId);
    }, [userId]);

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
                const data = await response.json();
                setStocks(data.favorite_stocks); // Update stocks state with the updated list
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
        // Function to get the stock price for the given symbol (should be replaced with API logic)
        return 100; // Sample price for demonstration
    };

    const getChangeColor = (symbol) => {
        // Function to get the change color for the given symbol (should be replaced with API logic)
        return 'green'; // Sample color for demonstration
    };

    const get24hChange = (symbol) => {
        // Function to get the 24h change for the given symbol (should be replaced with API logic)
        return 1; // Sample 24h change for demonstration
    };

    const getArrowDirection = (symbol) => {
        // Function to get the arrow direction for the given symbol (should be replaced with API logic)
        return '↑'; // Sample arrow direction for demonstration
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
                {stocks.length > 0 ? (
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
