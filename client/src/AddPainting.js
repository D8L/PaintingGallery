import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const AddPainting = () => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [URL, setURL] = useState("");
    const [year, setYear] = useState(0);
    const [selectedGallery, setSelectedGallery] = useState("");
    const [galleries, setGalleries] = useState([]);

    const fetchGalleries = async () => {
        const response = await Axios.get(process.env.REACT_APP_HOST_LINK + "/api/internal/gallery");
        setGalleries(response.data);
    };

    useEffect(() => {
        fetchGalleries();
    }, []);

    const createPainting = async () => {
        try {
            if (title === "" || artist === "" || year <= 0) {
                alert("Please enter valid details.");
                return;
            }
            await Axios.post(process.env.REACT_APP_HOST_LINK + "/api/internal", {
                title,
                artist,
                URL,
                year,
                gallery: selectedGallery
            });
            fetchGalleries();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Add Custom Painting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                    className="p-2 border rounded"
                    type="text"
                    placeholder="Artist"
                    onChange={(e) => setArtist(e.target.value)}
                />
                <input
                    className="p-2 border rounded"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="p-2 border rounded"
                    type="number"
                    placeholder="Year"
                    onChange={(e) => setYear(e.target.value)}
                />
                <input
                    className="p-2 border rounded"
                    type="text"
                    placeholder="URL"
                    onChange={(e) => setURL(e.target.value)}
                />
            </div>
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <select
                    className="border p-2 rounded w-full md:w-auto"
                    onChange={(e) => setSelectedGallery(e.target.value)}
                >
                    <option value="">Select Gallery</option>
                    {galleries.map((gallery) => (
                        <option key={gallery._id} value={gallery._id}>{gallery.name}</option>
                    ))}
                </select>
                <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full md:w-auto"
                    onClick={createPainting}
                >
                    Log Painting
                </button>
            </div>
        </div>
    );
};

export default AddPainting;
