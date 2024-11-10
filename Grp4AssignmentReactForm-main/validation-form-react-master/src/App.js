import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductRegistrationForm from './components/ProductRegistrationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<ProductRegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;