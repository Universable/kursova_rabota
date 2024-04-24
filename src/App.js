import React, { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import MovieList from './MovieList';
import NewMovieForm from './NewMovieForm';
import MovieEditForm from './MovieEditForm'; 
import moviesData from './movies.json';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [movies, setMovies] = useState(moviesData);
    const [showNewMovieForm, setShowNewMovieForm] = useState(false);
    const [sortCriteria, setSortCriteria] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [editMovie, setEditMovie] = useState(null); 

    const handleLogout = () => {
        setLoggedIn(false);
        setIsAdmin(false);
    };

    const handleAddNewMovie = () => {
        setShowNewMovieForm(true);
    };

    const handleSaveNewMovie = (newMovie) => {
        const updatedMovies = [...movies, newMovie];
        setMovies(updatedMovies);
        setShowNewMovieForm(false);
    };

    const handleCancelNewMovie = () => {
        setShowNewMovieForm(false);
    };

    const handleSortByCriteria = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriteria(criteria);
            setSortOrder('asc'); 
        }
    };

    const handleEdit = (movie) => {
        setEditMovie(movie);
    };

    const handleEditSave = (updatedMovie) => {
        const updatedMovies = movies.map((movie) =>
            movie.name === updatedMovie.name ? updatedMovie : movie
        );
        setMovies(updatedMovies);
        setEditMovie(null); 
    };

    const handleDelete = (movieName) => {
        const updatedMovies = movies.filter((movie) => movie.name !== movieName);
        setMovies(updatedMovies);
    };

    const sortedMovies = [...movies];
    if (sortCriteria === 'name') {
        sortedMovies.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
    } else if (sortCriteria === 'ratings') {
        sortedMovies.sort((a, b) => {
            const ratingsA = a.ratings;
            const ratingsB = b.ratings;
            return sortOrder === 'asc' ? ratingsA - ratingsB : ratingsB - ratingsA;
        });
    }

    return (
        <div className="app-container">
            <div className="app-header text-center py-5">
                {!loggedIn ? (
                    <div className="welcome-container">
                        <h1>Sineok bql drakon</h1>
                        
                        <LoginForm setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />
                    </div>
                ) : (
                    <div className="dashboard-container">
                        <h1>Dashboard</h1>
                        <p>You are logged in as {isAdmin ? 'an admin' : 'a user'}.</p>
                        <button className="btn btn-danger mb-3" onClick={handleLogout}>
                            Logout
                        </button>
                        {isAdmin && (
                            <>
                                <button className="btn btn-primary mb-3 if" onClick={handleAddNewMovie}>
                                    Add New Movie
                                </button>
                                </>
                        )}
                                <div className="mb-3">
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={() => handleSortByCriteria('name')}
                                    >
                                        Sort by Name
                                    </button>
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={() => handleSortByCriteria('ratings')}
                                    >
                                        Sort by Ratings
                                    </button>
                                </div>

                        <MovieList
                            movies={sortedMovies}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            isAdmin={isAdmin}
                            />
                        {showNewMovieForm && isAdmin && (
                            <NewMovieForm
                                onSave={handleSaveNewMovie}
                                onCancel={handleCancelNewMovie}
                            />
                        )}
                        {editMovie && isAdmin && (
                            <MovieEditForm
                                movie={editMovie}
                                onSave={handleEditSave}
                                onCancel={() => setEditMovie(null)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
