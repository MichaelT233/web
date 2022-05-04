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
        const status = await orderClient.addItem("test", id, quantity);
        queryClient.refetchQueries(id);
        return status;
    }
    if (isLoading || isFetching || add.isLoading) return <Spinner />;
    if (error || add.error) return <div>Error</div>;
    if (add.data == 200) {
        return (
            <div className="my-5 text-center">
                <h2 className="mb-3">Added to cart!</h2>
                <Link to="/cart/test" className="btn btn-outline-dark" type="button">Go to cart</Link>
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
                        <button className="btn btn-outline-dark" type="button" onClick={(quantity)=>add.mutate(getDomQuantity())}>Add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export function CartListing() {
    let { token } = useParams();
    const queryClient = useQueryClient();
    async function mutation(id: string) {
        await orderClient.deleteItem(token, id);
        queryClient.refetchQueries(token);
    }
    const { isLoading, isFetching, error, data } = useQuery(token, ()=>productClient.getCartProducts(token));
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
        <CountContext.Provider value={{token, del}}>
            <div className="container-fluid">
                {listing}
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
        <div className="col-md border border-muted rounded m-1 d-flex align-items-center text-dark">
            <div className="d-flex align-items-center justify-content-center bg-light px-3" style={{height:"270px", width: "270px"}}>
                <img className="rounded" src={product.image_path} style={{width:"200px"}}/>
            </div>
            <div className="ms-3 w-50">
                <h5>{product.title}</h5>
                <p>${product.price}</p>
                <p>{product.stock} in stock</p>
                <p>Quantity: {quantity}</p>
                <button className="btn btn-outline-dark" type="button" onClick={handleClick}>Delete</button>
            </div>
        </div>
    );
}

function CartBlah() {
    <div className="row flex-row-reverse">
        <div className="col-md-3 border border-muted rounded m-1 ms-0">
            <h5 className="mt-1">Total</h5>
            <a className="d-grid text-decoration-none" href="/checkout">
                <button className="btn btn-outline-dark mb-2" type="button">Proceed to checkout</button>
            </a>
        </div>
        <div className="col-md">
            <div className="border border-muted rounded m-1">
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center bg-light px-3 w-100" style={{height: "270px"}}>
                        <img className="rounded img-fluid h-75" src="https://picsum.photos/100"/>
                    </div>
                    <div className="ms-3 d-inline-block">
                        <h5>Title</h5>
                        <p>Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        <p>Price</p>
                        <p>Stock</p>
                    </div>
                </div>
                <div className=" mt-2 mb-4">
                    <button className="btn btn-outline-dark ms-4" type="submit">--</button>
                    <input type="number" min="1" value ="1" className="form-control d-inline-block text-center align-middle" id="quantity" aria-describedby="quantity" style={{width: "20%"}} disabled/>
                    <button className="btn btn-outline-dark" type="submit">+</button>
                    <button className="btn btn-outline-dark ms-4" type="submit">Delete</button>
                </div>
            </div>
            <div className="border border-muted rounded m-1">
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center bg-light px-3 w-100" style={{height: "270px"}}>
                        <img className="rounded img-fluid h-75" src="https://picsum.photos/100"/>
                    </div>
                    <div className="ms-3 d-inline-block">
                        <h5>Title</h5>
                        <p>Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        <p>Price</p>
                        <p>Stock</p>
                    </div>
                </div>
                <div className=" mt-2 mb-4">
                    <button className="btn btn-outline-dark ms-4" type="submit">--</button>
                    <input type="number" min="1" value ="1" className="form-control d-inline-block text-center align-middle" id="quantity" aria-describedby="quantity" style={{width: "20%"}} disabled/>
                    <button className="btn btn-outline-dark" type="submit">+</button>
                    <button className="btn btn-outline-dark ms-4" type="submit">Delete</button>
                </div>
            </div>
            <div className="border border-muted rounded m-1">
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center bg-light px-3 w-100" style={{height: "270px"}}>
                        <img className="rounded img-fluid h-75" src="https://picsum.photos/100"/>
                    </div>
                    <div className="ms-3 d-inline-block">
                        <h5>Title</h5>
                        <p>Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        <p>Price</p>
                        <p>Stock</p>
                    </div>
                </div>
                <div className=" mt-2 mb-4">
                    <button className="btn btn-outline-dark ms-4" type="submit">--</button>
                    <input type="number" min="1" value ="1" className="form-control d-inline-block text-center align-middle" id="quantity" aria-describedby="quantity" style={{width: "20%"}} disabled/>
                    <button className="btn btn-outline-dark" type="submit">+</button>
                    <button className="btn btn-outline-dark ms-4" type="submit">Delete</button>
                </div>
            </div>
        </div>
    </div>
}