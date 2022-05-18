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
                            About This Website
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            This website is my <strong>portfolio</strong>. As a concept it is a mock web store/shop with imitation products and data.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Planning
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            I planned my work by writing <strong>user stories</strong> for the different features of the application. Each story describes a desired benefit or goal from the perspective of a user. For example, the product catalog's user story is "As a user I can view product offerings" and the shopping cart's user story is "As a user I can select products and the quantity I want to buy". I did not develop a checkout feature because it is beyond the scope of this project. I treated these features as the primary unit of development. I worked on one at a time and developed it from start to finish from requirements to deployment. Next, I focused on architecture.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Architecture
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Before I begin development, I need to define my application’s architecture. I decided to use a <strong>service-oriented architecture</strong>. I divided services by the different core functionalities that will be provided to the user. My simple application has two services - products, and orders. Each service is independent in that they are full stack. They each have their own database, business logic, API, and user interface. To compose the services into a single application on the server side an application gateway routes traffic between APIs, and on the client side a SPA (single page application) shell routes between user interfaces. A given feature of an application will belong only to one service. Then I began development of these features.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Features
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            I began gathering <strong>requirements</strong> by deriving a set of tasks that describe how a user story's goal will be achieved. For example, the product catalog feature’s tasks are - write business logic, define database schema, define REST API, build user interface. After gathering my requirements, I moved onto design.
                            <br></br><br></br>
                            I started the <strong>design</strong> by creating a logical data model that defines the structure of the business data. I then created a flowchart that defines the behavior of the business logic that interacts with the business data. I divided the business logic's interactions with the business data into queries and commands. That is, behaviors that read data or change data respectively. I translated these commands and queries into pseudocode algorithms that include abstractions of data types, data structures, functions, and control flow. These algorithms will serve as the basis for the business logic code. Finally, I drew pictures of the user interface that will expose control of the commands and queries to the user. These drawings will serve as the basis for the user interface components' code. Next, I implemented these designs.
                            <br></br><br></br>
                            I <strong>implemented</strong> the pseudocode algorithms as business logic code, the user interface components as UI code, and the logical data model as a database schema. I also collected any necessary business data. For my technology stack on the <strong>server side</strong>, I chose NGINX for the application gateway, Node and Express for the API servers, MongoDB for the cart service database, and PostgreSQL for the product service database. These will be built as Docker images. An API server image and a database image for each service, plus a single application gateway image. I used Docker Compose to run and manage these images. On the <strong>client side</strong> I chose Axios for the API clients, React along with React Query for the user interface components, Bootstrap for styling, and React Router for the SPA shell. I used Webpack to bundle all the different service modules into one. Finally, the bundle is served from the application gateway under the root domain. Then I tested these implementations.
                            <br></br><br></br>
                            All <strong>testing</strong> was done locally. Unit testing was done on each business logic command and query by comparing test input data with its expected output. The user interface components were unit tested visually on codepen.io. Integration testing was done at a service level in a bottom-up fashion, integrating architectural components into a whole going up from the database to the user interface.
                            <br></br>
                            - Populate test database with business data
                            <br></br>
                            - Add REST API routers to server and import business logic
                            <br></br>
                            - Add REST API routes to client
                            <br></br>
                            - Assign control of client to user interface components
                            <br></br>
                            At this point the feature is fully integrated. System testing included the following.
                            <br></br>
                            - Add REST API route to test gateway
                            <br></br>
                            - Add user interface component routes to test SPA shell
                            <br></br>
                            At this point the feature integrates into the application’s whole. For a final acceptance test I performed every possible user interaction with the feature and its related components. If no errors or bugs occurred, then I built a new API server image and a new JavaScript bundle file which both incorporate the new feature. These now need to be deployed to a production environment.
                            <br></br><br></br>
                            In order to <strong>deploy</strong> the feature into the production environment these steps are taken. First, populate the database container with new data. Second, update the API server container. Lastly, update the gateway container’s API routes and replace it’s JavaScript bundle file. After this the feature is live on the production server.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Infrastructure
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            For the infrastructure I decided to use a <strong>cloud-based</strong> approach. I chose Amazon Web Services as my cloud provider. The computing platform is an Ubuntu Elastic Compute Cloud instance, and its storage is an Elastic Block Storage volume. I used Route 53 for DNS. Lastly, for networking I used an Elastic Load Balancer with an TLS/SSL certificate for my registered domain.
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