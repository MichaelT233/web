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
        <div className="container-fluid mt-2" style={{maxWidth: "770px"}}>
            <div className="container-fluid text-center"><a className="py-2" href="https://github.com/MichaelT233/web"><h1>Github</h1></a></div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            About Me
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            My name is <strong>Michael Thiele</strong> and I have always had a passion for building things. For the past few years I have been teaching myself software engineering and now I want to make it my profession.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            About This Website
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            This website is my <strong>portfolio.</strong> I built this website in order to display what I am capable of creating. As a concept it is a mock web store/shop with dummy products and data.  
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Work Planning
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            I planned my work by writing <strong>user stories</strong> for the different features of the application. Each story describes a desired benefit or goal from the perspective of a user. For example, the product catalog's user story is "As a user I can view product offerings" and the shopping cart's user story is "As a user I can select products and the quantity I want to buy". I did not implement a checkout feature because it is beyond the scope of this project. I treated these features as the primary unit of development. I worked on one at a time and developed it start to finish from reqirements to deployment. Next, I focused on architecture.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Architecture
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            I decided to use a <strong>service oriented architecture</strong>. I divided services by the different core functionalities that will be provided to the user. My simple application has two services, products and orders. Each service is independent in that they are full stack. They each have their own database, business logic, api, and user interface. In order to compose the services into a single application on the server side an application gateway routes traffic between APIs, and on the client side a SPA (single page application) shell routes between user interfaces. After this I chose my technology stack.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Technology Stack
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            For my technology stack on the <strong>server side</strong> I chose NGINX for the application gateway, Node and Express for the API servers, MongoDB for the cart service database, and PostgreSQL for the product service database. These will be built as Docker images. An API server image and a database image for each service, plus a single application gateway image. I used Docker Compose to run and manage these images. On the <strong>client side</strong> I chose Axios for the API clients, React and React Query for the user interface components, Bootstrap for styling, and React Router for the SPA shell. I used Webpack to bundle all of the different service modules into one. Finally, the bundle is served from the application gateway under the root domain. I then focused on developing features.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                            Development
                        </button>
                    </h2>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            I began gathering <strong>requirements</strong> by deriving a set of tasks that describe how a user story's goal will be achieved. For example, the product catalog feature’s tasks are - write business logic, define database schema, define REST API, build user interface. At this point I moved onto design.
                            <br></br><br></br>
                            I started the <strong>design</strong> by creating a logical data model that defines the structure of the business data. I created a flowchart that defines the behavior of the business logic that interacts with the business data. I divided the business logic's interactions with the business data into queries and commands. That is, behaviors that read data or change data respectively. I translated these commands and queries into pseudocode alogrithms that include abstractions of data types, data structures, functions, and control flow. These algorithms will serve as the basis for the business logic code. Finally, I drew pictures of the user interface that will expose control of the commands and queries to the user. These drawings will serve as the basis for user interface components' code. Next I implemented these designs.
                            <br></br><br></br>
                            I <strong>implemented</strong> the psuedocode algorithms in Typescript syntax. For the user interface components I compared them against their associated drawing as I implemented them in TSX (Typescript with JSX) using inline CSS to style. Lastly, I implemented  a database schema based upon the logical data model and collected any necessary data. Then I tested these implementations. 
                            <br></br><br></br>
                            All <strong>testing</strong> was done locally. Unit testing was done on each command and query by comparing test input data with it's expected output. The user interface components it were unit tested visually on codepen.io. Integration testing was done at a service level in a bottom-up fashion, integrating architectural components into a whole going up from the database to the user interface.
                            - Populate database with business data
                            - Import business logic into REST API server routes
                            - Add REST API routes to client
                            - Assign control of client to user interface components
                            At this point the feature is fully integrated. System testing included the following.
                            - Add REST API route to application gateway
                            - Add user interface component routes to SPA shell
                            At this point the feature integrates into the application’s whole and it is ready to be deployed.
                            <br></br><br></br>
                            In order to  <strong>deploy</strong> the feature the following steps are taken. 
                            - update database image
                            - update server image
                            - Webpack new js bundle
                            - update gateway image, routes and js file
                            - push docker images to dockerhub
                            - pull docker images on production server
                            - add or update containers on production server
                            Now the feature is live on the production server.                        
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSeven">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                            Infrastructure
                        </button>
                    </h2>
                    <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            For the infrastructure I decided to use a <strong>cloud</strong> based approach. I chose Amazon Web Services as my cloud provider. The computing platform is an Ubuntu Elastic Compute Cloud instance. The data store is and Elastic Block Storage volume. For networking I used an Elastic Load Balancer with an TLS/SSL certificate. Lastly, I used Route 53 for DNS.
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