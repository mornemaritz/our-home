import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [householdName, setHouseholdName] = useState('');
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = /*async */(data) => {
    // Testing
    setHouseholdName(data.householdName);
    // setUser({username: 'me', token: 'token-meh'});
    // setToken('token-meh');
    // localStorage.setItem("token", 'token-meh');
    // try {
    //   const response = await fetch("http://localhost:5000/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    //   });
    //   const res = await response.json();

    //   if(res.data) {
    //     setUser(res.data.user);
    //     setToken(res.token);
    //     localStorage.setItem("token", res.token);
        navigate("/shopping-list");
    //     return;
    //   }

    //   throw new Error(res.message);
    // }
    // catch(err) {
    //   console.error(err);
    // }
  };

  const logoutAction = () => {
    setHouseholdName('');
    // setUser(null);
    // setToken("");
    // localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ /*user, token,*/ householdName, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  ); 
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};