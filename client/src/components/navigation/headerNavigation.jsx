import '../../styles/main.css'
import {NavLink} from 'react-router-dom'
import React, { useState } from "react";

const HeaderNavigation = () => {

    return(
        <>
        <div className='header-menu'>
        <nav>
        <div className="wrapper">
            <div className="logo"><NavLink to="/">Chímaira</NavLink></div>
            <input type="radio" name="slider" id="menu-btn"/>
            <input type="radio" name="slider" id="close-btn"/>
            <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="dashboard">Dashboard</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="group">Group</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="locker">Locker</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="lockergroup">Locker Group</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="settings">Settings</NavLink></li>
            <li>
            <NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="profile" className="desktop-item">Account</NavLink>
            <input type="checkbox" id="showDrop"/>
            <label htmlFor="showDrop" className="mobile-item">Account</label>
            <ul className="drop-menu">
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="profile">Username</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="documentation" href="#">Documentation</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="logout">Sign Out</NavLink></li>
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

export default HeaderNavigation;