import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/nisalka/profileStyles.module.css";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState(null);
    const { email } = useParams();

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        if (!token || !email) return;

        try {
            const response = await axios.get(`http://localhost:8070/api/users/get/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setUserData(response.data.user);
            // Set initial state without modifying email and setting default password to "123456"
            setUpdatedUserData({ ...response.data.user, password: "123456" });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        console.log(localStorage.getItem("token"));
        fetchData();
    }, [email]); // Added email to the dependency array

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
    };

    const handleChange = (e) => {
        setUpdatedUserData({
            ...updatedUserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!token || !email || !updatedUserData) return;

        try {
            const response = await axios.put(`http://localhost:8070/api/users/update/${email}`, updatedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Updated data:", response.data);
            setUserData(response.data.user);
            setUpdatedUserData({ ...response.data.user });
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
                <button className={styles.white_btn}>View Booking</button>
            </nav>
            <div className={styles.user_details_container}>
                {userData && (
                    <div className={styles.user_details}>
                        <div className={styles.avatar_container}>
                            {/* Render avatar initials or image */}
                            {userData.profilePicture && (
                                <div className={styles.avatar}>
                                    {/* If profilePicture is an initials string */}
                                    {typeof userData.profilePicture === "string" ? (
                                        userData.profilePicture
                                    ) : (
                                        /* If profilePicture is an image URL */
                                        <img src={userData.profilePicture} alt="Avatar" />
                                    )}
                                </div>
                            )}
                        </div>
                        <h2 className={styles.heading}>User Details</h2>
                        <div className={styles.input_container}>
                            <label className={styles.label_1}>Email:</label>
                            <input
                                type="text"
                                name="email"
                                value={userData.email}
                                readOnly
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label className={styles.label_1}>Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={updatedUserData.fullName}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label className={styles.label_1}>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={updatedUserData.phone}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label className={styles.label_1}>Age:</label>
                            <input
                                type="text"
                                name="age"
                                value={updatedUserData.age}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label className={styles.label_1}>Gender:</label>
                            <input
                                type="text"
                                name="gender"
                                value={updatedUserData.gender}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <label className={styles.label_1}>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={updatedUserData.password}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <button className={styles.update_btn} onClick={handleUpdate}>
                            Update Info
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
