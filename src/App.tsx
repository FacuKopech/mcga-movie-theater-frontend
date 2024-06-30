import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Home from './pages/home'
import './App.css'
import { useLoading, LoadingProvider } from "./context/loadingContext";
import Spinner from "./components/spinner";
import HomePageWithProvider from "./pages/homePageWithProvider";
import ErrorPage from "./pages/404ErrorPage";

const App = () => {
  const { loading } = useLoading();
  return (
    <div className="div-app-container">
      {loading && <Spinner />}
      <Routes>
        <Route path="/" element={<HomePageWithProvider />} />
        <Route path="/login" element={<Login />} />
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