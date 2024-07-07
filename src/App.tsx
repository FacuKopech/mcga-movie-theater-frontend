import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import './App.css'
import { useLoading, LoadingProvider } from "./context/loadingContext";
import Spinner from "./components/spinner";
import HomePageWithProvider from "./pages/homePageWithProvider";
import ErrorPage from "./pages/404ErrorPage";
import Register from "./pages/register";

const App = () => {
  const { loading } = useLoading();
  return (
    <div className="div-app-container">
      {loading && <Spinner />}
      <Routes>
        <Route path="/" element={<HomePageWithProvider />} />
        <Route path="/login" element={<Login closePopup={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/register" element={<Register onClick={function (showRegister: boolean): void {
          throw new Error("Function not implemented.");
        } } onRegisterResult={function (message: string): void {
          throw new Error("Function not implemented.");
        } } />} />
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