import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/nisalka/profileStyles.module.css";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/users/get/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setUserData(response.data.user);
            setUpdatedUserData({ ...response.data.user, password: "123456" });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        console.log("in effect");
        setToken(localStorage.getItem("token"));
        setEmail(localStorage.getItem("email"));
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("email"));
        fetchData();
    }, [email]); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
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
            <div className={styles.sidebar_20}>
                
                <button className={styles.viewB_btn}>View Booking</button>
            </div>
            <div className={styles.user_details_container_80}>
                {userData && (
                    <div className={styles.user_details}>
                        <h2 className={styles.heading}>User Details</h2>
                        <div className={styles.avatar_container}>
                            {userData.profilePicture && (
                                <div className={styles.avatar}>
                                    {typeof userData.profilePicture === "string" ? (
                                        userData.profilePicture
                                    ) : (
                                        <img src={userData.profilePicture} alt="Avatar" />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={styles.input_row}>
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
                        </div>
                        <div className={styles.input_row}>
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
                        </div>
                        <div className={styles.input_row}>
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
                        </div>
                        <button className={styles.update_btn} onClick={handleUpdate}>
                            Update Info
                        </button>
                        <button className={styles.white_btn} onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
