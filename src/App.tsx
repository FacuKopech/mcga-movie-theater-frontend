import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import './App.css'
import { useLoading, LoadingProvider } from "./context/loadingContext";
import Spinner from "./components/spinner";
import HomePageWithProvider from "./pages/homePageWithProvider";
import ErrorPage from "./pages/404ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token'));
  });
  const { loading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('COOKIES', document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token=')));      
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/check-auth`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
          navigate("/home");
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [navigate]);


  return (
    <div className="div-app-container">
      {loading && <Spinner />}
      <Routes>
        <Route path="/" element={<HomePageWithProvider />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/home" element={<HomePageWithProvider />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
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
  <LoadingProvider>
    <Router>
      <AppWrapper />
    </Router>
  </LoadingProvider>

);

export default Root;