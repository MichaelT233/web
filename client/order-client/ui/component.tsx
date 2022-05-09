import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useIsFetching, useMutation, isError } from "react-query";
import { OrderClient } from "../api/restClient.js"
import { ProductClient } from "../../product-client/api/restClient.js"
import { Spinner } from "../../product-client/ui/component.js"

const orderClient = new OrderClient();
const productClient = new ProductClient();

const CountContext = React.createContext(null);

export function Item() {
    let { id } = useParams();
    const { isLoading, isFetching, error, data} = useQuery(id, ()=>productClient.getProduct(id))
    const add = useMutation(mutation);
    const queryClient = useQueryClient();
    function getDomQuantity() {
        const quantity = Number((document.getElementById("quantity") as HTMLInputElement).value);
        return quantity;
    }
    async function mutation(quantity: number) {
        const status = await orderClient.addItem(id, quantity);
        queryClient.refetchQueries(id);
        return status;
    }
    if (isLoading || isFetching || add.isLoading) return <Spinner />;
    if (error || add.error) return <div>Error</div>;
    if (add.data == 200) {
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
export function CartListing() {
    const queryClient = useQueryClient();
    async function mutation(id: string) {
        await orderClient.deleteItem(id);
        queryClient.refetchQueries("cart");
    }
    const { isLoading, isFetching, error, data } = useQuery("cart", ()=>productClient.getCartProducts());
    const del = useMutation((id: string)=>mutation(id));
    if (isLoading || isFetching || del.isLoading ) return <Spinner />;
    if (error || del.error) return <div>Error</div>;
    if (data == false) {
        return (
            <div className="my-5 text-center">
                <h2 className="mb-3">Cart is empty!</h2>
            </div>
        );
    }
    //const products = data.products;
    //const quantities = data.quantities;
    const entryCount = data.length;
    const rows= [];
    // if single product
    if (entryCount == 1) {
        rows.push([{product: data[0].product, quantity: data[0].quantity}]);
    }
    // if multiple products
    else {
        var i = 0;
        // iterate array
        while (i  < (entryCount)) {
            // if on last element
            if (i == (entryCount - 1)) {
                // insert single product and exit while loop;
                rows.push([{product: data[i].product, quantity: data[i].quantity}]);
                break;
            }
            // insert current pair of products
            rows.push([{product: data[i].product, quantity: data[i].quantity}, {product: data[i+1].product, quantity: data[i+1].quantity}]);
            // move index up by two
            i += 2;
        }
    }
    const listing = rows.map((row)=>
        <div className="row" key={`row${row[0].product.id}`}>
            {row.map((data)=><CartEntry data={data.product} quantity={data.quantity} key={data.product.id}/>)}
        </div>
    );
    return (
        <CountContext.Provider value={{del}}>
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
        </CountContext.Provider>
    );
}
function CartEntry(props) {
    const context = React.useContext(CountContext);
    const product = props.data;
    const quantity = props.quantity;
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