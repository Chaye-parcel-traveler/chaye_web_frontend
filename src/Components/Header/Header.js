import React from 'react'
import '../styles/header.css';

function Header() {
    return (
        <div>
            <div class="hero me-2">
                <div class="heroItem">
                    <h2> Que veux tu faire?</h2>
                    <a href='/AddPackage'><input className='fw-bold' type="button" value="J'expédie" /></a>
                    <a href='/AddAnnouncements'> <input type="button"  className='fw-bold' value="Je transporte" /></a>
                </div>
            </div>
            <div className="search me-2">
                <input class=" form-control py-3 " type="search" placeholder="Recherche" aria-label="Search"/>
            </div>
        </div>
    )
}

export default Header
