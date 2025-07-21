// src/ShoppingLists.js
import React, { useEffect, useState } from "react";
//import "./App.css"
import axiosInstance from "./axiosInstance";

import AddList from "./AddList";
import AddUserToList from "./AddUserToList";
import {Button, Card, Dialog, Modal} from "@mui/material";



function ShoppingLists({lists, onListClick, selectedListId, onListDeleted}) {

    const [listIdForUserModal, setListIdForUserModal] = useState(null);

    const deleteList = async (listId) => {
        console.log('🗑️ deleteList called with ID:', listId); // ✅ debug

        try {
            await axiosInstance.delete(`/shoppingLists/${listId}`);
            console.log('✅ deleted list, now calling onListDeleted()');
            onListDeleted(); // should be fetchLists
        } catch (error) {
            console.error("Error deleting list:", error);
        }
    };


    return (
        <div id="lists" className="cards-container">
            <h2>Shopping Lists</h2>
            <div className="cards-wrapper">

                {lists?.map(list => (
                    <Card sx={{width:"200px" , margin:"2rem"}} key={list.id}

                         className={`card ${selectedListId===list.id ? 'card-selected' : ''}`}
                         onClick={() => onListClick(list.id)}>
                        <h3>{list.name}</h3>
                        <Button variant={"outlined"} onClick={async (e) => {
                            e.stopPropagation();
                            if (window.confirm("Delete this list?")) {
                                await deleteList(list.id);
                            }
                        }}>🗑️</Button>
                        <Button variant={"contained"}
                            onClick={(e) => {
                                e.stopPropagation();
                                setListIdForUserModal(list.id);
                            }}
                        >
                            Add user
                        </Button>


                    </Card>
                ))}
                {listIdForUserModal && (
                    <Dialog onClose={() => setListIdForUserModal(null)}
                    open={listIdForUserModal}>
                        <AddUserToList
                            id={listIdForUserModal}
                            onUserAdded={() => setListIdForUserModal(null)}
                        />
                    </Dialog>
                )}

            </div>
        </div>
    );

}

export default ShoppingLists;
