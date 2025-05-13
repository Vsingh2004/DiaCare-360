import React from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar/page.jsx';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Sidebar/>
            {children}
        </>
    )
}

export default Layout;