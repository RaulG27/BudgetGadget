import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getUserInfo from '../../utilities/decodeJwt';
import '../styles/global.css';
import PopularCrypto from '../PopularCrypto';
import PopularStock from '../PopularStock';
import TextField from '@mui/material/TextField';

Chart.register(ArcElement, Tooltip, Legend);

const currentDate = new Date().toLocaleDateString();

const HomePage = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        amount: '',
        type: 'expense',
        comments: '',
        recurring_cost: [],
    });
    const [message, setMessage] = useState('');
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dailyBudget, setDailyBudget] = useState(0);
    const [todayExpenses, setTodayExpenses] = useState(0);
    const [date, setDate] = useState(new Date());
    const [markedDates, setMarkedDates] = useState([]);
    const [selectedDateEntries, setSelectedDateEntries] = useState([]);
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [upcomingExpenses, setUpcomingExpenses] = useState([]);
    const apiKey = process.env.REACT_APP_TWELVE_DATA_API_KEY;

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

    useEffect(() => {
        const uniqueDates = Array.from(new Set(entries.map(entry => new Date(entry.date).toDateString())));
        setMarkedDates(uniqueDates);
    }, [entries]);

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
                filterUpcomingExpenses(data);
            } else {
                console.error('Error fetching entries:', data);
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const filterUpcomingExpenses = (entries) => {
        const today = new Date();
        const upcoming = entries.filter(entry => 
            entry.type === 'expense' && new Date(entry.date) > today
        );
        setUpcomingExpenses(upcoming);
    };

    const calculateTodayExpenses = (entries) => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    
        const expensesToday = entries
            .filter(entry => {
                const entryDate = new Date(entry.date).toISOString().split('T')[0];
                return entry.type === 'expense' && entryDate === today;
            })
            .reduce((total, entry) => total + entry.amount, 0);
    
        setTodayExpenses(expensesToday); // Update the state with today's total expenses
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
        const newAmount = Number(e.target.value);
        setDailyBudget(newAmount); // Update the daily budget state directly
        updateDailyBudget(newAmount); // Call the update function with the new budget
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
                    date: selectedDate.toISOString(),
                    comments,
                    recurring_cost,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                setMessage('Entry added successfully!');
                setFormData({ amount: '', type: 'income', comments: '', recurring_cost: [] });
                fetchEntries(user.id);
                calculateTodayExpenses(entries); // Recalculate today's expenses to update the chart
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

    const handleDateClick = (value) => {
        setSelectedDate(value);
        const filteredEntries = entries.filter(entry => new Date(entry.date).toDateString() === value.toDateString());
        setSelectedDateEntries(filteredEntries);
        toggleModal();
    }; 

    const handleTodayClick = () => {
        const today = new Date();
        const filteredEntries = entries.filter(entry => 
            new Date(entry.date).toDateString() === today.toDateString()
        );
        setSelectedDateEntries(filteredEntries);
        setSelectedDate(today);
        toggleModal();
    };

    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const pieChart1Data = {
        labels: ['Daily Budget', 'Spent Today'],
        datasets: [
            {
                data: [dailyBudget - todayExpenses, todayExpenses], // Remaining budget and expenses
                backgroundColor: ['#A8D5BA', '#FFE08A'],
                hoverBackgroundColor: ['#8BBF9E', '#E0C572'],
            },
        ],
    };
    
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
                backgroundColor: ['#4A90E2', '#E94E77', '#F6BB3B', '#2ECC71', '#9B59B6', '#F39C12', '#BDC3C7'],
                hoverBackgroundColor: ['#357ABD', '#D53B68', '#D19A00', '#28B463', '#7D3C98', '#D97A24', '#A2A2A2'],
            },
        ],
    };
    
    const tileClassName = ({ date }) => {
        const dateString = date.toDateString();
        return markedDates.includes(dateString) ? 'highlight' : null;
    };

    return (
        
        <div className="background-container">
            <div className="container">
            <div className="header" style={{ textAlign: 'center', padding: '10px' }}>
  <h2 style={{ marginBottom: '5px', fontSize: '2rem' }}>Daily Budget</h2>
  
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5px',
    }}
  >
    <span style={{ fontSize: '1.5rem', paddingLeft:'30px' }}>$</span>
    <input
      type="number"
      value={dailyBudget === 0 ? '' : dailyBudget}
      onChange={handleBudgetChange}
      placeholder="..."
      style={{
        border: '1px solid #666',
        borderRadius: '4px',
        padding: '10px',
        fontSize: '1em',
        width: '80px',
        textAlign: 'center',
        marginLeft: '15px',
      }}
    />
  </div>
  {message && (
    <p
      style={{
        fontSize: '0.9rem',
        color: 'red',
        marginTop: '10px',
      }}
    >
      {message}
    </p>
  )}
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

                    <div className="financial-entry bg-gray-900 p-10 rounded-xl shadow-xl text-white">
                        <h3 className="text-2xl font-bold mb-6">Add Financial Entry</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">

                        <TextField
                                required
                                id="outlined-required"
                                label="Enter Amount"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    style: { color: 'white',borderColor:'white' }, // Sets input text color to white
                                }}
                                InputLabelProps={{
                                    style: { color: 'white',borderColor:'white' }, // Sets label text color to white
                                }}
                            />
                                                        

<TextField
    id="outlined-comments"
    label="Add Comments (Optional)"
    value={formData.comments}
    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
    variant="outlined"
    fullWidth
    InputProps={{
        style: { color: 'white' }, // Makes input text white
    }}
    InputLabelProps={{
        style: { color: 'white' }, // Makes label text white
    }}
/>

<select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="p-2 rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    style={{ width: '44.5%', borderRadius: '4px', marginTop: '10px' }}
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>

                               
                                    <label htmlFor="date" className="block text-lg font-medium mb-4 rounded-sm"></label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        
                                        className="p-2 transition duration-150 ease-in-out"   
                                        wrapperClassName="datepicker-wrapper"
                                    />

                            <div className="recurring-costs">
                                <Select
                                    isMulti
                                    name="recurring_cost"
                                    options={recurringOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Select Category"
                                    value={formData.recurring_cost.map(cost => ({ value: cost, label: cost }))}
                                    onChange={handleRecurringCostChange}
                                    styles={{
                                        option: (provided) => ({
                                            ...provided,
                                            color: 'black',
                                        }),
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'white',
                                            borderColor: '#2a2a2a',
                                            borderRadius:'4px',
                                            boxShadow: 'none',
                                            marginTop:'10px',
                                            '&:hover': {
                                                borderColor: '#007BFF',
                                            },
                                        }),
                                        multiValue: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#007BFF',
                                            color: 'white',
                                        }),
                                        multiValueLabel: (provided) => ({
                                            ...provided,
                                            color: 'white',
                                        }),
                                        multiValueRemove: (provided) => ({
                                            ...provided,
                                            color: 'white',
                                            '&:hover': {
                                                color: '#FF3B30',
                                            },
                                        }),
                                    }}
                                />
                            </div>


                            
                            <button type="submit" className="button">Add Entry</button>
                        </form>
                        {message && <p className="mt-2 text-green-400">{message}</p>}
                        <button onClick={handleTodayClick} className="button">All Entries</button>
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


                    <div className="chart-container"> 
                    <h3>Financial Entries By Date</h3>                   
                        <div className="calendar-container" style={{ overflow: 'hidden', marginTop:'35px' }}>
                            <Calendar
                                onChange={handleDateClick}
                                value={date}
                                tileClassName={tileClassName}
                            />
                        </div>
                    </div>


                    <div className="chart-container">
                        <h3>Upcoming Expenses</h3>
                        <ul>
                            {upcomingExpenses.length > 0 ? (
                                upcomingExpenses.map(expense => (
                                    <li key={expense._id} className="entry-item">
                                        <span>
                                            ${expense.amount} - {expense.comments} on {new Date(expense.date).toLocaleDateString()}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li>No upcoming expenses.</li>
                            )}
                        </ul>
                    </div>
                </div>


                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-inner-content">
                                <h3>Entries for {selectedDate.toDateString()}</h3>
                                <ul>
                                    {selectedDateEntries.length > 0 ? (
                                        selectedDateEntries.map(entry => (
                                            <li key={entry._id} className="entry-item">
                                                <span>
                                                    {entry.type}: ${entry.amount} - {entry.comments}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No entries for this date.</li>
                                    )}
                                </ul>
                                <button onClick={toggleModal} className="button">Close</button>
                            </div>
                        </div>
                    </div>
                )}
                <PopularCrypto apiKey={apiKey} userId={user.id} />
                <PopularStock userId={user.id} />
            </div>
        </div>
    );
};

export default HomePage;
