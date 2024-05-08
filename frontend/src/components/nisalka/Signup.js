import { useState } from "react"; // Import useState hook
import axios from "axios"; // Import Axios for API requests
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import styles from "../../css/nisalka/SignupStyles.module.css"; // Import CSS styles
import signupgif from '../../videos/nisalka/signup.gif'
import back from '../../images/nisalka/back-button.png'

const Signup = () => {
    const [data, setData] = useState({ // State for form data
        fullName: "",
        email: "",
        phone:"",
        age:"",
        gender:"",
        password: "",
    });
    const [error, setError] = useState(""); // State for error message
    const navigate = useNavigate(); // useNavigate hook for navigation

    // Function to handle input changes in the form
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value }); // Update specific field in data state
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.fullName.trim()) {
            alert("Please enter your full name.");
        } else if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
            alert("Please enter a valid email address.");
        } else if (!data.phone.trim() || !/^\d{10}$/.test(data.phone)) {
            alert("Please enter a valid 10-digit phone number.");
        } else if (!data.age || data.age < 18) {
            alert("You must be at least 18 years old to sign up.");
        } else if (!data.gender) {
            alert("Please select your gender.");
        } else if (!data.password.trim() || data.password.length < 6) {
            alert("Password must be at least 6 characters long.");
        } else {
            try {
                const url = "http://localhost:8070/api/users"; // API endpoint for signup
                const { data: res } = await axios.post(url, data); // Send POST request with form data
                navigate("/login"); // Navigate to login page after successful signup
                console.log(res.message); // Log success message from response
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message); // Set error message if request fails
                }
            }
        }
    };

    return (
        <div className={styles.signup_container}>
            <div>
                <a href="/your-target-page">
                    <img src={back} alt="back" className={styles.back} />
                </a>
            </div>
            <div className={styles.signup_form_container}>
                <div className={styles.left1}>
                    <img src={signupgif} alt="signup-gif" className={styles.signup_gif} />
                </div>
                <div className={styles.right1}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>New here? Sign up now!</h1>
                        {/* Input fields for user registration */}
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            onChange={handleChange}
                            value={data.fullName}
                            required
                            className={styles.input}
                        />
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
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            onChange={handleChange}
                            value={data.phone}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            required
                            className={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            name="age"
                            onChange={handleChange}
                            value={data.age}
                            required
                            min="18"
                            className={styles.input}
                        />
                        <select
                            name="gender"
                            onChange={handleChange}
                            value={data.gender}
                            required
                            className={styles.input}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            minLength="6"
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {/* Submit button for signup */}
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                        <p className={styles.linkParagraph}>
                            Already registered? <a href="/login" className={styles.signin}>sign in</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup; // Export the Signup component
