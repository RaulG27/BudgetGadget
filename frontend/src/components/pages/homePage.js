import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import getUserInfo from '../../utilities/decodeJwt';
import '../styles/global.css'; // Importing global CSS

Chart.register(ArcElement, Tooltip, Legend);

const currentDate = new Date().toLocaleDateString();

const HomePage = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        amount: '',
        type: 'income',
        comments: '',
        recurring_cost: [],
    });
    const [message, setMessage] = useState('');
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dailyBudget, setDailyBudget] = useState(0);Select
    const [todayExpenses, setTodayExpenses] = useState(0);
    const navigate = useNavigate();

    const recurringOptions = [
        { value: 'Housing', label: 'Housing' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Food', label: 'Food' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Savings', label: 'Savings' },
        { value: 'Transportation', label: 'Transportation' },
        { value: 'Miscellaneous', label: 'Miscellaneous' },
    ];

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo) {
            setUser(userInfo);
            fetchEntries(userInfo.id);
            fetchDailyBudget(userInfo.id);
        } else {
            setMessage('User not logged in. Please log in to access this page.');
        }
    }, []);

    const fetchDailyBudget = async (userid) => {
        try {
            const response = await fetch(`http://localhost:8081/budget/daily?userid=${userid}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error fetching daily budget:', errorText);
                setMessage('Failed to fetch daily budget.');
                return;
            }
            const data = await response.json();
            if (data && data.amount !== undefined) {
                setDailyBudget(data.amount);
            } else {
                console.error('Unexpected response format:', data);
                setMessage('Invalid response format.');
            }
        } catch (error) {
            console.error('Error fetching daily budget:', error);
            setMessage('Error fetching daily budget.');
        }
    };

    const fetchEntries = async (userid) => {
        try {
            const response = await fetch(`http://localhost:8081/user/entries?userid=${userid}`);
            const data = await response.json();
            if (response.ok) {
                setEntries(data);
                calculateTodayExpenses(data);
            } else {
                console.error('Error fetching entries:', data);
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const calculateTodayExpenses = (entries) => {
        const today = new Date().toISOString().split('T')[0];
        const expensesToday = entries
            .filter(entry => entry.type === 'expense' && new Date(entry.date).toISOString().split('T')[0] === today)
            .reduce((total, entry) => total + entry.amount, 0);
        
        setTodayExpenses(expensesToday);
    };

    const updateDailyBudget = async (newAmount) => {
        try {
            const response = await fetch('http://localhost:8081/budget/daily', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userid: user.id, amount: newAmount }),
            });

            const data = await response.json();
            if (response.ok) {
                setDailyBudget(data.amount);
                setMessage('Daily budget updated successfully!');
            } else {
                setMessage(`Error: ${data.message}`);
                console.error('Error response:', data);
            }
        } catch (error) {
            setMessage('Error updating the daily budget.');
            console.error('Update error:', error);
        }
    };

    const handleBudgetChange = (e) => {
        setDailyBudget(e.target.value);
    };

    const handleBudgetSubmit = (e) => {
        e.preventDefault();
        updateDailyBudget(Number(dailyBudget));
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleRecurringCostChange = (selectedOptions) => {
        setFormData((prevState) => ({
            ...prevState,
            recurring_cost: selectedOptions ? selectedOptions.map(option => option.value) : [],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { amount, type, comments, recurring_cost } = formData;

        const validRecurringCosts = [
            'Housing', 'Utilities', 'Food',
            'Entertainment', 'Savings', 'Transportation',
            'Miscellaneous'
        ];
        const invalidCosts = recurring_cost.filter(cost => !validRecurringCosts.includes(cost));
        if (invalidCosts.length > 0) {
            setMessage(`Invalid recurring cost(s): ${invalidCosts.join(', ')}`);
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/user/entries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userid: user.id,
                    amount: Number(amount),
                    type,
                    date: new Date().toISOString(),
                    comments,
                    recurring_cost,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Entry added successfully!');
                setFormData({ amount: '', type: 'income', comments: '', recurring_cost: [] });
                fetchEntries(user.id);
            } else {
                setMessage(`Error: ${data.message}`);
                console.error('Error response:', data);
            }
        } catch (error) {
            setMessage('Error submitting the form.');
            console.error('Submission error:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Prepare data for the first pie chart (Daily Budget vs. Today Expenses)
    const pieChart1Data = {
        labels: ['Daily Budget', 'Spent Today'],
        datasets: [
            {
                data: [dailyBudget, todayExpenses],
                backgroundColor: ['#3498DB', '#E74C3C'], // Blue and Red
                hoverBackgroundColor: ['#2980B9', '#C0392B'], // Darker shades for hover
            },
        ],
    };

    // Prepare data for the second pie chart (Spending by Category)
    const categoryTotals = {
        Housing: 0,
        Utilities: 0,
        Food: 0,
        Entertainment: 0,
        Savings: 0,
        Transportation: 0,
        Miscellaneous: 0,
    };

    entries.forEach(entry => {
        if (entry.type === 'expense') {
            entry.recurring_cost.forEach(cost => {
                if (categoryTotals[cost] !== undefined) {
                    categoryTotals[cost] += entry.amount;
                }
            });
        }
    });

    const pieChart2Data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: ['#3498DB', '#E74C3C', '#F1C40F', '#2ECC71', '#9B59B6', '#34495E', '#E67E22'], // Different colors for each category
                hoverBackgroundColor: ['#2980B9', '#C0392B', '#F39C12', '#27AE60', '#8E44AD', '#2C3E50', '#D35400'], // Darker shades for hover
            },
        ],
    };
    

    return (
        <div className="background-container">
            <div className="container">
                <div className="header">
                    <h2>Daily Budget: ${dailyBudget}</h2>
                    <form onSubmit={handleBudgetSubmit}>
                        <input
                            type="number"
                            value={dailyBudget}
                            onChange={handleBudgetChange}
                            required
                        />
                        <button type="submit" className="button">Update</button>
                    </form>
                </div>
                <div className="content">
                    <div className="chart-container">
                        <h3>Total Amount Spent Today:</h3>
                        <h2>${todayExpenses}</h2>
                        <div className="currentDate">{currentDate}</div>
                        <div className="pie-chart">
                            <Pie data={pieChart1Data} options={{ plugins: {
                                            legend: {position: 'bottom', labels:{color:'white ',font: {weight: 'bold'}}},
                                                    },
                                                        }
                                                            } />
                        </div>
                    </div>
                    <div className="financial-entry">
                        <h3>Add Financial Entry</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <input
                                type="text"
                                name="comments"
                                placeholder="Comments"
                                value={formData.comments}
                                onChange={handleChange}
                            />
                            <div className="recurring-costs">
                                <Select
                                    isMulti
                                    name="recurring_cost"
                                    options={recurringOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={formData.recurring_cost.map(cost => ({ value: cost, label: cost }))}
                                    onChange={handleRecurringCostChange}
                                />
                            </div>
                            <button type="submit" className="button">Add Entry</button>
                        </form>
                        {message && <p>{message}</p>}
                        <button onClick={toggleModal} className="button">All Entries</button>
                    </div>
                </div>

                <div className="content">
                        <div className="chart-container">
                            <h3>Spending by Category:</h3>
                            <div className="pie-chart2">
                                <Pie 
                                    data={pieChart2Data} 
                                    options={{
                                        maintainAspectRatio: true, responsive: true,
                                        plugins: {
                                            legend: { display: true, position: 'left', labels:{color:'white'} },
                                        },
                                    }} 
                                />
                            </div>
                        </div>
                    
                    <div className="chart-container">Container 4</div> {/* Moved Container 4 here */}
                    
                </div>
                <div className="extra-containers">
                    <div className="container-box">Container 5</div>
                    <div className="container-box">Container 6</div>
                    <div className="container-box">Container 7</div>
                    <div className="container-box">Container 8</div>
                </div>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-inner-content">
                                <h3>Previous Entries</h3>
                                <ul>
                                    {sortedEntries.map(entry => (
                                        <li key={entry._id} className="entry-item">
                                            <span>
                                                {entry.type}: ${entry.amount} on {new Date(entry.date).toLocaleDateString()}
                                            </span>
                                            <span className="entry-comments">
                                                {entry.comments}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={toggleModal} className="button">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
