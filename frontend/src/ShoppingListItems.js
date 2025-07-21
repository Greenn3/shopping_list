// src/ShoppingListItems.js
import React, { useEffect, useState } from "react";
//import "./App.css"
import axiosInstance from "./axiosInstance";
import {Box, Button, Paper} from "@mui/material";

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
            <Box  sx={{display:"flex"}} className="cards-wrapper">
                {items.map(item => (
                    <Paper elevation={3} sx={{width: "200px", margin:"10px"}} key={item.id} className="card">
                      <p> Nazwa: {item.name}</p>
                        <p> Sklep:  {item.storeName}</p>
                     <p>  Ilość: {item.amount}</p>
                      <p> Cena:  {item.preferredPrice}</p>
                        <Button variant={"outlined"} onClick={async (e) => {
                            e.stopPropagation();
                            if (window.confirm("Delete this item?")) {
                                await deleteItem(item.id);
                            }
                        }}>🗑️</Button>
                    </Paper>
                ))}
           </Box>
        </div>
    );
}

export default ShoppingListItems;
