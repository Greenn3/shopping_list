// src/ShoppingLists.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css"

function ShoppingLists() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get("http://80.211.200.112:8080/shoppingLists")
            .then(response => setLists(response.data))
            .catch(error => console.error("Error fetching lists:", error));
    }, []);

    return (
        <div id="lists" className="cards-container">
            <h2>Shopping Lists</h2>
            <div className="cards-wrapper">

                {lists.map(list => (
                    <Link to={`/list/${list.id}`}>
                    <div key={list.id} className="card">

                        <h3>{list.name}</h3>

                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );

}

export default ShoppingLists;
