import { Link } from "react-router-dom"

function AdminDashboard() {
  // Sample data - replace with actual data from your API
  const stats = {
    employees: 4,
    departments: 4,
    totalSalary: "$24,000",
    leaveApplied: 4,
    leaveApproved: 2,
    leavePending: 1,
    leaveRejected: 1,
  }

  return (
    <div className="p-4 sm:ml-64 pt-20 bg-gray-50 min-h-screen">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center">
            <div className="rounded-full bg-blue-50 p-3 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Employees</p>
              <p className="text-2xl font-bold text-gray-700">{stats.employees}</p>
              <Link to="/employee" className="text-blue-500 text-sm hover:underline">
                View all employees
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center">
            <div className="rounded-full bg-green-50 p-3 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Departments</p>
              <p className="text-2xl font-bold text-gray-700">{stats.departments}</p>
              <Link to="#" className="text-green-500 text-sm hover:underline">
                Manage departments
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center">
            <div className="rounded-full bg-purple-50 p-3 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Salary</p>
              <p className="text-2xl font-bold text-gray-700">{stats.totalSalary}</p>
              <Link to="#" className="text-purple-500 text-sm hover:underline">
                View payroll
              </Link>
            </div>
          </div>
        </div>

        {/* Leave Management Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Leave Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className="rounded-full bg-blue-50 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Total</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Leave Applied</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.leaveApplied}</p>
              <div className="mt-4">
                <Link to="/leave" className="text-sm text-blue-500 hover:underline">
                  View all
                </Link>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className="rounded-full bg-green-50 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">Approved</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Leave Approved</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.leaveApproved}</p>
              <div className="mt-4">
                <Link to="/leave" className="text-sm text-green-500 hover:underline">
                  View details
                </Link>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className="rounded-full bg-yellow-50 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full">Pending</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Leave Pending</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.leavePending}</p>
              <div className="mt-4">
                <Link to="/leave" className="text-sm text-yellow-500 hover:underline">
                  Review now
                </Link>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-red-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className="rounded-full bg-red-50 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">Rejected</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Leave Rejected</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.leaveRejected}</p>
              <div className="mt-4">
                <Link to="/leave" className="text-sm text-red-500 hover:underline">
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <ul className="divide-y divide-gray-200">
              <li className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">New employee John Doe added</p>
                    <p className="text-sm text-gray-500">Development Department</p>
                  </div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Leave request approved</p>
                    <p className="text-sm text-gray-500">For Jane Smith</p>
                  </div>
                  <div className="text-sm text-gray-500">Yesterday</div>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">New leave request pending</p>
                    <p className="text-sm text-gray-500">From Robert Johnson</p>
                  </div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard