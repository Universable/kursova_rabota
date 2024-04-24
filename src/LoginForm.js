import React, { useState } from 'react';

function LoginForm({ setLoggedIn, setIsAdmin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const users = [
        { id: 1, username: 'admin', password: 'admin', admin: true },
        { id: 2, username: 'user', password: 'user', admin: false }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            setLoggedIn(true);
            if (user.admin) {
                setIsAdmin(true);
            }
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-xs-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
