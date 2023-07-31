import './App.css';
import React, {useEffect, useState} from "react";
import Axios from "axios";
import "./styles.css";
import 'react-edit-text/dist/index.css';
import {FiDelete, FiEdit, FiPlus, FiExternalLink, FiDownload} from 'react-icons/fi';
import { saveAs } from 'file-saver';

function App() {
    const [listOfPaintings, setListOfPaintings] = useState([]);
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [URL, setURL] = useState(" ");
    const [year, setYear] = useState(0);
    const [color, setColor] = useState("#1e1e1e");
    const [searchQuery, setQuery] = useState("");
    const [currentSearchResult, setSearchResult] = useState([]);



    async function fetchData() {
        const response = await Axios.get(process.env.REACT_APP_HOST_LINK + "/api/internal");
        setListOfPaintings(response.data)
    }

    useEffect(() => {
        fetchData();
    }, []);


    const createPainting = () => {
        console.log(title, artist, URL, year, color)
        if (title === "") {
            alert("Please enter a title.")
        } else if (artist === "") {
            alert("Please enter an artist.")
        } else if (year <= 0) {
            alert("Please enter a valid year.")
            return undefined;
        }
        Axios.post(process.env.REACT_APP_HOST_LINK + "/api/internal", {
            title, artist, URL, year, color
        }).then(() => {
            fetchData();
        });
    };


    const deletePainting = (id) => {
        Axios.delete(process.env.REACT_APP_HOST_LINK + `/api/internal/${id}`)
            .then((id) => {
                console.log(id);
                fetchData();
            });
    };

    const clearPaintings = () => {
        Axios.delete(process.env.REACT_APP_HOST_LINK + "/api/internal/")
            .then((response) => {
                console.log(response);
                fetchData();
            });
    };

    const updatePainting = (id, newTitle, newArtist, newURL, newYear, newColor) => {
        newTitle = newTitle || undefined;
        newArtist = newArtist || undefined;
        newURL = newURL || undefined;
        Axios.patch(process.env.REACT_APP_HOST_LINK + `/api/internal/${id}`, {
            id: id, title: newTitle, artist: newArtist, URL: newURL, year: parseInt(newYear), color: newColor
        })
            .then((response) => {
                console.log(response);
                fetchData();
            });
    };

    const searchPainting = (searchQuery) => {
        console.log(searchQuery)
        Axios.get(process.env.REACT_APP_HOST_LINK + `/api/external/${searchQuery}`)
            .then((response) => {
                if (response.data.length === 0) {
                    alert("No results found.")
                }
                setSearchResult(response.data);
            });
    };

    /*  const parseResult = (searchResult) => {

              });
      }; */

    const newShade = (hexColor, magnitude) => {   // StackOverflow
        hexColor = hexColor.replace(`#`, ``);
        if (hexColor.length === 6) {
            const decimalColor = parseInt(hexColor, 16);
            let r = (decimalColor >> 16) + magnitude;
            r > 255 && (r = 255);
            r < 0 && (r = 0);
            let g = (decimalColor & 0x0000ff) + magnitude;
            g > 255 && (g = 255);
            g < 0 && (g = 0);
            let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
            b > 255 && (b = 255);
            b < 0 && (b = 0);
            return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
        } else {
            return hexColor;
        }
    };


    return (
        <div className="App">
            <div className="paintingsDisplay">
                {listOfPaintings.map((painting) => {
                    return (<div className="cssPaintings">
                        <h1 className="cssTitle"
                            style={{backgroundColor: painting.color}}> {painting.title}</h1>
                        <h1 className="cssArtist"
                            style={{backgroundColor: newShade(painting.color, +10)}}>{painting.artist}</h1>
                        <h1 className="cssYear"
                            style={{backgroundColor: newShade(painting.color, +20)}}>{painting.year}</h1>
                        <button className="cssButton"
                                onClick={() => {
                                    window.open(painting.URL)
                                }}><FiExternalLink/>
                        </button>
                        <button className="cssButton"
                                onClick={() => {
                                    saveAs(painting.URL, painting.title + "-" + painting.artist);
                                }}><FiDownload/>
                        </button>
                        <button className="cssButton"
                                onClick={() => {
                                    const newTitle = prompt('Input text to change the title.');
                                    const newArtist = prompt('Input text to change the artist.');
                                    const newYear = prompt('Input a number to change the year.');
                                    const newURL = prompt('Input text to change the URL.');
                                    if (newArtist || newTitle || newURL || newYear) {
                                        updatePainting(painting._id, newTitle, newArtist, newURL, newYear)
                                    } else {
                                        alert("Please enter something.")
                                    }
                                }}><FiEdit/>
                        </button>
                        <button className="cssButton"
                                onClick={() => {
                                    if (window.confirm('Delete?')) {
                                        deletePainting(painting._id)
                                    }
                                }}><FiDelete/>
                        </button>
                    </div>)

                })}

            </div>
            <div>
                <input
                    style={{width: "200px", float: "left"}}
                    type="text"
                    placeholder="Title"
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                <input
                    style={{width: "135px", float: "left"}}
                    type="text"
                    placeholder="Artist"
                    onChange={(event) => {
                        setArtist(event.target.value);
                    }}
                />
                <input
                    style={{width: "65px", float: "left"}}
                    type="number"
                    placeholder="Year"
                    onChange={(event) => {
                        setYear(event.target.value);
                    }}
                />
                <input
                    style={{width: "100px", float: "left"}}
                    type="text"
                    placeholder="URL"
                    onChange={(event) => {
                        setURL(event.target.value);
                    }}
                />
                <button style={{float: "left"}} onClick={createPainting}> Log Painting</button>


                <button style={{float: "right"}} onClick={() => {
                    setSearchResult([])
                    }}> Clear Searches
                </button>

                <button style={{float: "right"}} onClick={() => {
                    if (searchQuery === "") {
                        alert("Please enter a search.")
                    } else {
                        searchPainting(searchQuery)
                    }}
                }> Search Painting
                </button>

                <input
                    style={{width: "200px", float: "right"}}
                    type="text"
                    placeholder="Search Query"
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                />


                <button style={{float: "left"}} onClick={() => {
                    if (window.confirm('Clear?')) {
                        clearPaintings();
                    }
                }}> Clear Paintings
                </button>
                <input
                    style={{width: "30px", height: "22px", float: "left"}}
                    type="color"
                    placeholder="Hex Color"
                    onChange={(event) => {
                        setColor(event.target.value);
                    }}
                />

                <h1> &nbsp;&nbsp;&nbsp;&nbsp;  </h1>

                {currentSearchResult.map((objectPainting) => {
                    return (<div className="searchPaintings">
                        <h1 className="searchTitle"
                            style={{backgroundColor: color}}> {objectPainting.title}</h1>
                        <h1 className="searchArtist"
                            style={{backgroundColor: newShade(color, +10)}}>{objectPainting.artistName}</h1>
                        <h1 className="searchYear"
                            style={{backgroundColor: newShade(color, +20)}}>{objectPainting.completitionYear}</h1>
                        <button className="cssButton"
                                onClick={() => {
                                    const title = objectPainting.title;
                                    const artist = objectPainting.artistName;
                                    const year = objectPainting.completitionYear;
                                    const URL = objectPainting.image;
                                    Axios.post(process.env.REACT_APP_HOST_LINK + "/api/internal", {
                                        title, artist, URL, year, color
                                    }).then(() => {
                                        fetchData();
                                    });
                                }}><FiPlus/>
                        </button>

                        <button className="cssButton"
                                onClick={() => {
                                    const url = objectPainting.image
                                    window.open(url)
                                }}><FiExternalLink/>
                        </button>

                    </div>)
                })}

            </div>
        </div>

    )
}

export default App;