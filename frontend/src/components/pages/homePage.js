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
    const [dailyBudget, setDailyBudget] = useState(0);
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
    
    const pieChartData = {
        labels: ['Daily Budget', 'Spent Today'],
        datasets: [
            {
                data: [dailyBudget, todayExpenses],
                backgroundColor: ['#3498DB', '#E74C3C'], // Blue and Red
                hoverBackgroundColor: ['#2980B9', '#C0392B'], // Darker shades for hover
            
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
                        <button type="submit">Update</button>
                    </form>
                </div>
                <div className="content">
                    <div className="chart-container">
                        <h3>Total Amount Spent:</h3>
                        <h2>${todayExpenses}</h2>
                        <div>{currentDate}</div>
                        <div className="pie-chart">
                            <Pie data={pieChartData} options={{ maintainAspectRatio: true, responsive: true, color:'white' }} />
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
                            <Select
                                isMulti
                                name="recurring_cost"
                                options={recurringOptions}
                                onChange={handleRecurringCostChange}
                            />
                            <button type="submit">Add Entry</button>
                        </form>
                        {message && <p>{message}</p>}
                        <button onClick={toggleModal}>All Entries</button>
                    </div>
                </div>
                <div className="extra-containers">
                    <div className="container-box">Container 3</div>
                    <div className="container-box">Container 4</div>
                    <div className="container-box">Container 5</div>
                    <div className="container-box">Container 6</div>
                    <div className="container-box">Container 7</div>
                    <div className="container-box">Container 8</div>
                </div>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-inner-content"> {/* Added this div for better readability */}
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
                                <button onClick={toggleModal} className="modal-close-btn">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
