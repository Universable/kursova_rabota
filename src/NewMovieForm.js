import React, { useState } from 'react';

const NewMovieForm = ({ onSave, onCancel }) => {
    const [newMovie, setNewMovie] = useState({
        url: '',
        name: '',
        genre: '', 
        ratings: '',
        actors: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedMovie = {
            ...newMovie,
            ratings: parseFloat(newMovie.ratings),
            actors: newMovie.actors.split(',').map(actor => actor.trim())
        };
        onSave(formattedMovie);
        setNewMovie({
            url:  '',
            name: '',
            genre: '',
            ratings: '',
            actors: '',
            description: ''
            
        });
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
                        <h5 className="modal-title">Add New Movie</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div>
                            <label className="form-label">Image:</label>
                            <input type="text"   className="form-control" name="url" onChange={handleInputChange} value={newMovie.url}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={newMovie.name}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[A-Za-z\s]+"
                                    title="Name should contain only letters and spaces"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Genre:</label>
                                <select
                                    className="form-select"
                                    name="genre"
                                    value={newMovie.genre}
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
                                    value={newMovie.ratings}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    max="10"
                                    pattern="[1-9]|10"
                                    title="Ratings should be a number between 1 and 10"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Actors (comma-separated):</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="actors"
                                    value={newMovie.actors}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[A-Za-z\s,]+"
                                    title="Actors should contain only letters, spaces, and commas"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={newMovie.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary me-2">Add Movie</button>
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewMovieForm;
