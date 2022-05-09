import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductClient } from "../api/restClient.js"

const client = new ProductClient(); 

export function Category() {
    let { category } = useParams();
    const { isLoading, isFetching, error, data } = useQuery(category, ()=>client.getCategory(category));
    if (isLoading || isFetching) return <Spinner />;
    if (error) return <div>Error</div>;
    return (
        <CatalogListing data={data}/>
    );
}
export function Featured() {
    const { isLoading, isFetching, error, data } = useQuery('featured', ()=>client.getFeatured());
    if (isLoading || isFetching) return <Spinner />;
    if (error) return <div>Error</div>;
    return (
        <CatalogListing data={data}/>
    );
}
export function Search() {
    let { text } = useParams();
    const { isLoading, isFetching, error, data } = useQuery(text, ()=>client.getSearch(text));
    if (isLoading || isFetching) return <Spinner />;
    if (error) return <div>Error</div>;
    return (
        <CatalogListing data={data}/>
    );
}

function CatalogListing(props) {
    const data = props.data;
    const entryCount = data.length;
    const rows= [];
    // if single product
    if (entryCount == 1) {
        rows.push([data[0]]);
    }
    // if multiple products
    else {
        var i = 0;
        // iterate array
        while (i  < (entryCount)) {
            // if on last element
            if (i == (entryCount - 1)) {
                // insert single product and exit while loop;
                rows.push([data[i]]);
                break;
            }
            // insert current pair of products
            rows.push([data[i], data[i + 1]])
            // move index up by two
            i += 2;
        }
    }
    const listing = rows.map((row)=>
        <div className="row" key={`row${row[0].id}`}>
            {row.map((data)=><CatalogEntry data={data} key={data.id}/>)}
        </div>
    );
    return (
        <div className="container-fluid">
            {listing}
        </div>
    );
}
function CatalogEntry(props) {
    const data = props.data;
    return (
        <div className="col-md border border-muted rounded mx-0 my-1 p-0 d-flex align-items-center text-dark">
            <div className="d-flex align-items-center justify-content-center bg-light px-3" style={{height:"270px", width: "270px"}}>
                <img className="rounded" src={data.image_path} style={{height:"200px", width:"200px"}}/>
            </div>
            <div className="ms-3 w-50 h-100 position-relative">
                <div className="d-flex flex-column align-items-start my-2">
                    <h6>{data.title}</h6>
                    <p>${data.price}</p>
                    <p>{data.stock} in stock</p>
                </div>
                <Link to={`/item/${data.id}`} className="btn btn-outline-dark position-absolute bottom-0 start-0 mb-4" type="button">View</Link>
            </div>
        </div>
    );
}
export function Spinner() {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-dark my-5" role="status" style={{width: "200px", height: "200px"}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}