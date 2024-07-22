import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./Component/Navigation";
import EmpNavigation from "./Component/EmpNavigation";
import Dashboard from './Pages/Dashboard';
// import Chat from './pages/Chat';
import Login from './Pages/Login';
import NoNavbarPage from './Component/noNavigation';
import Home from './Pages/Home';
import Consultation from './Pages/Consultation';
import PatientSearch from './Pages/PatientSearch';
import FollowupConsultation from './Pages/FollowupConsultation';
import AIchat from './Pages/AIchat';
import Patient from './Pages/Patient';
import HistoryPage from './Pages/HistoryPage';
import CreatePatientPage from './Pages/CreatePatient';

function App() {//This is the function that contains the react app
  return (
    <BrowserRouter>{/*This wraps the whole app in the BrowserRouter which handles navigation and routing in a react application */}

      {/* <Navigation /> The navigation is outside cause the route wont change */}
        <Routes>{/*This is a container for all the Route definition */}
          <Route 
          path="/" 
          element={
            <>
              <NoNavbarPage navItems={['Dashboard', 'Login']} />
              <Home />
            </>
          }
          />
          <Route
          path="/dashboard"
          element={
            <>
              {/* <Navigation navItems={['Dashboard', 'AI Chat']} /> */}
              <Dashboard />
            </>
          }
        />
          {/* Route difines how different url are handled, This renders the Home element in the react app*/}
          <Route 
          path="/login" 
          element={
            <>
              <EmpNavigation navItems={['Home']} />
              <Login />
            </>
          }
          />
          <Route
          path="/create-patient"
          element={
            <>
              <Navigation navItems={['Dashboard', 'AI Chat']} />
              <CreatePatientPage />
            </>
          }
        />
          <Route
          path="/consultation-new"
          element={
            <>
              <Navigation navItems={['Dashboard', 'AI Chat']} />
              <Consultation />
            </>
          }
        />
        <Route
          path="/consultation-follow-up"
          element={
            <>
              <Navigation navItems={['Dashboard', 'AI Chat']} />
              <FollowupConsultation />
            </>
          }
        />
        <Route
          path="/patient-search"
          element={
            <>
              <Navigation navItems={['Dashboard', 'AI Chat']} />
              <PatientSearch />
            </>
          }
        />
        <Route
          path="/AIchat"
          element={
            <>
              <Navigation navItems={['Dashboard', 'AI Chat']} />
              <AIchat />
            </>
          }
        />
        <Route
          path="/patient-page"
          element={
            <>
              <Navigation navItems={['Dashboard', 'AI Chat']} />
              <Patient />
            </>
          }
        />
        <Route
          path="/History-page"
          element={
            <>
              <Navigation navItems={['Dashboard', 'AI Chat']} />
              <HistoryPage />
            </>
          }
        />
        </Routes>
    </BrowserRouter>
  );
}

export default App;