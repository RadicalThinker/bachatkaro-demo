import React from 'react';
import { useBudgetContext } from '../context/BudgetProvider';

export default function Budget() {
  const {
    subcategories,
    subcategoryTotals,
    subcategoryBudgets,
    overallBudget,
    totalExpenses,
    daysInMonth,
    calculateDailyLimit,
    currentpage,
  } = useBudgetContext();

  const calculateRemainingBudget = (total, budget) => {
    return Math.max(budget - total, 0).toFixed(2);
  };

  const calculateDailyRecommendation = (remaining, daysLeft) => {
    return (remaining / daysLeft).toFixed(2);
  };

  const today = new Date();
  const daysLeftInMonth = daysInMonth - Number(today.getDate()) + 1;

  return (
    (currentpage === 'budget') && (
        <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Detailed Budget Overview</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Overall Budget</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="text-lg font-medium text-blue-600">₹{overallBudget.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-lg font-medium text-red-600">₹{totalExpenses.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="text-lg font-medium text-green-600">₹{calculateRemainingBudget(totalExpenses, overallBudget)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Daily Recommendation</p>
            <p className="text-lg font-medium text-purple-600">
              ₹{calculateDailyLimit(overallBudget, totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Expense Subcategories</h3>
        <div className="space-y-4">
          {subcategories.expense.map((subcategory) => {
            const total = subcategoryTotals[`expense-${subcategory}`] || 0;
            const budget = subcategoryBudgets[`expense-${subcategory}`] || 0;
            const remaining = calculateRemainingBudget(total, budget);
            const dailyRecommendation = calculateDailyRecommendation(remaining, daysLeftInMonth);

            return (
              <div key={subcategory} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="text-lg font-medium text-gray-800 mb-2">{subcategory}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="text-md font-medium text-blue-600">₹{budget.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Spent</p>
                    <p className="text-md font-medium text-red-600">₹{total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className="text-md font-medium text-green-600">₹{remaining}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Daily Recommendation</p>
                    <p className="text-md font-medium text-purple-600">₹{dailyRecommendation}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${Math.min((total / budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {budget > 0 ? `${((total / budget) * 100).toFixed(0)}% of budget used` : 'No budget set'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Income Subcategories</h3>
        <div className="space-y-4">
          {subcategories.income.map((subcategory) => {
            const total = subcategoryTotals[`income-${subcategory}`] || 0;

            return (
              <div key={subcategory} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="text-lg font-medium text-gray-800 mb-2">{subcategory}</h4>
                <div>
                  <p className="text-sm text-gray-600">Total Income</p>
                  <p className="text-md font-medium text-green-600">₹{total.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ));
}