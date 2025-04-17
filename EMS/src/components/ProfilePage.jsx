"use client"

import { useEffect, useState } from "react"
import EmployeeServices from "../service/EmloyeeServices"
import { UserIcon, MailIcon, PhoneIcon, BriefcaseIcon, BuildingIcon } from "lucide-react"

function ProfilePage() {
  const [employee, setEmployee] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
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

      const response = await EmployeeServices.getEmployee(employeeId, token)

      if (response && response.employee) {
        setEmployee(response.employee)
      } else {
        setError("Unable to fetch employee data")
      }
    } catch (error) {
      console.error("Error fetching employee:", error)
      setError("Failed to load employee profile. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:ml-64 pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 sm:ml-64 pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
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
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:ml-64 pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div className="flex items-center">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center border-4 border-white">
                <UserIcon className="h-12 w-12 text-blue-500" />
              </div>
              <div className="ml-6 text-white">
                <h1 className="text-2xl font-bold">
                  {employee.firstName} {employee.lastName}
                </h1>
                <p className="text-blue-100">Employee ID: {employee.id}</p>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                      <MailIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="mt-1 text-sm text-gray-900">{employee.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                      <PhoneIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="mt-1 text-sm text-gray-900">{employee.phoneNum || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Employment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                      <BriefcaseIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Position</p>
                    <p className="mt-1 text-sm text-gray-900">Software Developer</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                      <BuildingIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="mt-1 text-sm text-gray-900">Software Development</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="mt-1 text-sm text-gray-900">{employee.role || "Employee"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Joined Date</p>
                    <p className="mt-1 text-sm text-gray-900">{employee.joinDate || "Not available"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
