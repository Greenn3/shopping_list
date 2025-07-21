import { useState } from 'react';
import axiosInstance from './axiosInstance';
import {Card} from "@mui/material";


export default function AddList({onListAdded}) {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/shoppingLists', {name})

            setName('');
            onListAdded();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }

    return (
<Card sx={{alignSelf:"center", justifySelf:"center", padding:"20px"}}>

    <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            required
        />
        <button type="submit">Add</button>
    </form>
</Card>
);
}