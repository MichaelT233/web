// ui shell components of SPA that wraps service level components

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// header of SPA
export function Header(): JSX.Element {
    let navigate = useNavigate();
    // get text from search bar
    function getDomText() {
        const text = (document.getElementById("searchBar") as HTMLInputElement).value;
        return text;
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">Brand</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</div>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><div className="dropdown-item"><Link to="/" className="nav-link active">Featured</Link></div></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><div className="dropdown-item"><Link to="/category/Home Decor" className="nav-link active">Home Decor</Link></div></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><div className="dropdown-item"><Link to="/category/Beauty" className="nav-link active">Beauty</Link></div></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><div className="dropdown-item"><Link to="/category/Toys" className="nav-link active">Toys</Link></div></li>
                            </ul>
                        </li>
                        <li className="nav-item"><Link to="/cart" className="nav-link active">Cart</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link active">About</Link></li>
                    </ul>
                    <div className="d-flex">
                        <input id="searchBar" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button onClick={()=>navigate(`/search/${getDomText()}`)} className="btn btn-outline-dark" type="button">Search</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
// footer of SPA
export function Footer(): JSX.Element {
    return (
        <div className="container-fluid">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
                    <li className="nav-item"><Link to="/about" className="nav-link px-2 text-muted">About</Link></li>
                </ul>
                <p className="text-center text-muted">Brand, Inc</p>
            </footer>
        </div>
    );
}
// about section
export function About(): JSX.Element {
    return (
        <div className="container-fluid text-center mt-2" style={{maxWidth: "770px"}}>
            <a className="py-2" href="https://github.com/MichaelT233/web"><h2>GitHub</h2></a>
            <br></br>
            <h5>Purpose</h5>
            Hobby project
            <br></br><br></br>
            <h5>Tech Stack</h5> 
            Node.js: Server runtime<br></br>
            Express.js: Web framework<br></br>
            PostgreSQL and MongoDB: Databases<br></br>
            NGINX: Web server<br></br>
            Axios: HTTP client<br></br>
            React and Bootstrap: User interface<br></br>
            Docker: Container runtime<br></br>
            Ubuntu: Operating system<br></br>
            AWS Lightsail: Virtual Private Server
        </div>
    );
}