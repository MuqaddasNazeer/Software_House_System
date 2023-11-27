import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircleIcon, CodeIcon, XCircleIcon } from '@heroicons/react/solid';

import PostBugModal from '../../employee/Bugs/PostBugModal';
import ViewBugDetailsModal from '../../employee/Bugs/ViewBugDetailsModal';
import AssignBugModal from './AssignBugModal';
import ContactForm from '../../../components/ContactForm';


const ManageBugs = () => {
    const [bugs, setBugs] = useState([]);
    const [bugsData, setBugsData] = useState([]);

    const [selectedBug, setSelectedBug] = useState(null);
    const [searchData, setSearchData] = useState('');
    const [filterType, setFilterType] = useState('Open'); // 'assigned', 'unassigned'

    // Modals related statess
    const [showPostBugModal, setShowPostBugModal] = useState(false);
    const [showViewBugModal, setShowViewBugModal] = useState(false);
    const [showAssignBugModal, setShowAssignBugModal] = useState(false);
    const [showContactEmployeeModal, setShowContactEmployeeModal] = useState(false);
    const [contact, setContact] = useState();


    // Post Bug modal
    const handlePostBug = () => {
        setShowPostBugModal(true);
    };
    const handleClosePostBugModal = () => {
        setShowPostBugModal(false);
    };
    //View Bug detail modal
    const handleViewBug = (bug_Id) => {
        console.log(bug_Id);
        axios
            .get(`http://localhost:5555/api/bugsDetails/${bug_Id}`)
            .then((response) => {
                console.log(response.data.bug);
                setSelectedBug(response.data.bug);

                setShowViewBugModal(true);

            })
            .catch((error) => {
                console.log(error);
                alert('Error fetching bug details');
            });
    }
    const handleCloseViewBugModal = () => {
        setShowViewBugModal(false);
    }
    const handleAssignBug = (bug_Id) => {
        console.log(bug_Id);
        axios
            .get(`http://localhost:5555/api/bugsDetails/${bug_Id}`)
            .then((response) => {
                console.log(response.data.bug);
                setSelectedBug(response.data.bug);

                setShowAssignBugModal(true);

            })
            .catch((error) => {
                console.log(error);
                alert('Error fetching bug details');
            });
    }
    const handleCloseAssignBugModal = () => {
        setShowAssignBugModal(false);
    }

    const handleContactEmployee = (email) => {
        console.log(email);
        setContact(email);
        setShowContactEmployeeModal(true);
    }
    const handleCloseContactEmployeeModal = () => {
        setShowContactEmployeeModal(false);
    }


    useEffect(() => {
        console.log('USe effect hit')
        const fetchAllBugs = async () => {
            try {
                const url = 'http://localhost:5555/api/bugs';
                const response = await axios.get(url);
                console.log('Bugs All:', response.data.bugs);
                setBugsData(response.data.bugs);
                console.log('Filter Type:', filterType);
                // Apply filtering based on filterType
                const filteredBugs = filterBugs(response.data.bugs, filterType);

                setBugs(filteredBugs);
                console.log('Filtered Bugs:', filteredBugs);
            } catch (error) {
                console.error('Error fetching all Bugs:', error);
            }
        };

        fetchAllBugs()
    }, [filterType]);  // Include filterType in the dependency array

    const filterBugs = (bugs, filterType) => {
        if (filterType === 'Assigned') {
            return bugs.filter(bug => bug.status === 'Assigned');
        } else if (filterType === 'Open') {
            return bugs.filter(bug => bug.status === 'Open');
        } else if (filterType === 'Resolved') {
            return bugs.filter(bug => bug.status === 'Resolved');
        }
    }


    // Function to get cards number
    const assignedBugsCount = bugsData.filter((bug) => bug.status === 'Assigned').length;
    const postedBugsCount = bugsData.filter((project) => project.status === 'Open').length;
    const completedBugsCount = bugsData.filter((project) => project.status === 'Resolved').length;


    return (
        <div className="w-full mx-auto mt-6 p-6 bg-white shadow-md rounded-md ml-64">
            <h2 className="text-3xl font-bold mb-4 text-center">Manage Bugs</h2>
            <div className='flex justify-end'>
                <button
                    onClick={() => handlePostBug()}
                    className="mb-4 text-lg bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Report Bug
                </button>
            </div>
            {/* ['Open', 'Assigned', 'Resolved'] */}
            {/* Cards displaying project counts */}
            <div className="flex justify-evenly mb-10 ">
                <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" onClick={() => setFilterType('Assigned')}>
                    <CodeIcon className="h-8 w-8 mb-7 text-black-500 mr-4" />
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">Assigned Bugs</h3>
                        <p className="text-4xl font-bold text-center text-gray-800">{assignedBugsCount}</p>
                    </div>
                </div>
                <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" onClick={() => setFilterType('Open')}>
                    <XCircleIcon className="h-8 w-8 mb-7 text-black-500 mr-4" />
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">Open Bugs</h3>
                        <p className="text-4xl font-bold text-center text-gray-800">{postedBugsCount}</p>
                    </div>
                </div>

                <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" onClick={() => setFilterType('Resolved')}>
                    <CheckCircleIcon className="h-8 w-8 mb-7 text-black-500 mr-4" />
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">Resolved Bugs</h3>
                        <p className="text-4xl font-bold text-center text-gray-800">{completedBugsCount}</p>
                    </div>
                </div>
            </div>

            {bugs.length === 0 ? (
                <p className='text-center'>No Bugs found for the selected filter.</p>
            ) : (
                <>
                    <div className="mb-4 flex items-center justify-between w-full">
                        <div>
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="p-2 border rounded-md"
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="mr-2">Filter:</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="Assigned">Assigned Bugs </option>
                                <option value="Open">Open Bugs</option>
                                <option value="Resolved">Resolved Bugs</option>
                            </select>
                        </div>
                    </div>
                    {/* In-progress Bugs */}
                    {filterType === 'Assigned' && (<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className=" w-full text-lg text-left bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Assigned To
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Posted At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bugs
                                    .filter((bug) =>
                                        searchData.toLowerCase() === '' ||
                                        bug.title.toLowerCase().includes(searchData.toLowerCase())
                                    )
                                    .map((bug) => (
                                        <tr
                                            key={bug._id}
                                            className="bg-white border-b hover:bg-gray-50 dark:border-gray-400 dark:hover:bg-gray-300"
                                        >
                                            <td className="px-6 py-4">{bug.title}</td>
                                            <td className="px-6 py-4">{bug.status}</td>
                                            <td className="px-6 py-4">{bug.assignedTo?.username}</td>
                                            <td className="px-6 py-4 w-[300px]">{bug.description}</td>
                                            <td className="px-6 py-4">{bug.createdAt}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleViewBug(bug._id)}
                                                    className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                                >
                                                    View Detail
                                                </button>
                                                <button
                                                    onClick={() => handleContactEmployee(bug.assignedTo.email)}
                                                    className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                                >
                                                    Contact Employee
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>)}
                    {/* Remainnig Bugs */}
                    {filterType === 'Open' && (<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <>

                            <table className=" w-full text-lg text-left bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Posted By
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Posted At
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bugs
                                        .filter((bug) =>
                                            searchData.toLowerCase() === '' ||
                                            bug.title.toLowerCase().includes(searchData.toLowerCase())
                                        )
                                        .map((bug) => (
                                            <tr
                                                key={bug._id}
                                                className="bg-white border-b hover:bg-gray-50 dark:border-gray-400 dark:hover:bg-gray-300"
                                            >
                                                <td className="px-6 py-4">{bug.title}</td>
                                                <td className="px-6 py-4">{bug.status}</td>
                                                <td className="px-6 py-4">{bug.description}</td>
                                                <td className="px-6 py-4">{bug.postedBy?.username}</td>
                                                <td className="px-6 py-4">{bug.createdAt}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleViewBug(bug._id)}
                                                        className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                                    >
                                                        View Detail
                                                    </button>
                                                    <button
                                                        onClick={() => handleAssignBug(bug._id)}
                                                        className="mr-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                                    >
                                                        Assign Bug
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </>
                    </div>)}
                    {/* Resolved Bugs */}
                    {filterType === 'Resolved' && (<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className=" w-full text-lg text-left bg-white border-b hover:bg-gray-50 dark:border-gray-400 dark:hover:bg-gray-300">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Posted At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bugs
                                    .filter((bug) =>
                                        searchData.toLowerCase() === '' ||
                                        bug.title.toLowerCase().includes(searchData.toLowerCase())
                                    )
                                    .map((bug) => (
                                        <tr
                                            key={bug._id}
                                            className="bg-white border-b hover:bg-gray-50 dark:border-gray-400 dark:hover:bg-gray-300"
                                        >
                                            <td className="px-6 py-4">{bug.title}</td>
                                            <td className="px-6 py-4">{bug.status}</td>
                                            <td className="px-6 py-4">{bug.description}</td>
                                            <td className="px-6 py-4">{bug.createdAt}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleViewBug(bug._id)}
                                                    className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                                >
                                                    View Detail
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>)}

                </>
            )}

            {/* Modals */}
            {/* Post Bug Modal */}
            {showPostBugModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center h-fit pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                        >
                            <PostBugModal onClose={() => handleClosePostBugModal()} />
                        </div>
                    </div>
                </div>
            )}

            {/* View Bug details */}
            {showViewBugModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                        >
                            <ViewBugDetailsModal bug={selectedBug} onClose={() => handleCloseViewBugModal()} />
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Bug Modal */}
            {showAssignBugModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                        >
                            <AssignBugModal bug={selectedBug} onClose={() => handleCloseAssignBugModal()} />
                        </div>
                    </div>
                </div>
            )}

            {showContactEmployeeModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                        >
                            <ContactForm onClose={() => handleCloseContactEmployeeModal()} contactEmail={contact} />
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ManageBugs;
