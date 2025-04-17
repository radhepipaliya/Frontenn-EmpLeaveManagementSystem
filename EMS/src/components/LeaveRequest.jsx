import React, { useState, useEffect } from 'react'
import EmployeeServices from '../service/EmloyeeServices';


function LeaveRequest() {
    const [leave, setleave] = useState([]);
    useEffect(() => {

        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await EmployeeServices.getallapplication(token);
            console.log('API Response:', response);

            if (response && response.leaveDetailsList) {
                setleave(response.leaveDetailsList);
            } else {
                console.error('Invalid response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAccept = async (applicationId) => {
        try {
            alert('Accepting application:', applicationId);
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
    
            const statusPayload = { status: "Accepted" };
            console.log(statusPayload)
            await EmployeeServices.updateApplicationStatus(applicationId, statusPayload, token);
            fetchApplications();
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    const handleReject = async (applicationId) => {
        try {
            alert('Accepting application:', applicationId);
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
    
            const statusPayload = { status: "Rejected" };
            console.log(statusPayload)
            await EmployeeServices.updateApplicationStatus(applicationId, statusPayload, token);
            fetchApplications();
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    return (
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
                                                {`${leave.employee.firstName} ${leave.employee.lastName}`}
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
                                                    {leave.status === 'Pending' ? (
                                                         <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" 
                                                         onClick={()=>handleAccept(leave.id)}>
                                                         Accept
                                                     </button>
                                                    ) : (
                                                        <span className="font-medium text-gray-400 dark:text-gray-500" >Accept</span>
                                                        
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                {leave.status === 'Pending' ? (
                                                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"onClick={()=>handleReject(leave.id)}>
                                                        Reject
                                                    </button>
                                                    ) : (
                                                        <span className="font-medium text-gray-400 dark:text-gray-500">Reject</span>
                                                        
                                                    )}
                                                    
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
    )
}

export default LeaveRequest
