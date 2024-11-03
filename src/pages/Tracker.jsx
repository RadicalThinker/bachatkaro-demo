import React, { useState } from 'react';
import { useBudgetContext } from '../context/BudgetProvider';

export default function BudgetTracker() {
  const {
    transactions,
    addTransaction,
    subcategories,
    addSubcategory,
    subcategoryTotals,
    overallBudget,
    subcategoryBudgets,
    setBudget,
    daysInMonth,
    setDaysInMonth,
    balance,
    totalExpenses,
    calculateDailyLimit,
    currentpage
  } = useBudgetContext();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [subcategory, setSubcategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedBudgetSubcategory, setSelectedBudgetSubcategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [isAddingNewSubcategory, setIsAddingNewSubcategory] = useState(false);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!description || !amount || !subcategory) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      subcategory,
      date: new Date().toISOString().split('T')[0]
    };

    addTransaction(newTransaction);
    setDescription('');
    setAmount('');
    setSubcategory('');
    setIsAddingNewSubcategory(false);
  };

  const handleAddSubcategory = () => {
    if (!newSubcategory) return;

    addSubcategory(type, newSubcategory);
    setSubcategory(newSubcategory);
    setNewSubcategory('');
    setIsAddingNewSubcategory(false);
  };

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setIsAddingNewSubcategory(true);
      setSubcategory('');
    } else {
      setSubcategory(value);
      setIsAddingNewSubcategory(false);
    }
  };

  const handleSetBudget = (e) => {
    e.preventDefault();
    setBudget(selectedBudgetSubcategory, parseFloat(budgetAmount));
    setBudgetAmount('');
    setSelectedBudgetSubcategory('');
  };

  return (
    (currentpage === 'tracker') && (
        <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Budget Tracker</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Balance: <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>${balance.toFixed(2)}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <form onSubmit={handleAddTransaction} className="bg-gray-50 p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Transaction</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount:</label>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="income"
                        checked={type === 'income'}
                        onChange={() => setType('income')}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">Income</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="expense"
                        checked={type === 'expense'}
                        onChange={() => setType('expense')}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">Expense</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">Subcategory:</label>
                  <select
                    id="subcategory"
                    value={subcategory}
                    onChange={handleSubcategoryChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subcategory</option>
                    {subcategories[type].map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                    <option value="add_new">Add New Subcategory</option>
                  </select>
                </div>
                {isAddingNewSubcategory && (
                  <div>
                    <label htmlFor="newSubcategory" className="block text-sm font-medium text-gray-700 mb-1">New Subcategory:</label>
                    <div className="flex">
                      <input
                        id="newSubcategory"
                        type="text"
                        value={newSubcategory}
                        onChange={(e) => setNewSubcategory(e.target.value)}
                        placeholder="Enter new subcategory"
                        className="flex-grow p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleAddSubcategory}
                        className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600 transition duration-200"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                Add Transaction
              </button>
            </form>
            <form onSubmit={handleSetBudget} className="bg-gray-50 p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Set Budget</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="budgetSubcategory" className="block text-sm font-medium text-gray-700 mb-1">Set Budget For:</label>
                  <select
                    id="budgetSubcategory"
                    value={selectedBudgetSubcategory}
                    onChange={(e) => setSelectedBudgetSubcategory(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="overall">Overall Budget</option>
                    {subcategories.expense.map((sub) => (
                      <option key={sub} value={`expense-${sub}`}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700 mb-1">Budget Amount:</label>
                  <input
                    id="budgetAmount"
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    placeholder="Enter budget amount"
                    min="0"
                    step="0.01"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button type="submit" className="w-full mt-4 p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200">
                Set Budget
              </button>
            </form>
            <div className="bg-gray-50 p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Days in Month</h2>
              <div>
                <label htmlFor="daysInMonth" className="block text-sm font-medium text-gray-700 mb-1">Number of Days:</label>
                <input
                  id="daysInMonth"
                  type="number"
                  value={daysInMonth}
                  onChange={(e) => setDaysInMonth(parseInt(e.target.value))}
                  min="28"
                  max="31"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Subcategory Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Income Subcategories</h3>
                  {subcategories.income.map((sub) => (
                    <div key={sub} className="flex justify-between mb-2 p-2 bg-gray-50 rounded">
                      <span className="font-medium">{sub}</span>
                      <span className="text-green-600">${(subcategoryTotals[`income-${sub}`] || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Expense Subcategories</h3>
                  {subcategories.expense.map((sub) => {
                    const total = subcategoryTotals[`expense-${sub}`] || 0;
                    const budget = 
                      subcategoryBudgets[`expense-${sub}`] || 0;
                    return (
                      <div key={sub} className="mb-2 p-2 bg-gray-50 rounded">
                        <div className="flex justify-between">
                          <span className="font-medium">{sub}</span>
                          <span className="text-red-600">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Budget: ${budget.toFixed(2)}</span>
                          {budget > 0 && (
                            <span className={total > budget ? 'text-red-500' : 'text-green-500'}>
                              ({((total / budget) * 100).toFixed(0)}%)
                            </span>
                          )}
                        </div>
                        {budget > 0 && (
                          <div className="text-sm text-blue-500 text-right">
                            ${calculateDailyLimit(budget, total)}/day remaining
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Overall Budget</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total Expenses:</span>
                  <span className="text-red-600">${totalExpenses.toFixed(2)}</span>
                </div>
                {overallBudget > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium">Budget:</span>
                      <span className="text-blue-600">${overallBudget.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Percentage Used:</span>
                      <span className={totalExpenses > overallBudget ? 'text-red-500' : 'text-green-500'}>
                        {((totalExpenses / overallBudget) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Daily Spending Limit:</span>
                      <span className="text-blue-600">${calculateDailyLimit(overallBudget, totalExpenses)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
        <div className="space-y-2">
          {transactions.slice(-5).reverse().map((transaction) => (
            <div
              key={transaction.id}
              className={`flex justify-between p-3 rounded ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <div>
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-gray-600">{transaction.subcategory}</div>
                <div className="text-xs text-gray-500">{transaction.date}</div>
              </div>
              <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ));
}