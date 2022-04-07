import { createStore } from "redux"
import * as React from "react";
import * as ReactDOM from "react-dom";

var state = {view: "listing", params: ["featured", "TRUE"]};
let store = createStore(Subject, state);
store.subscribe(()=>Observer(store.getState()))
window.onload = () => {
    ReactDOM.render(<Header/>, document.getElementById("header"));
    store.dispatch({type: "load", component: "listing", params: ["featured", "TRUE"]});
}

type State = {
    view: string;
    params: string[];
}
type Action = {
    type: string;
    params: string[];
}
function Subject(state: State, action: Action): State {
    console.log("call subject, action = "+JSON.stringify(action))
    switch (action.type) {
        case "load":
            state.view = "listing";
            break;
        case "clickProduct":
            state.view = "single";
            break;
        case "search":
            state.view = "listing";
            break;
        case "clickCategory":
            state.view = "listing";
            break;
    }
    state.params = action.params;
    return state;
}
async function Observer(state: State): Promise<void> {
    console.log("call observer, state = "+JSON.stringify(state));
    const root = document.getElementById("view");
    const query: Query = {field: state.params[0], value: state.params[1]};
    const props: Props[] = await fetchProps(query);
    switch (state.view) {
        case "single":
            ReactDOM.render(<Single {...props[0]}/>, root);
            break;
        case "listing":
            ReactDOM.render(<Listing {...props}/>, root)
            break;
    }
}

type Props = {
    id: string;
    stock: number;
    category: string;
    title: string;
    price: number;
    featured: boolean;
    imagePath: string;
}
type Query = {
    field: string;
    value: string;
}
async function fetchProps(query: Query): Promise<Props[]> {
    const response = await fetch(`/product-api/search?f=${query.field}&v=${query.value}`);
    const rowArray = await response.json();
    var props: Props[];
    props = [];
    var entry: Props;
    for (const row of rowArray) {
        entry = {
            id: row.id,
            stock: row.stock,
            category: row.category,
            title: row.title,
            price: row.price,
            featured: row.featured,
            imagePath: row.image_path
        }
        props.push(entry)
    }
    return props;
}
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
function Single(props: Props) {
    return(
        <div className="container-fluid">
            <div className="row border-bottom border-muted">
                <div className="col-md d-flex align-items-center justify-content-center bg-light px-3 w-100 mt-1" style={{height: "400px"}}>    
                    <img className="rounded img-fluid h-auto" src={props.imagePath} style={{width:"200px"}}/>
                </div>
                <div className="col-md rounded d-flex align-items-center">
                    <div className="mt-1">
                        <h5 className="border-bottom border-muted">{props.title}</h5>
                        <p className="border-top border-muted">{props.price}</p>
                        <p className="border-top border-muted">{props.stock}</p>
                    </div>        
                </div>
                <div className="col-md-2 rounded d-flex align-items-center border border-muted border-bottom-0">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" min="1" value ="1" className="form-control" id="quantity" aria-describedby="quantity"/>
                        </div>
                        <button className="btn btn-outline-dark" type="submit" onClick={()=>store.dispatch({type: "test", component: "cart", params: ["featured", "TRUE"]})}>Add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
function Listing(props: Props[]) {
    const entryCount = Object.keys(props).length;
    return (
        <div className="container-fluid">
            <div className="row">
                <ListingEntry {...props[0]}/>
                {entryCount > 1 && <ListingEntry {...props[1]}/>}
            </div>
            <div className="row">
                {entryCount > 2 && <ListingEntry {...props[2]}/>}
                {entryCount > 3 && <ListingEntry {...props[3]}/>}
            </div>
            <div className="row">
                {entryCount > 4 && <ListingEntry {...props[4]}/>}
                {entryCount > 5 && <ListingEntry {...props[5]}/>}
            </div>
            <div className="row">
                {entryCount > 6 && <ListingEntry {...props[6]}/>}
                {entryCount > 7 && <ListingEntry {...props[7]}/>}
            </div>
            <div className="row">
                {entryCount > 8 && <ListingEntry {...props[8]}/>}
                {entryCount > 9 && <ListingEntry {...props[9]}/>}
            </div>
        </div>
    );
}
function ListingEntry(props: Props) {
    return (
        <div className="col-md border border-muted rounded m-1 d-flex align-items-center text-dark" onClick={()=>store.dispatch({type: "clickProduct", params: ["id", props.id]})}>
            <div className="d-flex align-items-center justify-content-center bg-light px-3" style={{height:"270px", width: "270px"}}>
                <img className="rounded img-fluid h-auto" src={props.imagePath} style={{width:"200px"}}/>
            </div>
            <div className="ms-3 w-50">
                <h5>{props.title}</h5>
                <p>${props.price}</p>
                <p>{props.stock} in stock</p>
            </div>
        </div>
    );
}