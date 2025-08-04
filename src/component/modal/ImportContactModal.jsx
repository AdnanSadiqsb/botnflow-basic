import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getToken from '../../utils/GetToken';
import useAxiosForm from '../../utils/useAxiosForm'
import { ContentContext } from '../../context/ContextProvider';
import * as XLSX from 'xlsx';

const ImportContactModal = ({ onClose }) => {
    const [excelFile, setExcelFile] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(ContentContext);
    const token = getToken();

    const channels = userInfo?.companyId?.companyIntegratedChannels || [];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel') {
                setExcelFile(file);
            } else {
                toast.error('Please upload a valid Excel file (.xlsx or .xls)');
            }
        }
    };

    const handleChannelChange = (e) => {
        setSelectedChannel(e.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedChannel) {
            toast.error('Please select a channel');
            return;
        }

        if (!excelFile) {
            toast.error('Please select an Excel file');
            return;
        }

        setIsLoading(true);

        try {
            const data = await excelFile.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });

            for (let i = 0; i < jsonData.length; i++) {
                const row = jsonData[i];
                const channelValue = String(row.channel || '').trim().toLowerCase();
                if (channelValue !== selectedChannel.toLowerCase()) {
                    toast.error(`Channel mismatch found at row ${i + 2}. Expected "${selectedChannel}", got "${row.channel}"`);
                    setIsLoading(false);
                    return;
                }
            }

            const formData = new FormData();
            formData.append('excelFile', excelFile);
            // formData.append('channel', selectedChannel);

            // Find the selected channel object to get channelId
            const channelObj = channels.find(ch => ch.type === selectedChannel);
            if (channelObj) {
                formData.append('channelId', channelObj.channelId || null);
            }

            // Using useAxios hook to make the request
            const [responseData, fetchError] = await useAxiosForm('POST', 'contacts/import', token, formData);

            if (responseData) {
                toast.success('Contacts imported successfully!');
                onClose();
            } else {
                toast.error(fetchError?.message || 'Failed to import contacts');
            }
        } catch (error) {
            toast.error('An error occurred while importing contacts');
            console.error('Import error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-70" onClick={onClose}></div>

            <div
                className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Import Contacts
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Channel
                        </label>
                        <select
                            value={selectedChannel}
                            onChange={handleChannelChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Channel</option>
                            {channels
                                .filter((ch) => ch.type !== 'webchat')
                                .map((ch) => (
                                    <option key={ch._id} value={ch.type}>
                                        {ch.type.charAt(0).toUpperCase() + ch.type.slice(1)}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Excel File
                        </label>
                        <div className="flex items-center">
                            <label className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                                <span className="text-sm font-medium text-gray-700">
                                    {excelFile ? excelFile.name : 'Choose file...'}
                                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Supported formats: .xlsx, .xls
                        </p>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`px-4 py-2 text-white rounded hover:bg-blue-600 ${isLoading ? 'bg-blue-400' : 'bg-blue-500'
                                }`}
                        >
                            {isLoading ? 'Importing...' : 'Import'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportContactModal;