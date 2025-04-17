"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import EmployeeServices from "../service/EmloyeeServices"
import { CheckCircleIcon, XCircleIcon, UserPlusIcon } from "lucide-react"

function Register() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [formErrors, setFormErrors] = useState({})

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNum: "",
    role: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10}$/

    if (!formData.email) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      errors.password = "Password is required"
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (!formData.firstName) {
      errors.firstName = "First name is required"
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required"
    }

    if (!formData.phoneNum) {
      errors.phoneNum = "Phone number is required"
    } else if (!phoneRegex.test(formData.phoneNum)) {
      errors.phoneNum = "Please enter a valid 10-digit phone number"
    }

    if (!formData.role || formData.role === "Roles") {
      errors.role = "Please select a role"
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
      await EmployeeServices.register(formData, token)

      // Clear the form fields after successful registration
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNum: "",
        role: "",
      })

      setSuccessMessage("Employee registered successfully!")

      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate("/employee")
      }, 2000)
    } catch (error) {
      console.error("Error registering user:", error)
      setErrorMessage("An error occurred while registering the employee. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 sm:ml-64 pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Register New Employee</h1>
            <p className="text-gray-500 mt-1">Add a new employee to the system</p>
          </div>
          <UserPlusIcon className="h-8 w-8 text-blue-600" />
        </div>

        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 flex items-center">
            <XCircleIcon className="h-5 w-5 mr-2" />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`bg-gray-50 border ${
                  formErrors.firstName ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              {formErrors.firstName && <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`bg-gray-50 border ${
                  formErrors.lastName ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              {formErrors.lastName && <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`bg-gray-50 border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`bg-gray-50 border ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`bg-gray-50 border ${
                  formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phoneNum" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNum"
                name="phoneNum"
                className={`bg-gray-50 border ${
                  formErrors.phoneNum ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={formData.phoneNum}
                onChange={handleInputChange}
                placeholder="10-digit number"
                disabled={isSubmitting}
              />
              {formErrors.phoneNum && <p className="mt-1 text-sm text-red-600">{formErrors.phoneNum}</p>}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                className={`bg-gray-50 border ${
                  formErrors.role ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={formData.role}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="">Select Role</option>
                <option value="USER">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
              {formErrors.role && <p className="mt-1 text-sm text-red-600">{formErrors.role}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4">
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
                  Registering...
                </>
              ) : (
                "Register Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register