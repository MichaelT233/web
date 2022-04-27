import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
    let navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">Michael Thiele</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <div className="nav-link active" aria-current="page">Home</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link active">Cart</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link active">About</div>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/"><li><div className="dropdown-item">Featured</div></li></Link>
                                <li><hr className="dropdown-divider"/></li>
                                <Link to="/category/Home Decor"><li><div className="dropdown-item">Home Decor</div></li></Link>
                                <li><hr className="dropdown-divider"/></li>
                                <Link to="/category/Beauty"><li><div className="dropdown-item">Beauty</div></li></Link>
                                <li><hr className="dropdown-divider"/></li>
                                <Link to="/category/Toys"><li><div className="dropdown-item">Toys</div></li></Link>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input id="searchBar" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button onClick={()=>navigate(`/search/${(document.getElementById("searchBar") as HTMLInputElement).value}`)} className="btn btn-outline-dark" type="button">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
export function Footer() {
    return (
        <div>test</div>
    );
}