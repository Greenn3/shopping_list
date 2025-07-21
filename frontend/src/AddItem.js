
import { useState } from 'react';
import axiosInstance from './axiosInstance';
import {Card} from "@mui/material";


export default function AddItem({id, onItemAdded}) {
    const [name, setName] = useState('');
    const [storeName, setStoreName] = useState('');
    const [amount, setAmount] = useState('');
    const [preferredPrice, setPreferredPrice] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`/items`, {
                name,
                listId: id,
                storeName,
                amount,
                preferredPrice


            });
            setName('');
            onItemAdded();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }

    return (
<Card sx={{padding:"20px", justifySelf:"center"}}>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
                required
            />
            <br></br>
            <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Enter store name"
            />
            <br></br>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amout"
            />
            <br></br>
            <input
                type="text"
                value={preferredPrice}
                onChange={(e) => setPreferredPrice(e.target.value)}
                placeholder="Enter preferred price"
            />
            <br></br>
            <button type="submit">Add</button>
        </form>
</Card>
    );
}