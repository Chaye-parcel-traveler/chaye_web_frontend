import React, { useState } from 'react';
import '../styles/header.css';

function Header() {

    return (
            <div className="hero me-2">
                <div className="heroItem">
                    <h2 className='fw-bold'> Que veux tu faire?</h2>
                    <a href='/AddPackage'><input className='fw-bold' type="button" value="J'expédie" /></a>
                    <a href='/AddAnnouncements'><input type="button" className='fw-bold' value="Je transporte" /></a>
                </div>
            </div>
    )
}

export default Header
