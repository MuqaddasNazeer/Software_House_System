import axios from 'axios';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const PostBugModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);


    const handleFormSubmit = async (e) => {

        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('photo', photo);
         
            formData.append('userEmail', localStorage.getItem('userEmail'));
            const response = await axios.post('http://localhost:5555/api/postBug', formData);
            console.log(response.data);
            alert(response.data.message);
        }
        catch (error) {

            if (error.response) {

                console.error('Server responded with an error:', error.response.data);
                alert(`Server error: ${error.response.data.message}`);
            } else if (error.request) {

                console.error('No response received from server:', error.request);
                alert('No response received from the server');
            } else {

                console.error('Error setting up the request:', error.message);
                alert(`Error setting up the request: ${error.message}`);
            }
        }

    };
    return (
        <div className="mx-auto mt-6 p-6 bg-white shadow-md rounded-md max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">New Bug</h2>
            <form onSubmit={handleFormSubmit}>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                        Description
                    </label>
                    <textarea
                        id=" description"
                        name=" description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    ></textarea>
                </div>

                <div className="mb-4 flex justify-between">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-600">
                        Picture
                    </label>
                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}  
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                    >
                        Post Bug
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostBugModal;
