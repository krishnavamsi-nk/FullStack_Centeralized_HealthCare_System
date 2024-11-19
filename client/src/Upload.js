import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState("");
    const [showSaveButton, setShowSaveButton] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImagePath(URL.createObjectURL(e.target.files[0])); // Preview image locally
        setShowSaveButton(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/patients/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImagePath(`${response.data.path}`);
            setShowSaveButton(false); // Hide the save button after successful upload
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveClick = async () => {
        // Perform any additional action you want when the save button is clicked
        // For example, you can send a post request here if needed
        console.log("Save button clicked. Sending post request...");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
                <button type="submit">Upload</button>
            </form>
            {showSaveButton && <button onClick={handleSaveClick}>Save</button>}
            <img src={imagePath} alt="User" />
        </>
    );
}

export default Upload;
