import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { DocumentTextIcon, UsersIcon, AcademicCapIcon, XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { Link } from 'react-router-dom';

ChartJs.register(Tooltip, Title, ArcElement, Legend);

const AdminDashboard = () => {

    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState(0);
    const [employees, setEmployees] = useState(0);
    const [bugs, setBugs] = useState([]);

    const [chartDataProject, setChartDataProject] = useState({
        datasets: [{
            data: [],
            backgroundColor: ['#616661', '#1F2937', '#C8C8C8'],
        }],
        labels: ['In-Progress', 'Pending', 'Completed'],
    });
    const [chartDataBug, setChartDataBug] = useState({
        datasets: [{
            data: [],
            backgroundColor: ['#616661', '#1F2937', '#C8C8C8'],
        }],
        labels: ['Assigned', 'Open', 'Completed'],
    });

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/projectsData');
                const projectsData = response.data.projects;

                console.log(projectsData);

                setProjects(projectsData);

                const assignedProjectsCount = projectsData.filter((project) => project.status === 'In-progress').length;
                const unassignedProjectsCount = projectsData.filter((project) => project.status === 'Pending').length;
                const completedProjectsCount = projectsData.filter((project) => project.status === 'completed').length;

                setChartDataProject({
                    datasets: [{
                        data: [assignedProjectsCount, unassignedProjectsCount, completedProjectsCount],
                        backgroundColor: ['#616661', '#1F2937', '#C8C8C8'],
                    }],
                    labels: ['Assigned', 'Open', 'Completed'],
                });
            } catch (error) {
                console.error('Error fetching projects data:', error);
            }
        };
        const fetchClientsData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/getClients');
                const usersData = response.data.count;

                console.log('Users Data : ', usersData);

                setClients(usersData);
                console.log('Clients : ', clients);


            } catch (error) {
                console.error('Error fetching projects data:', error);
            }
        };
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/getEmployees');
                const usersData = response.data.count;

                console.log('Users Data : ', usersData);

                setEmployees(usersData);
                console.log('Employees : ', employees);


            } catch (error) {
                console.error('Error fetching projects data:', error);
            }
        };
        const fetchBugsData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/bugs');
                const Data = response.data.bugs;

                console.log('Bug Data : ', Data);

                setBugs(Data);
                console.log('Bugs : ', bugs);
                const assignedBugCount = Data.filter((bug) => bug.status === 'Assigned').length;
                const unassignedBugCount = Data.filter((bug) => bug.status === 'Open').length;
                const resolvedBugCount = Data.filter((bug) => bug.status === 'Resolved').length;

                setChartDataBug({
                    datasets: [{
                        data: [assignedBugCount, unassignedBugCount, resolvedBugCount],
                        backgroundColor: ['#616661', '#1F2937', '#C8C8C8'],
                    }],
                    labels: ['Assigned', 'Open', 'Completed'],
                });


            } catch (error) {
                console.error('Error fetching projects data:', error);
            }
        };

        fetchProjectsData();
        fetchClientsData();
        fetchEmployeeData();
        fetchBugsData();
    }, []);


    return (
        <div className="w-full flex flex-col  items-center mx-auto mt-6 p-6 bg-white shadow-md rounded-md ml-64">

            <div className="flex justify-evenly w-full">
                <Link to="/admin/clients">
                    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" >

                        <UsersIcon className="h-8 w-8 mb-2" />
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Clients</h3>
                            <p className="text-4xl font-bold text-center text-gray-800">{clients}</p>
                        </div>

                    </div>
                </Link>
                <Link to="/admin/projects">
                    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" >
                        <DocumentTextIcon className="h-8 w-8 mb-2 " />
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Projects</h3>
                            <p className="text-4xl font-bold text-center text-gray-800">{projects.length}</p>
                        </div>
                    </div>
                </Link>
                <Link to="/admin/employees">
                    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer flex items-center justify-center">
                        <AcademicCapIcon className="h-8 w-8 mb-2" />
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Employees</h3>
                            <p className="text-4xl font-bold text-center text-gray-800">{employees}</p>
                        </div>
                    </div>
                </Link>
                <Link to="/admin/bugs">
                    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer flex items-center justify-center">
                        <XCircleIcon className="h-8 w-8 mb-2 " />
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Bugs</h3>
                            <p className="text-4xl font-bold text-center text-gray-800">{bugs.length}</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Doughnut Chart */}
            <div className="flex justify-around  mt-10 w-full">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">Projects Status</h1>
                    <Doughnut data={chartDataProject} />
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl  mb-6 font-bold">Bugs Status</h1>
                    <Doughnut data={chartDataBug} />
                </div>
            </div>


        </div>
    );
};

export default AdminDashboard;
