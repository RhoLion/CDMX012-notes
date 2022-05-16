import { useAuth } from "../context/UserProvider";
import { useHistory } from "react-router-dom";

export const ProtectedRoute = ({children}) => {

    const { user } = useAuth()
    const history = useHistory()
    if(!user) return history.push('/')

    return <>{children}</>
}