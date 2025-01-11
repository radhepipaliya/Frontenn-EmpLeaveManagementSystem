
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import SideBar from './components/SideBar';
import EmployeeServices from './service/EmloyeeServices'
import Register from './components/Register';
import Body from './components/Body';
import EmployeeDetails from './components/EmployeeDetails';
import AdminDashboard from './components/AdminDashboard';
import Leave from './components/Leave';
import LeaveRequest from './components/LeaveRequest';
import UserLeave from './components/UserLeave';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <SideBar />
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/body" element={<Body />} />
              <Route path="/leaverequest" element={<LeaveRequest/>} />
              {/* Check if user is authenticated and admin before rendering admin-only routes */}
              {EmployeeServices.isAdmin() && (
                <>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/leave" element={<LeaveRequest/>} />
                  <Route path="/employee" element={<EmployeeDetails />} />
                </>
              )}

              {EmployeeServices.isUser() && (
                <>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/employee" element={<ProfilePage/>} />
                  <Route path="/leave" element={<><Leave/><UserLeave/></>} />
                  
                </>
              )}



            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
