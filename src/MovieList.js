import React, { useState } from 'react';

const MovieList = ({ movies, handleEdit, handleDelete, isAdmin }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const moviesPerPage = 12;

    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const getCurrentMovies = () => {
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        return movies.slice(startIndex, endIndex);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleViewDetails = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
    };

    const renderMovies = () => {
        const currentMovies = getCurrentMovies();

        return currentMovies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.name}>
                <div className="card">
                    <div className="card-body">
                        <img src={movie.url}/>
                        <h5 className="card-title">{movie.name}</h5>
                        <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
                        <p className="card-text"><strong>Ratings:</strong> {movie.ratings}</p>
                        <p className="card-text"><strong>Actors:</strong> {movie.actors.join(', ')}</p>
                        <button
                                    className="btn btn-secondary me-2"
                                    onClick={() => handleViewDetails(movie)}
                                >
                                    View
                                </button>
                        {isAdmin && ( 
                            <div className="btn-group  mr-2">
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => handleEdit(movie)} 
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger me-2"
                                    onClick={() => handleDelete(movie.name)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="movie-list-container">
            <div className="row">
                {renderMovies()}
            </div>
            <div className="pagination-container text-center mt-4">
                <button
                    className="btn btn-primary me-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-primary ms-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Modal for detailed movie view */}
            {selectedMovie && (
                <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedMovie.name}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseDetails}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Description:</strong> {selectedMovie.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieList;
