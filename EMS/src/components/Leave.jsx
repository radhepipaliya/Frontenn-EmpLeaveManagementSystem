import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import EmployeeServices from '../service/EmloyeeServices'; 

function Leave() {
    const navigate = useNavigate();
    const [leaveDetails, setLeaveDetails] = useState({
        employeeid: "",
        startDate: "",
        endDate: "",
        reason: "",
        leaveType: "", // Default to Paid Leave
    });
    const [employeeId, setEmployeeId] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        
        async function fetchEmployeeData() {
            try {
                const employeeData =  localStorage.getItem('id');
                console.log(employeeData);
                setEmployeeId(employeeData);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        fetchEmployeeData();
       
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeaveDetails({ ...leaveDetails, [name]: value });
    }

    const handleSubmit = async (e) => {
        try {
            console.log(leaveDetails);
             e.preventDefault();

             const token = localStorage.getItem('token');
            await EmployeeServices.applyLeave(leaveDetails, token);

            setLeaveDetails({
                employeeid: "",
                startDate: "",
                endDate: "",
                reason: "",
                leaveType: "",

            });
            navigate('/employee');
            


        } 
        catch (error) {
            console.error("Error submitting leave application:", error);
            setErrorMessage("An error occurred while submitting leave application");
            
        }
    }

    

    

      

    return (
        <div className="p-10 ml-40">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <h1>Leave Application</h1>
                
                <form >
                    <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                        <div>
                            <select
                                name="employeeid"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={leaveDetails.employeeId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Employee Id</option>
                                <option value={employeeId}>{employeeId}</option>
                                
                                
                            </select>
                        </div>

                        <div id="date-range-picker" className="flex items-center">
                            <input
                                name="startDate"
                                type="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={leaveDetails.startDate}
                                onChange={handleChange}
                                required
                            />
                            <span className="mx-4 text-gray-500">to</span>
                            <input
                                name="endDate"
                                type="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={leaveDetails.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <select
                            name="leaveType"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={leaveDetails.type}
                            onChange={handleChange}
                            required
                        >
                             <option selected>Select Type</option>
                            <option value="Paid">Paid Leave</option>
                            <option value="Sick">Sick Leave</option>
                            <option value="Casual">Casual Leave</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="reason"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Reason
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your reason here..."
                            value={leaveDetails.reason}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {successMessage && (
                    <div className="text-green-600 mt-2">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="text-red-600 mt-2">{errorMessage}</div>
                )}
            </div>
        </div>
    );
}

export default Leave;
