import React, { useState } from "react"; // Import React and useState hook
import axios from "axios"; // Import Axios for API requests
import styles from "../../css/nisalka/LoginStyles.module.css"; // Import CSS styles
import logingif from '../../videos/nisalka/Digital Conversation.gif';
import EngSticker from '../../images/nisalka/engineer.png'
import EmpSticker from '../../images/nisalka/employee.png'
import back from '../../images/nisalka/back-button.png'

const Login = ({ history }) => {
    const [data, setData] = useState({ email: "", password: "" }); // State for form data
    const [error, setError] = useState(""); // State for error message

    // Function to handle form input changes
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
            alert("Please enter a valid email address.");
        } else if (!data.password.trim() || data.password.length < 6) {
            alert("Password must be at least 6 characters long.");
        } else {
            try {
                const url = "http://localhost:8070/api/auth/"; // API endpoint for authentication
                const res = await axios.post(url, data); // Send POST request to API
                console.log(res);
                localStorage.setItem("token", res.data.data); // Store authentication token in localStorage
                localStorage.setItem("email",res.data.email)

                // Check if token is received and navigate to profile page
                if (res.data.data) {
                    window.location = `/profile/${res.data.email}`;
                } else {
                    setError("Invalid email or password"); // Set error message if authentication fails
                }
            } catch (error) {
                // Handle API request errors
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message); // Set error message from API response
                }
            }
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
                        <h1>Welcome Back !</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
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
                        <a  className={styles.forgotp}href="/forgot"> forgot password</a>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                        <p className={styles.linkParagraph}>
                        Don't have an account? <a  className={styles.signup}href="/signup">sign up</a>
                        </p>
                        
                    </form>
                </div>
                <div className={styles.right}>
                    <img src={logingif} alt="login-gif" className={styles.login_gif} />
                    
                </div>
            </div>
            <div>
                <a href="/EmpLogin">
                    <img src={EmpSticker} alt="empSticker" className={styles.engsticker} />
                </a>
                <a href="/adlogin">
                    <img src={EngSticker} alt="engSticker" className={styles.engsticker1} />
                </a>
            </div>
        </div>
    );
};

export default Login; // Export the Login component
