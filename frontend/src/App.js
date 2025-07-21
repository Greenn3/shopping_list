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
import {AppBar, Box, Button, Container, Dialog, Icon, Modal, Typography} from "@mui/material";
import Top_header from "./TopHeader";
import keycloak from "./keycloak";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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





    return (
        <Container sx={{height: "100%"}}>
        <div>
            <AppBar sx={{spacing:"10px"}}>
                <Box sx={{ bgcolor: "skyblue", height:"100px", display:"flex" , textAlign:"center"}}>
                    <ShoppingCartIcon/>
                    <Typography variant={"h3"}>SyncCart</Typography>
                <Typography variant={"h4"}>The ultimate shopping list</Typography>
                <Typography variant={"h5"}>Welcome, {keycloak.tokenParsed?.preferred_username}</Typography>
                <Button variant={"contained"} onClick={() => keycloak.logout()}>Logout</Button>
            </Box>
            </AppBar>
            {/*<div>*/}


                <Button variant={"contained"} onClick={() => setShowListModal(true)}>➕ Add List</Button>


            {/*</div>*/}
            {/*<Button variant={"text"} onClick={() => setIsOpen(true)}>Add list</Button>*/}
            {showListModal && (
                <Dialog onClose={() => setShowListModal(false)}
            open={showListModal}

                >
                    <AddList onListAdded={() => {
                        fetchLists();
                        setShowListModal(false);
                    }} />
                </Dialog>
            )}

            <ShoppingLists lists={lists}
                           onListClick={setSelectedListId}
                           selectedListId={selectedListId }
                           onListDeleted={fetchLists}
            />

            {selectedListId && (
                <Button variant={"contained"} onClick={() => setShowItemModal(true)}>➕ Add Item</Button>
            )}
            {selectedListId && (
                <ShoppingListItems id={selectedListId}
                                   items={items}
                                   onItemDeleted={fetchItems}
                />
            )}
            {showItemModal && selectedListId && (
                <Dialog onClose={() => setShowItemModal(false)}
                open={showItemModal}
                >
                    <AddItem id={selectedListId} onItemAdded={() => {
                        setShowItemModal(false);
                        fetchItems();
                    }}/>
                </Dialog>
            )}


        </div>
</Container>
    );
}

export default App;
