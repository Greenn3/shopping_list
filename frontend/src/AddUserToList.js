import { useState } from 'react';
import axiosInstance from './axiosInstance';

export default function AddUserToList({onUserAdded, id}) {

    const [userId, setId] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`/shoppingLists/${id}`, {userId})

            setId('');
            onUserAdded();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    return (

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={userId}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter user id"
                required
            />
            <button type="submit">Add</button>
        </form>
    );
}