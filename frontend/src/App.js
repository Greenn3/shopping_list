import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Link, Routes, Route } from 'react-router-dom';
import ShoppingLists from './ShoppingLists';
import ShoppingListItems from './ShoppingListItems'; // if you need it later
import axios from './axiosInstance';
import { useEffect } from 'react';
import { useState } from 'react';
import AddList from "./AddList";
import axiosInstance from "./axiosInstance";
// import "./App.css"
import AddItem from "./AddItem";
import Modal from "./Modal";
import {Container, Typography} from "@mui/material";


function App() {
    const { keycloak, initialized } = useKeycloak();
    const [isOpen, setIsOpen] = useState(false);
    const [lists, setLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [showListModal, setShowListModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);




    const [items, setItems] = useState([]);



    const fetchLists = async () => {
        console.log('%c 🔁 fetchLists called', 'color: orange');
        try {
            const response = await axiosInstance.get('/shoppingLists/lists');
            setLists(response.data);
        } catch (error) {
            console.error('❌ Error fetching lists:', error);
        }
    };
const fetchItems = async () =>{
    axiosInstance.get(`/items/${selectedListId}`)
        .then(response => setItems(response.data))
        .catch(error => console.error("Error fetching items:", error));
}






    // Call /me once when authenticated
    useEffect(() => {
        if (keycloak?.authenticated) {
            axios.get('/users/me')
                .then(res => {
                    console.log("User synced:", res.data);
                })
                .catch(err => {
                    console.error("Failed to sync user:", err);
                });
        }
    }, [keycloak?.authenticated]);


    useEffect(() => {
        if (initialized && keycloak?.authenticated) {
            fetchLists();
        }
    }, [initialized, keycloak?.authenticated]);



    useEffect(() => {
        if (selectedListId) {
            fetchItems();
        }
    }, [selectedListId]);




    if (!initialized) return <div>Loading...</div>;

    if (!keycloak.authenticated) {
        return <button onClick={() => keycloak.login()}>Login</button>;
    }



    function Top_header () {
        return(

            <box sx={{ bgcolor: "blue", height:"30px", display:"flex" }}>
               <Typography variant={"h3"}>The ultimate shopping list</Typography>
               <Typography variant={"h4"}>Welcome, {keycloak.tokenParsed?.preferred_username}</Typography>
                <button onClick={() => keycloak.logout()}>Logout</button>
            </box>
    );
    }


    return (
        <Container sx={{ bgcolor: "beige", height: "100%"}}>
        <div>
            <Top_header/>
            <div>


                <button onClick={() => setShowListModal(true)}>➕ Add List</button>


            </div>
            <button onClick={() => setIsOpen(true)}>Add list</button>
            {showListModal && (
                <Modal onClose={() => setShowListModal(false)}>
                    <AddList onListAdded={() => {
                        fetchLists();
                        setShowListModal(false);
                    }} />
                </Modal>
            )}

            <ShoppingLists lists={lists}
                           onListClick={setSelectedListId}
                           selectedListId={selectedListId }
                           onListDeleted={fetchLists}
            />
            <line>-------------------------------------------------------------------------------------------</line>
            {selectedListId && (
                <button onClick={() => setShowItemModal(true)}>➕ Add Item</button>
            )}
            {selectedListId && (
                <ShoppingListItems id={selectedListId}
                                   items={items}
                                   onItemDeleted={fetchItems}
                />
            )}
            {showItemModal && selectedListId && (
                <Modal onClose={() => setShowItemModal(false)}>
                    <AddItem id={selectedListId} onItemAdded={() => {
                        setShowItemModal(false);
                        fetchItems();
                    }}/>
                </Modal>
            )}


        </div>
</Container>
    );
}

export default App;
