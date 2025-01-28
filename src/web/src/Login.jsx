import { useState } from "react";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [ input, setInput ] = useState({
    householdName: ""
    // email: "",
    // password: ""
  });

  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.householdName/*input.email && input.password*/) {
      auth.loginAction(input);
      return;
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="w3-row-padding w3-card-4 w3-margin">
      <form className="w3-container" onSubmit={handleSubmit}>
        <div className="w3-section">
          <input  
            className="w3-input"
            type="text" required
            id="householdName"
            name="householdName"
            aria-describedby="household-name"
            aria-invalid="false"
            onChange={handleInput}
            />
          <label>Household Name</label>
        </div>
        {/* <div className="w3-section">
          <input  
            className="w3-input"
            type="email" required
            id="user-email"
            name="email"
            placeholder="example@gmail.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
            />
          <label>Email</label>
        </div>
        <div className="w3-section">      
          <input  
            className="w3-input"
            type="password" required
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
            />
          <label>Password</label>
        </div> */}
      <button type="submit" className="w3-button w3-block w3-blue">Submit</button>
      </form>
    </div>
  );
};

export default Login;