import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
