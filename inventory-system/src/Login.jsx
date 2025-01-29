import React, { useState } from 'react';
import { auth, provider } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import './Login.css'; // Optional: Add styles for the login component

const Login = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage("Login successful!"); // Set success message
      // Redirect to the main app or update state to show the app
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login to Stock Management</h1>
      <button onClick={handleLogin}>Login with Google</button>
      {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}
    </div>
  );
};

export default Login;
