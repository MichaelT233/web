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
                <div className="navbar-brand">Michael Thiele</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to="/about" className="nav-link active">About</Link></li>
                        <li className="nav-item"><Link to="/contact" className="nav-link active">Contact</Link></li>
                        <li className="nav-item"><Link to="/cart" className="nav-link active">Cart</Link></li>
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
                    <li className="nav-item"><Link to="/about" className="nav-link px-2 text-muted">About</Link></li>
                    <li className="nav-item"><Link to="/contact" className="nav-link px-2 text-muted">Contact</Link></li>
                </ul>
                <p className="text-center text-muted">Michael Thiele</p>
            </footer>
        </div>
    );
}
// about section
export function About(): JSX.Element {
    return (
        <div className="container-fluid mt-2 text-center" style={{maxWidth: "770px"}}>
            <a className="py-2" href="https://github.com/MichaelT233/web"><h1>Github</h1></a>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            About me
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>My name is Michael Thiele</strong> and I have always had a passion for building things. For the past few years I have been teaching myself software engineering and now I want to make it my profession.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            About this website
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This website is my portfolio.</strong> I built this website in order to display what I am capable of creating. As a concept it is a mock web store/shop with dummy products and data.  
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            About the design
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>My design process began by defining a simple top-level business model of a store that contains it's different business domains.</strong> For my simple project, those are inventory/products and sales/order. Then within each of these domains I defined use cases which mapped to feature sets. For example the product domain has a catalog feature and the order domain has a shopping cart feature. Then for each use case/feature I defined a business process model and a data model that realize the functionality of it's real world equivalent. These translated to requirments of each feature's data and it's operations on that data. Then for the systems architectural style I used a microservices style where each microservice is a business domain. Finally, for the systems architectural pattern I used a multi-tier client server pattern that includes a "core" to both the client and the server that aggregates the multiple microservices into a single system.<br></br><br></br>
                            <strong>Client</strong><br></br>&emsp;<strong>Core</strong><br></br>&emsp;&emsp;Router<br></br>&emsp;&emsp;User Interface Shell<br></br>&emsp;<strong>Microservice</strong><br></br>&emsp;&emsp;User Interface<br></br>&emsp;&emsp;API Consumer<br></br><strong>Server</strong><br></br>&emsp;<strong>Core</strong><br></br>&emsp;&emsp;Gateway<br></br>&emsp;<strong>Microservice</strong><br></br>&emsp;&emsp;API Provider<br></br>&emsp;&emsp;Business logic<br></br>&emsp;&emsp;Database<br></br><br></br>
                            Where the previously mentioned business process models equate to the business logic tier and the data models equate to the database tier.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            About the technology
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>I chose technologies by tier of the systems architecture.</strong> This is the stack I chose.<br></br><br></br>
                            <strong>Client</strong><br></br>&emsp;<strong>Core</strong><br></br>&emsp;&emsp;Router - React Router<br></br>&emsp;&emsp;User Interface Shell - React<br></br>&emsp;<strong>Microservice</strong><br></br>&emsp;&emsp;User Interface - React + React Query<br></br>&emsp;&emsp;API Consumer - Axios<br></br><strong>Server</strong><br></br>&emsp;<strong>Core</strong><br></br>&emsp;&emsp;Gateway - NGINX<br></br>&emsp;<strong>Microservice</strong><br></br>&emsp;&emsp;API Provider - Express<br></br>&emsp;&emsp;Business logic - Typescript itself<br></br>&emsp;&emsp;Database - PostgreSQL(Product Service) MongoDB(Order Service)<br></br><br></br>
                            On the server side I containerized the gateway and databases as their own containers using Docker, as well as the API Providers with their Business Logic as single Node containers. Then I orchestrated these containers as a system whole using Docker Compose where the gateway is a single endpoint routing to all microservice API Providers. On the client side all of the tiers are bundled using Webpack. Routing between microservices' User Interfaces is done within the User Interface Shell using React Router. 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
// contact section
export function Contact(): JSX.Element {
    return (
        <div className="container-fluid text-center">
            <h5 className="py-4">Email me at</h5>
            <h3 className="text-decoration-underline">michaelthiele673@gmail.com</h3>
        </div>
    );
}