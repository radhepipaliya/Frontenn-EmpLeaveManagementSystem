"use client"

import { useState, useEffect } from "react"
import EmployeeServices from "../service/EmloyeeServices"

function LeaveRequest() {
  const [leaveRequests, setLeaveRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No authentication token found. Please log in again.")
        setIsLoading(false)
        return
      }

      const response = await EmployeeServices.getallapplication(token)

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

  const handleAccept = async (applicationId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No authentication token found. Please log in again.")
        return
      }

      setIsLoading(true)
      const statusPayload = { status: "Accepted" }
      await EmployeeServices.updateApplicationStatus(applicationId, statusPayload, token)
      fetchApplications()
    } catch (error) {
      console.error("Error updating application status:", error)
      setError("Failed to accept leave request. Please try again.")
      setIsLoading(false)
    }
  }

  const handleReject = async (applicationId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No authentication token found. Please log in again.")
        return
      }

      setIsLoading(true)
      const statusPayload = { status: "Rejected" }
      await EmployeeServices.updateApplicationStatus(applicationId, statusPayload, token)
      fetchApplications()
    } catch (error) {
      console.error("Error updating application status:", error)
      setError("Failed to reject leave request. Please try again.")
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

  return (
    <div className="p-4 sm:ml-64 pt-20 bg-gray-50 min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Leave Requests</h1>
          <p className="text-gray-500 mt-1">Manage employee leave applications</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterStatus === "all"
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterStatus === "pending"
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("accepted")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterStatus === "accepted"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Accepted
            </button>
            <button
              onClick={() => setFilterStatus("rejected")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterStatus === "rejected"
                  ? "bg-red-100 text-red-800 border border-red-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Rejected
            </button>
          </div>
          <button
            onClick={fetchApplications}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Refresh
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
            {/* Leave requests table */}
            {filteredLeaveRequests.length > 0 ? (
              <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Employee
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Reason
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeaveRequests.map((leave) => (
                      <tr key={leave.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{leave.id}</td>
                        <td className="px-6 py-4">{`${leave.employee.firstName} ${leave.employee.lastName}`}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {leave.leaveType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span>{formatDate(leave.startDate)}</span>
                            <span className="text-xs text-gray-500">to</span>
                            <span>{formatDate(leave.endDate)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs truncate" title={leave.reason}>
                            {leave.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(leave.status)}`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {leave.status === "Pending" ? (
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleAccept(leave.id)}
                                className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleReject(leave.id)}
                                className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    : "There are no leave requests to display."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default LeaveRequest