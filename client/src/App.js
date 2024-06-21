import "./App.css";
import React from "react";
import { Route, Link, Routes } from 'react-router-dom';
import Galleries from './Galleries';
import SearchPage from './SearchPage';
import AddPainting from './AddPainting';
import './index.css';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">Painting Gallery</h1>
                <nav className="mb-6 text-center">
                    <Link to="/" className="bg-blue-500 text-white p-2 rounded mx-2">Home</Link>
                    <Link to="/galleries" className="bg-blue-500 text-white p-2 rounded mx-2">Galleries</Link>
                    <Link to="/search" className="bg-blue-500 text-white p-2 rounded mx-2">Search</Link>
                    <Link to="/add" className="bg-blue-500 text-white p-2 rounded mx-2">Add Painting</Link>
                </nav>
                <Routes>
                    <Route path="/galleries" element={<Galleries />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/add" element={<AddPainting />} />
                    <Route path="/" element={
                        <div className="text-center">
                            <h2 className="text-2xl">Welcome to the Painting Gallery</h2>
                            <p>Select an option from above to get started.</p>
                        </div>
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default App;
