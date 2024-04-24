import { Route, Routes } from "react-router-dom";
import Profile from "../src/components/nisalka/Profile";
import Signup from "../src/components/nisalka/Signup";
import Login from "../src/components/nisalka/Login";
import { Navigate } from "react-router-dom";
import CMdashboard from "./components/nisalka/CMdashboard";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/profile/:email" exact element={<Profile />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
      <Route path="/login" element={<Navigate replace to="/login" />} />

      <Route path="/cmdash" element={<CMdashboard/>}/>
      
      
      


		</Routes>
	);
}

export default App;
