import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from "../Components/HomePage";
import LoginPage from "../Components/LoginPage";
import NotFound from '../Components/NotFoundPage';
import PatientDetailPage from '../Components/PatientDetailPage';
import PatientList from '../Components/PatientList';

const ReactRouter = () => {

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }


  return (
    <Router>
      <Routes>
        
        <Route path="/patients" element={isLoggedIn() ? <PatientList /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={isLoggedIn() ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/:id/detail" element={isLoggedIn() ? <PatientDetailPage/> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default ReactRouter;
