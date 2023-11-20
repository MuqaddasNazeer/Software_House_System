import ContactForm from '../../../components/ContactForm';
import React, { useState } from 'react';



const ViewBugDetailsModal = ({ bug, onClose }) => {
    console.log('bug details : ', bug)
    const { pictureURL } = bug;

    const isImage = /\.(jpeg|jpg|gif|png)$/.test(pictureURL);
    const isVideo = /\.(mp4|webm|ogg)$/.test(pictureURL);

    const [contact, setContact] = useState();
    const [showContactModal, setShowContactModal] = useState(false);

    const handleContactClick = (email) => {
        setContact(email);
        setShowContactModal(true);
    };

    const handleCloseContactModal = () => {
        setShowContactModal(false);
    };
    return (
        <div className="bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Bug Details</h2>

            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Title:</span> {bug.title}
                </p>
            </div>

            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Posted On:</span> {bug.createdAt}
                </p>
            </div>

            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Status:</span> {bug.status}
                </p>
            </div>
            {isImage && (
                <div className="mb-4">
                    <img
                        src={pictureURL}
                        alt="Bug Screenshot"
                        className="w-full h-auto rounded-md shadow-md mb-4"
                    />
                </div>
            )}

            {isVideo && (
                <div className="mb-4">
                    <video
                        controls
                        className="w-full h-auto rounded-md shadow-md mb-4"
                    >
                        <source src={pictureURL} type="video/mp4" />
                        {/* Add more source elements for other video formats */}
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Description:</span> {bug.description}
                </p>
            </div>

            {/* Picture of bug */}

            <div className="flex justify-end">

                <button
                    onClick={() => handleContactClick(bug.postedBy.email)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                    Contact Creator
                </button>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                    Close
                </button>
            </div>

            {showContactModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Modal content */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                        >
                            {/* Content of the Contact Team Modal */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                            >
                                <ContactForm onClose={handleCloseContactModal} contactEmail={contact} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBugDetailsModal;
