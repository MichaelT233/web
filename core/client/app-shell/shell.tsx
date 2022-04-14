import * as React from "react";
function Header() {
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
                                <li><div className="dropdown-item" onClick={()=>store.dispatch({type:"clickCategory", params:["featured", "TRUE"]})}>Featured</div></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><div className="dropdown-item" onClick={()=>store.dispatch({type:"clickCategory", params:["category", "Home Decor"]})}>Home Decor</div></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><div className="dropdown-item" onClick={()=>store.dispatch({type:"clickCategory", params:["category", "Beauty"]})}>Beauty</div></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><div className="dropdown-item" onClick={()=>store.dispatch({type:"clickCategory", params:["category", "Toys"]})}>Toys</div></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input id="searchBar" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-dark" type="button" onClick={()=>store.dispatch({type:"search",params:["title", (document.getElementById("searchBar") as HTMLInputElement).value]})}>Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}