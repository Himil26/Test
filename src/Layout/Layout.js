import React from 'react';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
