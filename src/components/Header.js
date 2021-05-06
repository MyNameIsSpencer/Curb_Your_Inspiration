import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header-container">
            <div className="link-container">
                <Link to="/quotepics" className="link-text"> List </Link>
                <Link to="/createquotepic" className="link-text"> Create Quote </Link>
                <Link to="/signup" className="link-text link-right signup-button"> Sign Up </Link>
                <Link to="/login" className="link-text link-right"> Log In </Link>
            </div>
        </div>
    );
}