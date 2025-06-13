// src/ShoppingListItems.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./App.css"
import axiosInstance from "./axiosInstance";

function ShoppingListItems() {
    const { id } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/items/${id}`)
            .then(response => setItems(response.data))
            .catch(error => console.error("Error fetching items:", error));
    }, [id]);
    return (
        // <div id="lists" className="cards-container">
        //     <h2>Shopping Lists</h2>
        //     <div className="cards-wrapper">
        //
        //         {lists.map(list => (
        //             <Link to={`/list/${list.id}`}>
        //                 <div key={list.id} className="card">
        //
        //                     <h3>{list.name}</h3>
        //
        //                 </div>
        //             </Link>
        //         ))}
        //     </div>
        // </div>

        <div id="items" className="cards-container">
            <h2>Items for List ID: {id}</h2>
           <div className="cards-wrapper">
                {items.map(item => (
                    <div key={item.id} className="card">
                        {item.name}
                    </div>
                ))}
           </div>
            <Link to="/">← Back to Lists</Link>
        </div>
    );
}

export default ShoppingListItems;
