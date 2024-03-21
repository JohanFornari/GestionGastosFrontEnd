import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './Components/Footer';
import Login from './Components/Login';
import Header from './Components/Header';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import SidebarMenu from './Components/SidebarMenu';

function App() {
  return (
      
    
      <div>
      <Router>
        <div className="App">
        
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>


        </div>
      </Router>

    </div>
  );
}

export default App;
