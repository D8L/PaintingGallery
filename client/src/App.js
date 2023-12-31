import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./styles.css";
import "react-edit-text/dist/index.css";
import { FiX, FiEdit2, FiPlus, FiDownload } from "react-icons/fi";
import { saveAs } from "file-saver";

function App() {
  // State variables
  const [listOfPaintings, setListOfPaintings] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [URL, setURL] = useState(" ");
  const [year, setYear] = useState(0);
  const [searchQuery, setQuery] = useState("");
  const [currentSearchResult, setSearchResult] = useState([]);

  // Fetch data function
  async function fetchData() {
    const response = await Axios.get(
      process.env.REACT_APP_HOST_LINK + "/api/internal",
    );
    setListOfPaintings(response.data);
  }

  useEffect(() => {
    void fetchData();
  }, []);

  // Create a painting
  const createPainting = async () => {
    try {
      if (title === "") {
        alert("Please enter a title.");
      } else if (artist === "") {
        alert("Please enter an artist.");
      } else if (year <= 0) {
        alert("Please enter a valid year.");
        return undefined;
      }
      await Axios.post(process.env.REACT_APP_HOST_LINK + "/api/internal", {
        title,
        artist,
        URL,
        year,
      });
      console.log("Painting created");
      void (await fetchData());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Delete a painting
  const deletePainting = async (id) => {
    try {
      await Axios.delete(
        process.env.REACT_APP_HOST_LINK + `/api/internal/${id}`,
      );
      console.log("Painting deleted");
      void (await fetchData());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Clear all paintings
  const clearPaintings = async () => {
    try {
      await Axios.delete(process.env.REACT_APP_HOST_LINK + "/api/internal/");
      console.log("Paintings cleared");
      void (await fetchData());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Update a painting
  const updatePainting = async (id, newTitle, newArtist, newYear) => {
    try {
      newTitle = newTitle || undefined;
      newArtist = newArtist || undefined;
      await Axios.patch(
        process.env.REACT_APP_HOST_LINK + `/api/internal/${id}`,
        {
          id: id,
          title: newTitle,
          artist: newArtist,
          year: parseInt(newYear),
        },
      );
      console.log("Painting updated");
      void (await fetchData());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Search for paintings
  const searchPainting = async (searchQuery) => {
    try {
      const paintings = await Axios.get(
        process.env.REACT_APP_HOST_LINK + `/api/external/${searchQuery}`,
      );
      if (paintings.data.data.length === 0) {
        alert("No results found.");
      }
      console.log("Paintings searched");
      setSearchResult(paintings.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      {/* Displaying list of paintings */}
      <div className="paintingsDisplay">
        {listOfPaintings.map((painting) => {
          return (
            <div className="searchPaintings">
              <img
                className="searchImage"
                alt="Painting"
                src={painting.URL}
                onClick={() => {
                  window.open(painting.URL);
                }}
              ></img>
              <div className="paintingButton">
                {/* Delete a painting */}
                <button
                  onClick={() => {
                    void deletePainting(painting._id);
                  }}
                >
                  <FiX />
                </button>
                {/* Update a painting */}
                <button
                  onClick={() => {
                    const newArtist = prompt(
                      "Input text to change the artist.",
                    );
                    const newTitle = prompt("Input text to change the title.");
                    const newYear = prompt(
                      "Input a number to change the year.",
                    );
                    if (newArtist || newTitle || newYear) {
                      void updatePainting(
                        painting._id,
                        newTitle,
                        newArtist,
                        newYear,
                      );
                    } else {
                      alert("Please enter something.");
                    }
                  }}
                >
                  <FiEdit2 />
                </button>
                {/* Download a painting */}
                <button
                  className="buttonRight1"
                  onClick={() => {
                    saveAs(
                      painting.URL,
                      painting.artist +
                        " - " +
                        painting.title +
                        " (" +
                        painting.year +
                        ")",
                    );
                  }}
                >
                  <FiDownload />
                </button>
              </div>

              <span className="searchClass">
                <p class="paintingTitle"> {painting.artist} </p>
                <p>
                  {" "}
                  {painting.title} • {painting.year}{" "}
                </p>
              </span>
            </div>
          );
        })}
      </div>

      {/* Input and search section */}
      <div>
        {/* Input fields for painting details */}
        <input
          style={{ width: "135px", float: "left" }}
          type="text"
          placeholder="Artist"
          onChange={(event) => {
            setArtist(event.target.value);
          }}
        />
        <input
          style={{ width: "200px", float: "left" }}
          type="text"
          placeholder="Title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          style={{ width: "65px", float: "left" }}
          type="number"
          placeholder="Year"
          onChange={(event) => {
            setYear(event.target.value);
          }}
        />
        <input
          style={{ width: "100px", float: "left" }}
          type="text"
          placeholder="URL"
          onChange={(event) => {
            setURL(event.target.value);
          }}
        />
        {/* Create a painting button */}
        <button style={{ float: "left" }} onClick={createPainting}>
          {" "}
          Log Painting
        </button>
        {/* Clear search results button */}
        <button
          style={{ float: "right" }}
          onClick={() => {
            setSearchResult([]);
          }}
        >
          {" "}
          Clear Searches
        </button>
        <button
          style={{ float: "right" }}
          onClick={() => {
            if (searchQuery === "") {
              alert("Please enter a search.");
            } else {
              void searchPainting(searchQuery);
            }
          }}
        >
          {" "}
          Search Painting
        </button>
        {/* Input field for search query */}
        <input
          style={{ width: "200px", float: "right" }}
          type="text"
          placeholder="Search Query"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        {/* Button to clear all paintings */}
        <button
          style={{ float: "left" }}
          onClick={() => {
            if (window.confirm("Clear?")) {
              void clearPaintings();
            }
          }}
        >
          {" "}
          Clear Paintings
        </button>

        {/* A spacer */}
        <h1> &nbsp;&nbsp;&nbsp;&nbsp; </h1>

        {/* Display search results */}
        {currentSearchResult.map((objectPainting) => {
          const title = objectPainting.title;
          const artist = objectPainting.artistName;
          const year = objectPainting.completitionYear;
          const URL = objectPainting.image;

          return (
            <div className="searchPaintings">
              <img
                className="searchImage"
                alt="painting"
                src={URL}
                onClick={() => {
                  window.open(URL);
                }}
              ></img>
              {/* Button to add a painting from search results */}
              <button
                className="paintingButton"
                onClick={() => {
                  Axios.post(
                    process.env.REACT_APP_HOST_LINK + "/api/internal",
                    {
                      title,
                      artist,
                      URL,
                      year,
                    },
                  ).then(() => {
                    void fetchData();
                  });
                }}
              >
                <FiPlus />
              </button>
              <span class="searchClass">
                {/* Displays information for each search */}
                <p> {artist} </p>
                <p>
                  {" "}
                  {title} • {year}{" "}
                </p>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
