import React, { createContext, useState, useEffect, useContext } from 'react';

const BudgetContext = createContext();

export const useBudgetContext = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [subcategories, setSubcategories] = useState({
    income: ['Salary', 'Freelance'],
    expense: ['Food', 'Rent', 'Utilities']
  });
  const [subcategoryTotals, setSubcategoryTotals] = useState({});
  const [overallBudget, setOverallBudget] = useState(0);
  const [subcategoryBudgets, setSubcategoryBudgets] = useState({});
  const [daysInMonth, setDaysInMonth] = useState(30);
  const [currentpage, setCurrentpage] = useState('tracker');


  useEffect(() => {
    calculateSubcategoryTotals();
  }, [transactions]);


  const page = (value) =>{
    setCurrentpage(value);
  }
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const addSubcategory = (type, newSubcategory) => {
    setSubcategories({
      ...subcategories,
      [type]: [...subcategories[type], newSubcategory]
    });
  };

  const calculateSubcategoryTotals = () => {
    const totals = {};
    transactions.forEach((transaction) => {
      const key = `${transaction.type}-${transaction.subcategory}`;
      if (!totals[key]) {
        totals[key] = 0;
      }
      totals[key] += transaction.amount;
    });
    setSubcategoryTotals(totals);
  };

  const setBudget = (category, amount) => {
    if (category === 'overall') {
      setOverallBudget(amount);
    } else {
      setSubcategoryBudgets({
        ...subcategoryBudgets,
        [category]: amount
      });
    }
  };

  const balance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income'
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  const totalExpenses = Object.entries(subcategoryTotals)
    .filter(([key]) => key.startsWith('expense'))
    .reduce((sum, [_, value]) => sum + value, 0);

  const calculateDailyLimit = (budget, spent) => {
    const remaining = budget - spent;
    return (remaining / daysInMonth).toFixed(2);
  };

  const value = {
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
    currentpage,
    page
  };

  return <BudgetContext.Provider value={value}>
    {children}
    </BudgetContext.Provider>;
};