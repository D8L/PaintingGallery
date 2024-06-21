import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import { FiPlus } from 'react-icons/fi';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [selectedGallery, setSelectedGallery] = useState("");

    useEffect(() => {
        fetchGalleries();
    }, []);

    const searchPainting = async () => {
        try {
            const response = await Axios.get(process.env.REACT_APP_HOST_LINK + `/api/external/${searchQuery}`);
            setSearchResults(response.data.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchGalleries = async () => {
        const response = await Axios.get(process.env.REACT_APP_HOST_LINK + "/api/internal/gallery");
        setGalleries(response.data);
    };

    const addPaintingToGallery = async (painting) => {
        try {
            await Axios.post(process.env.REACT_APP_HOST_LINK + "/api/internal", {
                title: painting.title,
                artist: painting.artistName,
                URL: painting.image,
                year: painting.completitionYear,
                gallery: selectedGallery
            });
            fetchGalleries();
        } catch (error) {
            console.error("Error adding painting to gallery:", error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        nextArrow: <div className="slick-next">Next</div>,
        prevArrow: <div className="slick-prev">Previous</div>,
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Search Paintings</h2>
            <div className="flex mb-6">
                <input
                    className="p-2 border rounded w-full mr-2"
                    type="text"
                    placeholder="Search Query"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={searchPainting}
                >
                    Search
                </button>
            </div>
            {searchResults.length > 0 && (
                <div>
                    <Slider {...settings}>
                        {searchResults.map((painting) => (
                            <div key={painting.image} className="text-center">
                                <img src={painting.image} alt={painting.title} className="w-full h-auto object-contain" />
                                <div className="mt-2">
                                    <h2 className="text-lg font-semibold">{painting.artistName}</h2>
                                    <p>{painting.title} • {painting.completitionYear}</p>
                                </div>
                                <div className="mt-2 flex justify-center space-x-2">
                                    <select
                                        className="border p-2 rounded"
                                        onChange={(e) => setSelectedGallery(e.target.value)}
                                    >
                                        <option value="">Add to Gallery</option>
                                        {galleries.map((gallery) => (
                                            <option key={gallery._id} value={gallery._id}>{gallery.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                                        onClick={() => addPaintingToGallery(painting)}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
