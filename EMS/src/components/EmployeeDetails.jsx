"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import EmployeeServices from "../service/EmloyeeServices"

function EmployeeDetails() {
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No authentication token found. Please log in again.")
        setIsLoading(false)
        return
      }

      const response = await EmployeeServices.getallEmployee(token)

      if (response && response.employeesList) {
        setEmployees(response.employeesList)
      } else {
        setError("Unable to fetch employee data")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("Failed to load employees. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUser = async (employeeId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?")

      if (confirmDelete) {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No authentication token found. Please log in again.")
          return
        }

        setIsLoading(true)
        await EmployeeServices.deleteEmployee(employeeId, token)
        fetchUsers()
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      setError("Failed to delete employee. Please try again.")
      setIsLoading(false)
    }
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-4 sm:ml-64 pt-20 bg-gray-50 min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Employee Management</h1>
            <p className="text-gray-500 mt-1">Manage your organization&apos;s employees</p>
          </div>
          <Link
            to="/register"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Employee
          </Link>
        </div>

        {/* Search and filters */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search for employees"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
            <button className="mt-2 text-blue-600 hover:underline focus:outline-none" onClick={fetchUsers}>
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
            {/* Employee table */}
            {filteredEmployees.length > 0 ? (
              <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        First Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Last Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{employee.id}</td>
                        <td className="px-6 py-4">{employee.firstName}</td>
                        <td className="px-6 py-4">{employee.lastName}</td>
                        <td className="px-6 py-4">{employee.email}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                            onClick={() => alert(`Edit employee: ${employee.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="font-medium text-red-600 hover:text-red-800 hover:underline"
                            onClick={() => deleteUser(employee.id)}
                          >
                            Delete
                          </button>
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
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? "No results match your search criteria." : "Get started by adding a new employee."}
                </p>
                <div className="mt-6">
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Employee
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default EmployeeDetails
