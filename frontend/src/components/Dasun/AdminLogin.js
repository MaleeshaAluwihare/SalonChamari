import React, { useState } from "react";
import { useNavigate,Link } from 'react-router-dom'
import back from '../../images/nisalka/back-button.png';
import logingif from '../../videos/nisalka/Digital Conversation.gif';
import styles from '../../css/nisalka/LoginStyles.module.css';

const AdminLogin = () => {
    const [data, setData] = useState({
        userName: "",
        password: ""
    });
    //*
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch('/api/admin/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data),
                credentials : 'include',
            });
            const result = await response.json();

            if(response.ok){
                navigate('/SystemAdminPanel');
            }
            else{
                console.log("Error navigating to panel")
                setError(result.message);
            }

        }catch(error){
            console.log("Error navigating to panel")
            setError('An error occurred.')
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
