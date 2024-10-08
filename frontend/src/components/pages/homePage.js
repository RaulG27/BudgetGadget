import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        amount: '',
        type: 'income',
        comments: '',
        recurring_cost: [], // Changed to an array
    });
    const [message, setMessage] = useState('');
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [dailyBudget, setDailyBudget] = useState(0);

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

    const fetchEntries = async (userid) => {
        try {
            const response = await fetch(`http://localhost:8081/user/entries?userid=${userid}`);
            const data = await response.json();
            if (response.ok) {
                setEntries(data);
            } else {
                console.error('Error fetching entries:', data);
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
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

        // Validate recurring_cost values
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
                    recurring_cost, // Send the validated array
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

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#6BA57A',
        textAlign: 'center',
        padding: '20px',
    };

    const boxStyles = (size, index) => ({
        width: size.width,
        height: size.height,
        backgroundColor: '#2C3E50',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
        borderRadius: '10px',
        marginTop: size.marginTop || '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    });

    const sizes = [
        { width: '400px', height: '250px', marginTop: '155px' },
        { width: '300px', height: '300px' },
        { width: '300px', height: '250px' },
        { width: '300px', height: '100px', marginTop: '-335px' },
        { width: '300px', height: '200px' },
        { width: '300px', height: '250px' },
        { width: '300px', height: '400px', marginTop: '135px' },
        { width: '300px', height: '400px' },
    ];

    const groupStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
    };

    const group1 = [0, 1, 2];
    const group2 = [3, 4, 5];
    const group3 = [6, 7];

    if (!user) {
        return (
            <div style={containerStyles}>
                <h4>Log in to view this page.</h4>
            </div>
        );
    }

    return (
        <div style={containerStyles}>
            <div>
                <h2>Daily Budget: ${dailyBudget}</h2>
                <form onSubmit={handleBudgetSubmit}>
                    <input
                        type="number"
                        value={dailyBudget}
                        onChange={handleBudgetChange}
                        required
                    />
                    <button type="submit">Update Daily Budget</button>
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={groupStyles}>
                    {group1.map((index) => (
                        <div key={index} style={boxStyles(sizes[index], index)}>
                            {index === 0 ? (
                                <div>
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
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={handleRecurringCostChange}
                                            styles={{
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: 'black', // Text color for options
                                                }),
                                                control: (provided) => ({
                                                    ...provided,
                                                    backgroundColor: 'white', // Ensure control background is white
                                                }),
                                            }}
                                        />
                                        <button type="submit">Add Entry</button>
                                    </form>
                                    {message && <p>{message}</p>}
                                    <button
                                        onClick={toggleModal}
                                        style={{
                                            marginTop: '10px',
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            border: 'none',
                                            borderRadius: '5px',
                                            padding: '5px 10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        All Entries
                                    </button>
                                </div>
                            ) : (
                                `Container ${index + 1}`
                            )}
                        </div>
                    ))}
                </div>
                <div style={groupStyles}>
                    {group2.map((index) => (
                        <div key={index} style={boxStyles(sizes[index], index)}>
                            Container {index + 1}
                        </div>
                    ))}
                </div>
                <div style={groupStyles}>
                    {group3.map((index) => (
                        <div key={index} style={boxStyles(sizes[index], index)}>
                            Container {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for displaying entries */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        backgroundColor: '#2C3E50',
                        padding: '20px',
                        borderRadius: '10px',
                        maxWidth: '500px',
                        width: '100%',
                    }}>
                        <h3 style={{ color: 'white' }}>Previous Entries</h3>
                        <ul style={{ color: 'white' }}>
                            {sortedEntries.map(entry => (
                                <li key={entry._id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <span style={{ color: 'white' }}>
                                        {entry.type}: ${entry.amount} on {new Date(entry.date).toLocaleDateString()}
                                    </span>
                                    <span style={{ marginLeft: '10px', fontStyle: 'italic', color: '#ccc' }}>
                                        {entry.comments}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={toggleModal}
                            style={{
                                marginTop: '10px',
                                backgroundColor: '#6BA57A',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
