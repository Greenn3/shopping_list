import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Link, Routes, Route } from 'react-router-dom';
import ShoppingLists from './ShoppingLists';
import ShoppingListItems from './ShoppingListItems'; // if you need it later

function App() {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) return <div>Loading...</div>;

    if (!keycloak.authenticated) {
        return <button onClick={() => keycloak.login()}>Login</button>;
    }

    return (
        <div>
            <h2>Welcome, {keycloak.tokenParsed?.preferred_username}</h2>
            <button onClick={() => keycloak.logout()}>Logout</button>

            {/* Add the link to Shopping Lists below logout */}
            <div style={{ marginTop: '1rem' }}>
                <Link to="/lists">View Shopping Lists</Link>
            </div>

            {/* Define the routes here */}
            <Routes>
                <Route path="/lists" element={<ShoppingLists />} />
                {/* Optionally:*/}
                {/* <Route path="/list/:id" element={<ShoppingListItems />} /> */}
            </Routes>
        </div>
    );
}

export default App;
