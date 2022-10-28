import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import logo from './logo.svg';
import SharedLayout from './pages/SharedLayout';
import './App.css';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
