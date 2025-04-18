"use client"

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./App.css"
import Login from "./components/Login"
import SideBar from "./components/SideBar"
import EmployeeServices from "./service/EmloyeeServices"
import Register from "./components/Register"
import Body from "./components/Body"
import EmployeeDetails from "./components/EmployeeDetails"
import AdminDashboard from "./components/AdminDashboard"
import Leave from "./components/Leave"
import LeaveRequest from "./components/LeaveRequest"
import UserLeave from "./components/UserLeave"
import ProfilePage from "./components/ProfilePage"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const isAdmin = EmployeeServices.isAdmin()
  const isUser = EmployeeServices.isUser()
  const isAuthenticated = EmployeeServices.isAuthenticated()

  useEffect(() => {
    // Simulate checking auth status
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      {isAuthenticated && <SideBar />}
      <div className={isAuthenticated ? "transition-all duration-300" : ""}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes - require authentication */}
          {isAuthenticated ? (
            <>
              <Route path="/body" element={<Body />} />

              {/* Admin routes */}
              {isAdmin && (
                <>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/leave" element={<LeaveRequest />} />
                  <Route path="/employee" element={<EmployeeDetails />} />
                  <Route path="/leaverequest" element={<LeaveRequest />} />
                </> 
              )}

              {/* User routes */}
              {isUser && (
                <>
                  <Route path="/dashboard" element={<Navigate to="/employee" />} />
                  <Route path="/employee" element={<ProfilePage />} />
                  <Route
                    path="/leave"
                    element={
                      <div className="p-4 sm:ml-64 pt-20">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <Leave />
                          <div className="mt-8">
                            <UserLeave />
                          </div>
                        </div>
                      </div>
                    }
                  />
                </>
              )}

              {/* Catch-all route for authenticated users */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            // Redirect unauthenticated users
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
