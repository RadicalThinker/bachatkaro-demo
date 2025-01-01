import React, { useState } from 'react';
import { useBudgetContext } from '../context/BudgetProvider';

export default function Income() {
  const { subcategories, subcategoryTotals, transactions, currentpage } = useBudgetContext();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCardClick = (subcategory) => {
    setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory);
  };

  return (
    (currentpage === 'income') && (
        <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Income Subcategories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subcategories.income.map((subcategory) => {
          const total = subcategoryTotals[`income-${subcategory}`] || 0;

          return (
            <div key={subcategory} className="space-y-4">
              <button
                onClick={() => handleCardClick(subcategory)}
                className="w-full text-left"
              >
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-gray-700">{subcategory}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-green-600 font-medium">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 text-sm text-blue-500">
                    Click for details
                  </div>
                </div>
              </button>

              {selectedSubcategory === subcategory && (
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                  <h4 className="text-md font-semibold text-gray-700 mb-2">Transaction Details</h4>
                  {transactions
                    .filter(t => t.type === 'income' && t.subcategory === subcategory)
                    .map(transaction => (
                      <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-800">{transaction.description}</span>
                        <span className="text-green-600">₹{transaction.amount.toFixed(2)}</span>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ));
}