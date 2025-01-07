import React from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeServices from '../service/EmloyeeServices';

const Login = () => {

    const[email,setEmail]=React.useState('');
    const[password,setPassword]=React.useState('');
    const[error,setError]=React.useState('');
    const navigate=useNavigate();   
    


    

    const handleEmail=(event)=>{
        setEmail(event.target.value);
    }

    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }


     async function LoginForm(event) {
            event.preventDefault();
             try{
                    const employeeData = await EmployeeServices.login(email,password);
                    console.log(employeeData);
                    if(employeeData.token){
                        localStorage.setItem('token',employeeData.token);
                        localStorage.setItem('role',employeeData.role);
                        localStorage.setItem('id',employeeData.id);
                        navigate('/dashboard');
                    }
                    else{
                        setError(employeeData.error);
                    }
             }catch(error){
                 console.log(error);
                 setError(error.message);
                 setTimeout(
                    ()=>{setError('')},5000
                 );
             }
            }
  return (
    <div className="items-center justify-center h-screen pt-10 my-8">
      <form className="max-w-sm mx-auto border-2">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                    <input type="email" value={email} onChange={handleEmail} id="email" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder=""required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
                    <input type="password" value={password} onChange={handlePassword} id="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" required />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button type="submit" onClick={LoginForm} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

    </div>
  )
}

export default Login
