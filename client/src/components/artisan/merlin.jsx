import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Merlin = (props) => {
    let location = useLocation();
    const users = useSelector(state => state.users);
    return(
        <>
        { users.auth ? <Navigate to="/dashboard" state={{from: location}} replace/> : props.children  }
        </>
    )

}

export default Merlin