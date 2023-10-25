// MainRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import InnerContent from "./pages/InnerContent";
import ProtectedRoutes from "./AppRoutes/ProtectedRoutes";
import PublicRoutes from "./AppRoutes/PublicRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageClients from "./pages/admin/Manage Clients/ManageClients";
import ManageProjects from "./pages/admin/Manage Projects/ManageProjects";
import ClientDashboard from "./pages/client/ClientDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";
import ClientProjectPage from "./pages/client/Project/ClientProject";
import ContactForm from "./components/ContactForm";
import ManageEmployees from "./pages/admin/Manage Employees/ManageEmployees";
import EmployeeProject from "./pages/employee/Project/EmployeeProject";
import BugReporting from "./pages/employee/Bugs/BugRepoerting";
import ManageBugs from "./pages/admin/Manage Bugs/ManageBugs";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<InnerContent/>}>
                
                <Route
                    path="admin"
                    element={<ProtectedRoutes />}
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="clients" element={<ManageClients />} />
                    <Route path="projects" element={<ManageProjects />} />
                    <Route path="employees" element={<ManageEmployees />} />
                    <Route path="bugs" element={<ManageBugs />} />
                </Route>
                <Route
                    path="client"
                    element={<ProtectedRoutes />}
                >
                    <Route path="dashboard" element={<ClientDashboard />} />
                    <Route path="projects" element={<ClientProjectPage/>} />
                    <Route path="contact" element={<ContactForm contactEmail='a@gmail.com' path='/client/contact'/>} />
                </Route>
                <Route
                    path="employee"
                    element={<ProtectedRoutes />}
                >
                    <Route path="dashboard" element={<EmployeeDashboard />} />
                    <Route path="projects" element={<EmployeeProject />} />
                    <Route path="contact" element={<ContactForm contactEmail='a@gmail.com' path='/employee/contact'/>} />
                    <Route path="bugs" element={<BugReporting/>}/>
                </Route>
                <Route path="login" element={<PublicRoutes />} >
                    <Route index element={<SignIn />} />
                </Route>
                <Route path="register" element={<PublicRoutes />} >
                    <Route index element={<SignUp />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default MainRoutes;
