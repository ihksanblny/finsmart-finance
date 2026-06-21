import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Ledger from './pages/Ledger';
import RealIncome from './pages/RealIncome';
import MarketValue from './pages/MarketValue';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ledger" 
          element={
            <ProtectedRoute>
              <Ledger />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/kalkulator" 
          element={<RealIncome />} 
        />
        <Route 
          path="/market-value" 
          element={<MarketValue />} 
        />
      </Routes>
    </Router>
  )
}

export default App;
