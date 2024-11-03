import React from 'react'
import { useBudgetContext } from '../context/BudgetProvider';

const Navbar = () => {
  const {page} = useBudgetContext();
  return (
    <div className='navbar w-full p-2 flex justify-between items-center bg-black text-white'>
      <div className="left-h">
        <img src="" alt="bachat" />
      </div>
      <div className="right-h">
        <ul className='flex justify-between w-full p-6 text-xl gap-4'>
            <li onClick={() => page('tracker')}>Tracker</li>
            <li onClick={() => page('expense')}>Expense</li>
            <li onClick={() => page('income')}>Income</li>
            <li onClick={() => page('budget')}>Budget</li>
            <li onClick={() => page('profile')}>Profile</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
