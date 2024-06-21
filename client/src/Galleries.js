import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import { FiX, FiEdit2, FiDownload } from 'react-icons/fi';
import { saveAs } from 'file-saver';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Galleries = () => {
    const [galleries, setGalleries] = useState([]);
    const [selectedGallery, setSelectedGallery] = useState(null);

    useEffect(() => {
        fetchGalleries();
    }, []);

    const fetchGalleries = async () => {
        const response = await Axios.get(process.env.REACT_APP_HOST_LINK + "/api/internal/gallery");
        setGalleries(response.data);
    };

    const fetchPaintings = async (galleryId) => {
        const response = await Axios.get(process.env.REACT_APP_HOST_LINK + `/api/internal/gallery/${galleryId}`);
        setSelectedGallery(response.data);
    };

    const deletePainting = async (id) => {
        try {
            await Axios.delete(process.env.REACT_APP_HOST_LINK + `/api/internal/${id}`);
            fetchPaintings(selectedGallery._id);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updatePainting = async (id, newTitle, newArtist, newYear) => {
        try {
            await Axios.patch(process.env.REACT_APP_HOST_LINK + `/api/internal/${id}`, {
                title: newTitle,
                artist: newArtist,
                year: parseInt(newYear),
            });
            fetchPaintings(selectedGallery._id);
        } catch (error) {
            console.error("Error:", error);
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
            <h2 className="text-2xl mb-4">Galleries</h2>
            <div className="mb-6">
                {galleries.map(gallery => (
                    <button
                        key={gallery._id}
                        className="bg-blue-500 text-white p-2 rounded m-2"
                        onClick={() => fetchPaintings(gallery._id)}
                    >
                        {gallery.name}
                    </button>
                ))}
            </div>
            {selectedGallery && (
                <div>
                    <h3 className="text-xl mb-4">{selectedGallery.name}</h3>
                    <Slider {...settings}>
                        {selectedGallery.paintings.map(painting => (
                            <div key={painting._id} className="text-center">
                                <img src={painting.URL} alt="Painting" className="w-full h-auto" />
                                <div className="mt-2">
                                    <h2 className="text-lg font-semibold">{painting.artist}</h2>
                                    <p>{painting.title} • {painting.year}</p>
                                </div>
                                <div className="mt-2 flex justify-center space-x-2">
                                    <button
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                        onClick={() => deletePainting(painting._id)}
                                    >
                                        <FiX />
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                                        onClick={() => {
                                            const newArtist = prompt("Input text to change the artist.");
                                            const newTitle = prompt("Input text to change the title.");
                                            const newYear = prompt("Input a number to change the year.");
                                            if (newArtist || newTitle || newYear) {
                                                updatePainting(painting._id, newTitle, newArtist, newYear);
                                            }
                                        }}
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                                        onClick={() => saveAs(painting.URL, `${painting.artist} - ${painting.title} (${painting.year})`)}
                                    >
                                        <FiDownload />
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

export default Galleries;
