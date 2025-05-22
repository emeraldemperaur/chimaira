import '../../styles/main.css'
import {NavLink, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../store/actions/users';
import PropTypes from 'prop-types';


const HeaderNavigation = ({users}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSignOut = () =>{
        console.log(`Signing Out User:${users.data.uuid}`);
        dispatch(signOutUser());
        setTimeout(() => { navigate('/logout')}, 111);
    }

    return(
        <>
        <div className='header-menu'>
        <nav>
        <div className="wrapper">
            <div className="logo"><NavLink to="/">Chím<em>ai</em>ra</NavLink></div>
            <input type="radio" name="slider" id="menu-btn"/>
            <input type="radio" name="slider" id="close-btn"/>
            <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="dashboard">Dashboard</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="context-profile">Context Profiles</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="query-model">Query Models</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="rag-artifacts">RAG Artifacts</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="settings">Settings</NavLink></li>
            <li>
            <NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="profile" className="desktop-item"><i className="fa-regular fa-user"></i></NavLink>
            <input type="checkbox" id="showDrop"/>
            <label htmlFor="showDrop" className="mobile-item">Account</label>
            <ul className="drop-menu">
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="profile"><i className="fa-solid fa-user"></i> {users.data.firstName}</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="documentation"><i className="fa-solid fa-lightbulb"></i> Help</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="logout" onClick={() => userSignOut()}><i className="fa-solid fa-door-open"></i> Sign Out</NavLink></li>
            </ul>
            </li>
            </ul>
            <label htmlFor="menu-btn" className="btn menu-btn"><i className="mobile-menu-icon fas fa-bars"></i></label>
        </div>
        </nav>
        </div>
        </>
    )
}

HeaderNavigation.propTypes = {
  users: PropTypes.object.isRequired
}

export default HeaderNavigation;