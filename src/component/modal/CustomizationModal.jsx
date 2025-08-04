import React, { useContext, useState } from 'react';
import { Settings } from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';
import { lightenColor } from '../../assets/Colors';

const CustomizationModal = ({ onClose }) => {
    const { logoImage, setLogoImage, setCustomizationModal } = useContext(ContentContext);
    const { themeColor, setThemeColor, setSecondaryThemeColor } = useContext(ContentContext);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogoImage(imageUrl);
        }
    };

    // const handleColorChange = (e) => {
    //     const selectedColor = e.target.value;
    //     setThemeColor(selectedColor);
    //     setSecondaryThemeColor(lightenColor(themeColor))
    //     console.log("Selected Color:", selectedColor);
    // };

    const handleColorChange = (e) => {
        const selectedColor = e.target.value;

        // Convert hex to RGB
        const hexToRgb = (hex) => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return { r, g, b };
        };

        const { r, g, b } = hexToRgb(selectedColor);

        // Calculate brightness using a common formula
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Reject colors that are too light (brightness > 240)
        if (brightness > 180) {
            // alert("Please choose a darker color. White or very light colors are not allowed.");
            return;
        }

        setThemeColor(selectedColor);
        setSecondaryThemeColor(lightenColor(selectedColor));
        console.log("Selected Color:", selectedColor);
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black opacity-70"
                onClick={() => { setCustomizationModal(false) }}
            ></div>

            <div
                className="bg-white rounded-lg  p-6 relative z-50 mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center items-center pb-3 mb-2">
                    <Settings fontSize="medium" />
                    <h2 className="text-xl font-semibold ml-2">Customization</h2>
                </div>

                <div className="mb-4">
                    <label className="block font-medium text-sm text-center mb-1">Upload Logo:</label>
                    <input type="file" onChange={handleLogoUpload} className="mb-2 text-sm font-normal border text-gray-600" />
                    {logoImage && (
                        <img
                            src={logoImage}
                            alt="Uploaded"
                            className="w-22 h-14 mt-2 mx-auto rounded border"
                        />
                    )}
                </div>

                <div className="mb-4 text-center">
                    <label className="block font-normal text-sm mb-1">Pick Portal Theme:</label>
                    <input
                        type="color"
                        value={themeColor}
                        onChange={handleColorChange}
                        className="w-[70%] h-36 p-1 border rounded cursor-pointer"
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setCustomizationModal(false)}
                        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomizationModal;
