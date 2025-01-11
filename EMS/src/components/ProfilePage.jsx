import React, { useEffect, useState } from 'react'
import EmployeeServices from '../service/EmloyeeServices';

function ProfilePage() {
  const [employee, setEmployee] = useState([]);
    useEffect(() => {
        
        fetchUsers();
      }, []);


      const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const employeeid = localStorage.getItem('id');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
            const response = await EmployeeServices.getEmployee(employeeid,token);
            console.log('API Response:', response); // Debugging line
            if (response && response.employee) {
                setEmployee(response.employee);
            } else {
                console.error('Invalid response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


  return (
    <>
      <div className=" p-1 sm:ml-64">
        <div className='max-w-full p-6 rounded-lg p-4 border-2  border-dashed rounded-lg mt-14 '>
          <div className="px-4 sm:px-0">
            <h3 className="mt-1 max-w-2xl text-sm/6 font-semibold text-gray-900">Employee Information</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Employee ID</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{employee.id}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{employee.firstName} {employee.lastName}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Position</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{employee.email}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Department</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Software Develpoment</dd>
              </div>
            </dl>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProfilePage
