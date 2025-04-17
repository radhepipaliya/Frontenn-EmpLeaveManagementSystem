"use client"

import { useState, useEffect } from "react"
import EmployeeServices from "../service/EmloyeeServices"
import { CalendarIcon, ClockIcon } from "lucide-react"

function UserLeave() {
  const [leaveRequests, setLeaveRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const token = localStorage.getItem("token")
      const employeeId = localStorage.getItem("id")

      if (!token) {
        setError("No authentication token found. Please log in again.")
        setIsLoading(false)
        return
      }

      const response = await EmployeeServices.getuserapplication(employeeId, token)

      if (response && response.leaveDetailsList) {
        setLeaveRequests(response.leaveDetailsList)
      } else {
        setError("Unable to fetch leave requests")
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error)
      setError("Failed to load leave requests. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredLeaveRequests =
    filterStatus === "all"
      ? leaveRequests
      : leaveRequests.filter((leave) => leave.status.toLowerCase() === filterStatus.toLowerCase())

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  return (
    <div className="max-w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Leave Requests</h2>
        <p className="text-gray-500 mt-1">View and track your leave applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
            filterStatus === "all"
              ? "bg-blue-100 text-blue-800 border border-blue-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
            filterStatus === "pending"
              ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus("accepted")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
            filterStatus === "accepted"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => setFilterStatus("rejected")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
            filterStatus === "rejected"
              ? "bg-red-100 text-red-800 border border-red-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
                clipRule="evenodd"
              ></path>
            </svg>
            {error}
          </div>
          <button className="mt-2 text-blue-600 hover:underline focus:outline-none" onClick={fetchApplications}>
            Try again
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Leave requests */}
          {filteredLeaveRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredLeaveRequests.map((leave) => (
                <div
                  key={leave.id}
                  className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(leave.status)}`}
                    >
                      {leave.status}
                    </span>
                    <span className="text-xs text-gray-500">ID: {leave.id}</span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{leave.leaveType} Leave</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>
                        {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{calculateDuration(leave.startDate, leave.endDate)} days</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">Reason</h4>
                    <p className="text-sm text-gray-700">{leave.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No leave requests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filterStatus !== "all"
                  ? `No ${filterStatus} leave requests available.`
                  : "You haven't submitted any leave requests yet."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default UserLeave
