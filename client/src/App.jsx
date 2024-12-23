import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter, useLocation} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import HeaderNavigation from './components/navigation/headerNavigation'
import Authentication from './components/authentication'
import Dashboard from './components/dashboard'
import Group from './components/group'
import Locker from './components/locker'
import LockerGroup from './components/lockergroup'
import Profile from './components/profile'
import Documentation from './components/documentation'
import Configuration from './components/configuration'

function App() {
  const location = useLocation();
  const hideMenu = ['/', '/login', '/logout'].includes(location.pathname);
  useEffect(()=> {
    document.body.style = 'background: #ffffff'
  }, [hideMenu])
  
  return (
   <>
   {hideMenu ? <></> : <HeaderNavigation/>}
   <Routes>
    <Route path='/' element={<Authentication/>}/>
    <Route path='dashboard' element={<Dashboard/>}/>
    <Route path='group' element={<Group/>}/>
    <Route path='locker' element={<Locker/>}/>
    <Route path='lockergroup' element={<LockerGroup/>}/>
    <Route path='settings' element={<Configuration/>}/>
    <Route path='profile' element={<Profile/>}/>
    <Route path='documentation' element={<Documentation/>}/>
    <Route path='logout' element={<Authentication/>}/>
   </Routes>
   </>
  )
}

export default App
