import { createContext, useState, useContext, useEffect} from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie'
import { set } from "mongoose";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      
      setUser(res.data)
    } catch (error) {
      //console.log(error.response);
      setErrors(error.response.data);
    }
  };
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(()=>{
    if(errors.length>0){
      const timer = setTimeout(()=>{
        setErrors([])
      },5000)
      return ()=>clearTimeout(timer)
    }
  },[errors])
  useEffect(()=>{
    async function checkLogin (){
      const cookies = Cookies.get()
    console.log(cookies)
    if(!cookies.token){
      setIsAuthenticated(false)
      setLoading(false)
      setUser(null)
      return
      
    }
    try{
      const res = await verifyTokenRequest(cookies.token)
      if(!res.data) {
         setIsAuthenticated(false)
        setLoading(false)
        return
      }
      setIsAuthenticated(true)
      setLoading(false)
      setUser(res.data)
    }catch(error){
      setIsAuthenticated(false)
      setUser(null)
      setLoading(false)
    }
    }
    checkLogin()
  },[])
  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, errors, signin, loading,logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
