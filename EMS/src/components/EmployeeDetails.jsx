import React, { useState, useEffect } from 'react'
import EmployeeServices from '../service/EmloyeeServices';

function EmployeeDetails() {
    const [employee, setEmployee] = useState([]);
    useEffect(() => {
        
        fetchUsers();
      }, []);


      const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
            const response = await EmployeeServices.getallEmployee(token);
            console.log('API Response:', response); // Debugging line
            if (response && response.employeesList) {
                setEmployee(response.employeesList);
            } else {
                console.error('Invalid response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    

    const deleteUser = async (employeeId) => {
        try {
          // Prompt for confirmation before deleting the user
          const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    
          const token = localStorage.getItem('token'); // Retrieve the token from localStorage
          if (confirmDelete) {
            await EmployeeServices.deleteEmployee(employeeId, token);
            // After deleting the user, fetch the updated list of users
            fetchUsers();
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };


    return (

        <>
            <div className="p-10 ml-40 ">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Employee First name
                                            <a href="#"></a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Employee Last name
                                            <a href="#"></a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Gmail
                                            <a href="#"></a>
                                        </div>
                                    </th>

                                    <th scope="col " colSpan={2} className="px-8 py-3 2">
                                        
                                    <a href="/register" className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Register</a>

                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {employee.map(
                                    employee => (
                                        <tr key={employee.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {employee.id}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {employee.firstName}
                                            </th>
                                            <td className="px-6 py-4">
                                                {employee.lastName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.email}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>deleteUser(employee.id)}>Delete</a>
                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeDetails
