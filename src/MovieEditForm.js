import React, { useState } from 'react';

const MovieEditForm = ({ movie, onSave, onCancel }) => {
    const [editedMovie, setEditedMovie] = useState({
        url: movie.url,
        name: movie.name,
        genre: movie.genre,
        ratings: movie.ratings,
        actors: movie.actors.join(', '),
        description: movie.description
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedMovie({ ...editedMovie, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const actorsArray = editedMovie.actors.split(',').map(actor => actor.trim());
        const updatedMovie = {
            movie,
            url: editedMovie.url,
            name: editedMovie.name,
            genre: editedMovie.genre,
            ratings: parseFloat(editedMovie.ratings),
            actors: actorsArray,
            description: editedMovie.description
        };
        onSave(updatedMovie);
    };

    // List of predefined movie genres
    const genreOptions = [
        'Action',
        'Adventure',
        'Animation',
        'Biography',
        'Comedy',
        'Crime',
        'Drama',
        'Fantasy',
        'Horror',
        'Mystery',
        'Romance',
        'Science Fiction',
        'War',
        'Western'
    ];

    return (
        <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Movie Details</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">Image:</label>
                            <input type="text"   className="form-control" name="url" onChange={handleInputChange} value={editedMovie.url}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={editedMovie.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Genre:</label>
                                <select
                                    className="form-select"
                                    name="genre"
                                    value={editedMovie.genre}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Genre</option>
                                    {genreOptions.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ratings:</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    name="ratings"
                                    value={editedMovie.ratings}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    max="10"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Actors (comma-separated):</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="actors"
                                    value={editedMovie.actors}
                                    onChange={handleInputChange}
                                    required
                                    title="Actors should contain only letters, spaces, and commas"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={editedMovie.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary me-2">Save Changes</button>
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieEditForm;
