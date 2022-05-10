// react components for the order service

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useIsFetching, useMutation, isError } from "react-query";
import { OrderClient } from "../api/restClient.js"
import { ProductClient } from "../../product-client/api/restClient.js"
import { Spinner } from "../../product-client/ui/component.js"
import { CartItem } from "../../product-client/api/restClient.js";

const orderClient = new OrderClient();
const productClient = new ProductClient();

const CartContext = React.createContext(null);

// individual product
export function Item(): JSX.Element {
    let { id } = useParams();
    const { isLoading, isFetching, error, data} = useQuery(id, ()=>productClient.getProduct(id))
    const add = useMutation(mutation);
    const queryClient = useQueryClient();
    // get quantity from add to cart quantity selector
    function getDomQuantity(): number {
        const quantity: number = Number((document.getElementById("quantity") as HTMLInputElement).value);
        return quantity;
    }
    async function mutation(quantity: number): Promise<boolean> {
        const result = await orderClient.addItem(id, quantity);
        queryClient.refetchQueries(id);
        return result;
    }
    if (isLoading || isFetching || add.isLoading) return <Spinner />;
    if (error || data === null || add.data == false || add.error) return <div>Error</div>;
    if (add.data == true) {
        return (
            <div className="my-5 text-center">
                <h2 className="mb-3">Added to cart!</h2>
                <Link to="/cart" className="btn btn-outline-dark" type="button">Go to cart</Link>
            </div>
        );
    }
    return(
        <div className="container-fluid">
            <div className="row border-bottom border-muted">
                <div className="col-md d-flex align-items-center justify-content-center bg-light px-3 w-100 mt-1" style={{height: "400px"}}>    
                    <img className="rounded" src={data.image_path} style={{height: "300px", width:"300px"}}/>
                </div>
                <div className="col-md rounded d-flex align-items-center">
                    <div className="mt-1">
                        <h5>{data.title}</h5>
                        <p>${data.price}</p>
                        <p>{data.stock} in stock</p>
                    </div>        
                </div>
                <div className="col-md-2 rounded d-flex align-items-center border border-muted border-bottom-0">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" min="1" defaultValue="1" className="form-control" id="quantity" aria-describedby="quantity"/>
                        </div>
                        <button className="btn btn-outline-dark mb-2" type="button" onClick={(quantity)=>add.mutate(getDomQuantity())}>Add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

// listing of cart products and their quantities
export function CartListing(): JSX.Element {
    const queryClient = useQueryClient();
    async function mutation(id: string): Promise<boolean> {
        const result = await orderClient.deleteItem(id);
        queryClient.refetchQueries("cart");
        return result;
    }
    const { isLoading, isFetching, error, data } = useQuery("cart", ()=>productClient.getCartItems());
    const del = useMutation((id: string)=>mutation(id));
    if (isLoading || isFetching || del.isLoading ) return <Spinner />;
    if (error || del.error || del.data == false) return <div>Error</div>;
    if (data === null) {
        return (
            <div className="my-5 text-center">
                <h2 className="mb-3">Cart is empty!</h2>
            </div>
        );
    }
    const entryCount = data.length;
    const rows: CartItem[][] = [];
    // if single product
    if (entryCount == 1) {
        const singleRow: CartItem[] = [{product: data[0].product, quantity: data[0].quantity}];
        rows.push(singleRow);
    }
    // if multiple products
    else {
        var i = 0;
        // iterate array
        while (i  < (entryCount)) {
            // if on last element
            if (i == (entryCount - 1)) {
                // insert single product and exit while loop;
                const singleRow: CartItem[] = [{product: data[i].product, quantity: data[i].quantity}];
                rows.push(singleRow);
                break;
            }
            // insert current pair of products
            const row: CartItem[] = [{product: data[i].product, quantity: data[i].quantity}, {product: data[i+1].product, quantity: data[i+1].quantity}]
            rows.push(row);
            // move index up by two
            i += 2;
        }
    }
    const listing = rows.map((row: CartItem[]): JSX.Element =>
        <div className="row" key={`row${row[0].product.id}`}>
            {row.map((cartItem: CartItem): JSX.Element => <CartEntry {...cartItem} key={cartItem.product.id}/>)}
        </div>
    );
    return (
        <CartContext.Provider value={{del}}>
            <div className="container-fluid">
                <div className="row flex-row-reverse">
                    <div className="col-md-3 p-0">
                        <div className="border border-muted rounded position-relative mx-0 my-1 text-center">
                            <Link to="/about" className="btn btn-outline-dark py-2 my-4 w-75 position absolute top-0" type="button">Proceed to checkout</Link>
                        </div>
                    </div>
                    <div className="col-md">{listing}</div>
                </div>
            </div>
        </CartContext.Provider>
    );
}

// entry of cart listing
function CartEntry(cartItem: CartItem): JSX.Element {
    const context = React.useContext(CartContext);
    const product = cartItem.product;
    const quantity = cartItem.quantity;
    async function handleClick() {
        context.del.mutate(product.id);
    }
    return (
        <div className="col-md border border-muted rounded mx-0 my-1 d-flex align-items-center text-dark">
            <div className="d-flex align-items-center justify-content-center bg-light px-3" style={{height:"270px", width: "270px"}}>
                <img className="rounded" src={product.image_path} style={{width:"200px"}}/>
            </div>
            <div className="ms-3 w-50 h-100 position-relative">
                <div className="d-flex flex-column align-items-start my-2">
                    <h6>{product.title}</h6>
                    <p>${product.price}</p>
                    <p>{product.stock} in stock</p>
                    <p>Quantity: {quantity}</p>
                </div>
                <button className="btn btn-outline-dark position-absolute bottom-0 start-0 mb-4" type="button" onClick={handleClick}>Delete</button>
            </div>
        </div>
    );
}