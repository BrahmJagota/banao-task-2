import { createContext, useContext, useEffect, useState } from "react";

enum AuthStatus {
    pending = 'PENDING', 
    completed = 'COMPLETED'
 }

interface AuthContextProps {
    userId: string;
    setUserId: (userId: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    authStatus: AuthStatus;
    setAuthStatus: (AuthStatus: AuthStatus) => void;

}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
const [userId, setUserId] = useState<string>('');
const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.pending);


useEffect(()=> {
    fetch('http://localhost:3000/me', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
},[])

    return (
        <AuthContext.Provider value={{userId, setUserId, isAuthenticated, setIsAuthenticated, authStatus, setAuthStatus}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthContextProvider")
    }
    return context;
}