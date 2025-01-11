import axiosInstance from 'axios';


class EmployeeServices {
    static BASE_URL ='http://localhost:8080';   

    static async login(email, password) {
        try{
            const response = await axiosInstance.post(`${EmployeeServices.BASE_URL}/auth/login`, { email, password });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }


    static async register(employeeData, token) {
        try{
            const response = await axiosInstance.post(`${EmployeeServices.BASE_URL}/auth/register`, employeeData , 
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
     
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }

    static async getallEmployee(token) {
        try{
            const response = await axiosInstance.get(`${EmployeeServices.BASE_URL}/admin/get-all-users`, 
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }

    static async getallapplication(token) {
        try{
            const response = await axiosInstance.get(`${EmployeeServices.BASE_URL}/public/applications`, 
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }

    static async applyLeave(leaveDetails, token) {
        try{
            const response = await axiosInstance.post(`${EmployeeServices.BASE_URL}/public/applyleave`, leaveDetails , 
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
     
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }

    

    static async getYourProfile(token) {
        try{
            const response = await axiosInstance.get(`${EmployeeServices.BASE_URL}/adminuser/get-profile`, 
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }

    

    static async deleteEmployee(employeeid, token) {
        try{
            const response = await axiosInstance.delete(`${EmployeeServices.BASE_URL}/admin/delete/${employeeid}`, 
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }

    static async updateEmployee(employeeid, employeeData,token) {
        try{
            const response = await axiosInstance.put(`${EmployeeServices.BASE_URL}/admin/update/${employeeid}`, employeeData,
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }

    static async updateApplicationStatus(applicationId, status,token) {
        try{
            const response = await axiosInstance.put(`${EmployeeServices.BASE_URL}/public/update/${applicationId}`, status,
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }

    static async getuserapplication(employeeid,token) {
        try{
            const response = await axiosInstance.get(`${EmployeeServices.BASE_URL}/public/user-application/${employeeid}`, 
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }
  
    static async getEmployee(employeeid, token) {
        try{
            const response = await axiosInstance.get(`${EmployeeServices.BASE_URL}/public/get-user-info/${employeeid}`, 
            { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            return response.data;
        }
       
        catch(error){
            console.log(error);
        }
    }




    static logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
    }
    

    static isAuthenticated(){
        const token = localStorage.getItem('token') ;
        return !!token;
    }

    static isAdmin(){
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isUser(){
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    static adminOnly(){
        return  this.isAuthenticated() && this.isAdmin();
    }

    static getId(){
        const id = localStorage.getItem('id');
        return id;
    }
    
}

export default EmployeeServices;