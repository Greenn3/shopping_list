// src/ShoppingListItems.js
import React, { useEffect, useState } from "react";
//import "./App.css"
import axiosInstance from "./axiosInstance";

function ShoppingListItems({id, items, onItemDeleted}) {

    const deleteItem = async (itemId) => {
        console.log('🗑️ deleteList called with ID:', itemId); // ✅ debug

        try {
            await axiosInstance.delete(`/items/${itemId}`);

            onItemDeleted(); // should be fetchLists
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    return (

        <div id="items" className="cards-container">
            <h2>Items for List ID: {id}</h2>
           <div className="cards-wrapper">
                {items.map(item => (
                    <div key={item.id} className="card">
                      <p> Nazwa: {item.name}</p>
                        <p> Sklep:  {item.storeName}</p>
                     <p>  Ilość: {item.amount}</p>
                      <p> Cena:  {item.preferredPrice}</p>
                        <button onClick={async (e) => {
                            e.stopPropagation();
                            if (window.confirm("Delete this item?")) {
                                await deleteItem(item.id);
                            }
                        }}>🗑️</button>
                    </div>
                ))}
           </div>
        </div>
    );
}

export default ShoppingListItems;
