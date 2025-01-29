import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { auth } from './firebaseConfig';
import Login from './Login';
import { appendToGoogleSheet } from './googleSheets'; // Assuming this function exists
import { database } from './firebaseConfig'; // Assuming Firebase database is initialized

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [storeLocation, setStoreLocation] = useState('');
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const dataToSubmit = { itemQuantity: parseInt(itemQuantity), storeLocation, user: user.displayName };
        console.log("Data to submit:", dataToSubmit); // Log the data being submitted
        console.log("Item Quantity:", itemQuantity); // Log item quantity
        console.log("Store Location:", storeLocation); // Log store location

      try {
        // Append data to Google Sheets
        await appendToGoogleSheet(dataToSubmit);

        // Store data in Firebase
        await database.ref('stockData').push({
          itemQuantity,
          storeLocation,
          user: user.displayName,
          timestamp: new Date().toISOString(),
        });

        // Reset form fields
        setItemQuantity(0);
        setStoreLocation('');
      } catch (err) {
        console.error("Error during submission:", err); // Log the error
        setError("Error submitting stock data: " + err.message); // Set error message
      }
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {user ? (
        <div>
          <form onSubmit={handleStockSubmit}>
            <input 
              type="number" 
              value={itemQuantity} 
              onChange={(e) => setItemQuantity(e.target.value)} 
              placeholder="Enter item quantity" 
              required 
            />
            <input 
              type="text" 
              value={storeLocation} 
              onChange={(e) => setStoreLocation(e.target.value)} 
              placeholder="Enter store location" 
              required 
            />
            <button type="submit">Submit Stock</button>
          </form>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <p>Welcome, {user.displayName}</p>
        </div>
      ) : (
        <Login />
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
