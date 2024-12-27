import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const Virgil = (props) => {
    const user = useSelector(state => state.users);
    let location = useLocation();

    if(!user.auth){
        return <Navigate to={'/'} state={{from: location}} replace/>
    }
    return props.children
}

export default Virgil
