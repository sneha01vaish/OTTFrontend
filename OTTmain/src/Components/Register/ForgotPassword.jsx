// ForgotPassword.jsx
import React, { useState } from 'react';
import style from './forgotPassword.module.css'; // Create a CSS file for styling

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/forgot-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password reset link has been sent to your email!');
            } else {
                setError(data.error || 'An error occurred. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        }
    };

    return (
        <div className={style.container}>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Send Reset Link</button>
                {message && <p className={style.success}>{message}</p>}
                {error && <p className={style.error}>{error}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
