import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductClient } from "../api/restClient.js"

const client = new ProductClient(); 

export function Category() {
    let { category } = useParams();
    const { isLoading, error, data } = useQuery(category, ()=>client.getCategory(category));
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <CatalogListing data={data}/>
    );
}
export function Featured() {
    const { isLoading, error, data } = useQuery('featured', ()=>client.getFeatured());
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <CatalogListing data={data}/>
    );
}
export function Search() {
    let { text } = useParams();
    const { isLoading, error, data } = useQuery(text, ()=>client.getSearch(text));
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <CatalogListing data={data}/>
    );
}

function CatalogListing(props) {
    const data = props.data;
    const entryCount = data.length;
    return (
        <div className="container-fluid">
            <div className="row">
                <CatalogEntry data={data[0]}/>
                {entryCount > 1 && <CatalogEntry data={data[1]}/>}
            </div>
            <div className="row">
                {entryCount > 2 && <CatalogEntry data={data[2]}/>}
                {entryCount > 3 && <CatalogEntry data={data[3]}/>}
            </div>
            <div className="row">
                {entryCount > 4 && <CatalogEntry data={data[4]}/>}
                {entryCount > 5 && <CatalogEntry data={data[5]}/>}
            </div>
            <div className="row">
                {entryCount > 6 && <CatalogEntry data={data[6]}/>}
                {entryCount > 7 && <CatalogEntry data={data[7]}/>}
            </div>
            <div className="row">
                {entryCount > 8 && <CatalogEntry data={data[8]}/>}
                {entryCount > 9 && <CatalogEntry data={data[9]}/>}
            </div>
        </div>
    );
}
function CatalogEntry(props) {
    const data = props.data;
    return (
        <div className="col-md border border-muted rounded m-1 d-flex align-items-center text-dark">
            <div className="d-flex align-items-center justify-content-center bg-light px-3" style={{height:"270px", width: "270px"}}>
                <img className="rounded img-fluid h-auto" src={data.image_path} style={{width:"200px"}}/>
            </div>
            <div className="ms-3 w-50">
                <h5>{data.title}</h5>
                <p>${data.price}</p>
                <p>{data.stock} in stock</p>
                <Link to={`/item/${data.id}`} className="btn btn-outline-dark" type="button">View</Link>
            </div>
        </div>
    );
}