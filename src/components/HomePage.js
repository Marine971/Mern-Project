import React from 'react';
import Banner from "./Banner";

function HomePage() {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
    };

    return (

        <div style={pageStyle}>
            <Banner />


        </div>
    );
}

export default HomePage;
