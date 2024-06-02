import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Home from './pages/home'
import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};


const AppWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className={isLoginPage ? 'login-background' : 'default-background'}>

      <App />
    </div>
  );
};

const Root = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default Root;