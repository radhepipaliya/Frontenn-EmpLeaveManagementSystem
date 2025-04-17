"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import EmployeeServices from "../service/EmloyeeServices"
import { CalendarIcon, ClockIcon, CheckCircleIcon } from "lucide-react"

function Leave() {
  const navigate = useNavigate()
  const [leaveDetails, setLeaveDetails] = useState({
    employeeid: "",
    startDate: "",
    endDate: "",
    reason: "",
    leaveType: "",
  })
  const [employeeId, setEmployeeId] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const employeeData = localStorage.getItem("id")
        setEmployeeId(employeeData)
      } catch (error) {
        console.error("Error fetching employee data:", error)
      }
    }
    fetchEmployeeData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLeaveDetails({ ...leaveDetails, [name]: value })

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!leaveDetails.employeeid) {
      errors.employeeid = "Please select an employee ID"
    }

    if (!leaveDetails.startDate) {
      errors.startDate = "Start date is required"
    }

    if (!leaveDetails.endDate) {
      errors.endDate = "End date is required"
    } else if (leaveDetails.startDate && new Date(leaveDetails.endDate) < new Date(leaveDetails.startDate)) {
      errors.endDate = "End date cannot be before start date"
    }

    if (!leaveDetails.leaveType) {
      errors.leaveType = "Please select a leave type"
    }

    if (!leaveDetails.reason) {
      errors.reason = "Please provide a reason for your leave"
    } else if (leaveDetails.reason.length < 10) {
      errors.reason = "Please provide a more detailed reason (at least 10 characters)"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage("")

      const token = localStorage.getItem("token")
      await EmployeeServices.applyLeave(leaveDetails, token)

      setSuccessMessage("Leave application submitted successfully!")

      // Reset form after successful submission
      setLeaveDetails({
        employeeid: "",
        startDate: "",
        endDate: "",
        reason: "",
        leaveType: "",
      })

      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/employee")
      }, 2000)
    } catch (error) {
      console.error("Error submitting leave application:", error)
      setErrorMessage("An error occurred while submitting your leave application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateDuration = () => {
    if (leaveDetails.startDate && leaveDetails.endDate) {
      const start = new Date(leaveDetails.startDate)
      const end = new Date(leaveDetails.endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    return null
  }

  const leaveDuration = calculateDuration()

  return (
    <div className="p-4 sm:ml-64 pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Leave Application</h1>
          <p className="text-gray-500 mt-1">Submit a request for time off</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}

        {errorMessage && <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="employeeid" className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <select
                id="employeeid"
                name="employeeid"
                className={`bg-gray-50 border ${
                  formErrors.employeeid ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={leaveDetails.employeeid}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select Employee ID</option>
                <option value={employeeId}>{employeeId}</option>
              </select>
              {formErrors.employeeid && <p className="mt-1 text-sm text-red-600">{formErrors.employeeid}</p>}
            </div>

            <div>
              <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">
                Leave Type
              </label>
              <select
                id="leaveType"
                name="leaveType"
                className={`bg-gray-50 border ${
                  formErrors.leaveType ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={leaveDetails.leaveType}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select Type</option>
                <option value="Paid">Paid Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
              </select>
              {formErrors.leaveType && <p className="mt-1 text-sm text-red-600">{formErrors.leaveType}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leave Duration</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="date"
                  name="startDate"
                  className={`bg-gray-50 border ${
                    formErrors.startDate ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
                  value={leaveDetails.startDate}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {formErrors.startDate && <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="date"
                  name="endDate"
                  className={`bg-gray-50 border ${
                    formErrors.endDate ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
                  value={leaveDetails.endDate}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {formErrors.endDate && <p className="mt-1 text-sm text-red-600">{formErrors.endDate}</p>}
              </div>
            </div>

            {leaveDuration && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>
                  {leaveDuration} {leaveDuration === 1 ? "day" : "days"} of leave
                </span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Leave
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="4"
              className={`bg-gray-50 border ${
                formErrors.reason ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              placeholder="Please provide a detailed reason for your leave request..."
              value={leaveDetails.reason}
              onChange={handleChange}
              disabled={isSubmitting}
            ></textarea>
            {formErrors.reason && <p className="mt-1 text-sm text-red-600">{formErrors.reason}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
              onClick={() => navigate("/employee")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Leave
