import React from 'react'

function DeleteModal({ onClose, onDelete }) {
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-70" onClick={(onClose)}></div>

                <div
                    className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Confirm Deletion
                    </h2>
                    <p className="mb-6 text-gray-600">
                        Are you sure you want to delete this?
                    </p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            OK
                        </button>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
