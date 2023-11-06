import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './userdashboard.css';

function UserDashboard() {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://127.0.0.1:8000/api/getUserInfo/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData({
                    name: data.data.name,
                    email: data.data.email,
                });
            })
            .catch((error) => {
                console.error('Error fetching user information:', error);
            });
    }, [id]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/updateUserInfo/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            setIsEditing(false);
            console.log('User info updated successfully');
        } else {
            console.error('Failed to update user info');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    return (
        <div className="userdashboard-container">
            <h2>User Dashboard</h2>
            <div className="user-info">
                <div className="user-info-item">
                    <strong>Username:</strong> {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    ) : (
                        userData.name
                    )}
                </div>
                <div className="user-info-item">
                    <strong>Email:</strong> {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    ) : (
                        userData.email
                    )}
                </div>
            </div>
            {isEditing ? (
                <button onClick={handleSaveClick}>Save</button>
            ) : (
                <button onClick={handleEditClick}>Edit</button>
            )}
        </div>
    );
}

export default UserDashboard;
