import React, { useState, useEffect } from 'react'
import EmployeeServices from '../service/EmloyeeServices';

function UserLeave() {
    const [leave, setleave] = useState([]);
    useEffect(() => {

        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('token');
            const employeeid = localStorage.getItem('id');

            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await EmployeeServices.getuserapplication(employeeid,token);
            console.log('API Response:', response); // Debugging line

            if (response && response.leaveDetailsList) {
                setleave(response.leaveDetailsList);
            } else {
                console.error('Invalid response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    

    
    return (
        <>
            <div>
                <>
                    <div className="p-10 ml-40  ">
                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Application Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    Employee Name
                                                    <a href="#"></a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    Leave Type
                                                    <a href="#"></a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    Start Date
                                                    <a href="#"></a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    End Date
                                                    <a href="#"></a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    Reason
                                                    <a href="#"></a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">

                                                    <a href="#"></a>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leave.map(
                                            leave => (
                                                <tr key={leave.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {leave.id}
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {leave.employeeid}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {leave.leaveType}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {leave.startDate}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {leave.endDate}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {leave.reason}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                       
                                                            <span className="font-medium text-gray-400 dark:text-gray-500" >{leave.status}</span>
 
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
            </div>

        </>
    )
}

export default UserLeave
