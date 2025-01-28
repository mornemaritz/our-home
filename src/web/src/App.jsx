import 'w3-css/4/w3pro.css';
import './w3-theme-teal.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './Products';
import AuthProvider from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import Login from './Login';

function App() {

  return (
    <>
      <header className="w3-container w3-center w3-theme w3-padding" id="myHeader">
        <h4>OUR HOME</h4>
      </header>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute/>} >
              <Route path="/shopping-list" element={<Products />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <footer className="w3-container w3-theme">
        <p>OUR HOME © 2025 - All rights reserved</p>
      </footer>
    </>
  );
};

export default App
