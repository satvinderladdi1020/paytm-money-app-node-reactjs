
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from './components/Callback/Callback';
import Login from './components/LoginPaytmMoney/LoginPaytmMoney';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
