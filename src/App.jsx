import './App.css';
import Navbar from './components/Navbar';
import Tracker from './pages/Tracker';
import Expense from './pages/Expense';
import Income from './pages/Income';
import Budget from './pages/Budget';

function App() {



  return (
    <div className="App">
      <Navbar/>
      <div>
        <Tracker/>
        <Expense/>
        <Income/>
        <Budget/>
      </div>
    </div>
  );
}

export default App;
