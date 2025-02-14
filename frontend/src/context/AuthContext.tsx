import { createContext, useContext, useEffect, useState } from "react";
interface UserProp {
    username: string;
    email: string;
}

interface AuthContextProps {
    userId: string;
    setUserId: (userId: string) => void;
    user: UserProp;
    setUser: (user: UserProp) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    authLoading: boolean;
    setAuthLoading: (authLoading: boolean) => void;

}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
const [userId, setUserId] = useState<string>('');
const [user, setUser] = useState<UserProp>({
    username: '',
    email: '',
})
const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
const [authLoading, setAuthLoading] = useState<boolean>(true);


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
        setIsAuthenticated(data.authenticated)
        setAuthLoading(false)
        setUser({
            username: data.user.username,
            email: data.user.email
        })
    })
    .catch(err => {
        console.log(err);
    })
},[])



useEffect(()=> {
    console.log("change", isAuthenticated)
    
},[isAuthenticated])
    return (
        <AuthContext.Provider value={{userId, setUserId, isAuthenticated, setIsAuthenticated, authLoading, setAuthLoading, user, setUser}}>
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