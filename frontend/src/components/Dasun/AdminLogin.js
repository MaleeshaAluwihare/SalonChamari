import React, { useState } from "react";
import back from '../../images/nisalka/back-button.png';
import logingif from '../../videos/nisalka/Digital Conversation.gif';
import styles from '../../css/nisalka/LoginStyles.module.css';

const AdminLogin = () => {
    const [data, setData] = useState({
        userName: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const Username = "Salon@admin";
        const Password = "admin123";

        if (data.userName === Username && data.password === Password) {
            // Redirect to SystemAdminPanel if login is successful
            window.location.href = "/SystemAdminPanel";
        } else {
            // Display error message or handle invalid login
            console.log("Invalid username or password");
        }
    };

    return (
        <div className={styles.login_container}>
            <div>
                <a href="/salon-home">
                    <img src={back} alt="back" className={styles.back} />
                </a>
            </div>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Admin Login</h1>
                        <input
                            type="userName"
                            placeholder="User Name"
                            name="userName"
                            onChange={handleChange}
                            value={data.userName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                       
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>    
                    </form>
                </div>
                <div className={styles.right}>
                    <img src={logingif} alt="login-gif" className={styles.login_gif} />
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
