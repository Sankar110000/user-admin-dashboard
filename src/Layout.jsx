import React from 'react'
import { Outlet } from 'react-router'
import Footer from './components/Footer'
import Header from './components/Header'

function Layout() {
  return (
    <div>
        <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout