import { Navigate, useLocation } from "react-router-dom";
import { fetchToken } from "./setToken";

export function RequireToken({children}) {
      
    let auth = fetchToken()
    let location = useLocation();
    
    if (!auth) {
        
      return <Navigate to="/login" state={{ from: location }} />;
    }
    
    return children;
}