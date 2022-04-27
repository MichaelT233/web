import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { RestClient } from "../api/restClient"

const restClient = new RestClient(); 

export function Item() {
    let { id } = useParams();
    const { isLoading, error, data } = useQuery(id, ()=>restClient.getProduct(id))
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return(
        <div className="container-fluid">
            <div className="row border-bottom border-muted">
                <div className="col-md d-flex align-items-center justify-content-center bg-light px-3 w-100 mt-1" style={{height: "400px"}}>    
                    <img className="rounded img-fluid h-auto" src={data.image_path} style={{width:"200px"}}/>
                </div>
                <div className="col-md rounded d-flex align-items-center">
                    <div className="mt-1">
                        <h5 className="border-bottom border-muted">{data.title}</h5>
                        <p className="border-top border-muted">{data.price}</p>
                        <p className="border-top border-muted">{data.stock}</p>
                    </div>        
                </div>
                <div className="col-md-2 rounded d-flex align-items-center border border-muted border-bottom-0">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" min="1" defaultValue ="1" className="form-control" id="quantity" aria-describedby="quantity"/>
                        </div>
                        <button className="btn btn-outline-dark" type="submit">Add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export function Category() {
    let { category } = useParams();
    const { isLoading, error, data } = useQuery(category, ()=>restClient.getCategory(category));
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <Listing {...data} />
    );
}
export function Featured() {
    const { isLoading, error, data } = useQuery('featured', ()=>restClient.getFeatured());
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <Listing {...data}/>
    );
}
export function Search() {
    let { text } = useParams();
    const { isLoading, error, data } = useQuery(text, ()=>restClient.getSearch(text));
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <Listing {...data}/>
    );
}

function Listing(props) {
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
function ListingEntry(props) {
    return (
        <Link to={`/item/${props.id}`}>
            <div className="col-md border border-muted rounded m-1 d-flex align-items-center text-dark">
                <div className="d-flex align-items-center justify-content-center bg-light px-3" style={{height:"270px", width: "270px"}}>
                    <img className="rounded img-fluid h-auto" src={props.image_path} style={{width:"200px"}}/>
                </div>
                <div className="ms-3 w-50">
                    <h5>{props.title}</h5>
                    <p>${props.price}</p>
                    <p>{props.stock} in stock</p>
                </div>
            </div>
        </Link>
    );
}