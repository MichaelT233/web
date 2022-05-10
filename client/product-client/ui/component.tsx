// react components for the product service

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductClient } from "../api/restClient.js"
import { Product } from "../../../server/product-server/business-logic/catalog.js"

const client = new ProductClient(); 

// category product listing
export function Category(): JSX.Element {
    let { category } = useParams();
    const { isLoading, isFetching, error, data } = useQuery(category, ()=>client.getCategory(category));
    if (isLoading || isFetching) return <Spinner />;
    if (error || (data === null)) return <div>Error</div>;
    return (
        <CatalogListing {...data}/>
    );
}
// featured product listing
export function Featured(): JSX.Element {
    const { isLoading, isFetching, error, data } = useQuery('featured', ()=>client.getFeatured());
    if (isLoading || isFetching) return <Spinner />;
    if (error || (data === null)) return <div>Error</div>;
    return (
        <CatalogListing {...data}/>
    );
}
// search product listing
export function Search(): JSX.Element {
    let { text } = useParams();
    const { isLoading, isFetching, error, data } = useQuery(text, ()=>client.getSearch(text));
    if (isLoading || isFetching) return <Spinner />;
    if (error || (data === null)) return <div>Error</div>;
    return (
        <CatalogListing {...data}/>
    );
}

// a listing of products
function CatalogListing(products: Product[]): JSX.Element {
    const entryCount = Object.keys(products).length;
    const rows: Product[][] = [];
    // if single product
    if (entryCount == 1) {
        rows.push([products[0]]);
    }
    // if multiple products
    else {
        var i = 0;
        // iterate array
        while (i  < (entryCount)) {
            // if on last element
            if (i == (entryCount - 1)) {
                // insert single product and exit while loop;
                rows.push([products[i]]);
                break;
            }
            // insert current pair of products
            rows.push([products[i], products[i + 1]])
            // move index up by two
            i += 2;
        }
    }
    const listing = rows.map((row: Product[]): JSX.Element =>
        <div className="row" key={`row${row[0].id}`}>
            {row.map((product: Product): JSX.Element => <CatalogEntry {...product} key={product.id}/>)}
        </div>
    );
    return (
        <div className="container-fluid">
            {listing}
        </div>
    );
}
// entry within listing
function CatalogEntry(product: Product): JSX.Element {
    return (
        <div className="col-md border border-muted rounded mx-0 my-1 p-0 d-flex align-items-center text-dark">
            <div className="d-flex align-items-center justify-content-center bg-light px-3" style={{height:"270px", width: "270px"}}>
                <img className="rounded" src={product.image_path} style={{height:"200px", width:"200px"}}/>
            </div>
            <div className="ms-3 w-50 h-100 position-relative">
                <div className="d-flex flex-column align-items-start my-2">
                    <h6>{product.title}</h6>
                    <p>${product.price}</p>
                    <p>{product.stock} in stock</p>
                </div>
                <Link to={`/item/${product.id}`} className="btn btn-outline-dark position-absolute bottom-0 start-0 mb-4" type="button">View</Link>
            </div>
        </div>
    );
}
// loading animation
export function Spinner(): JSX.Element {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-dark my-5" role="status" style={{width: "200px", height: "200px"}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}