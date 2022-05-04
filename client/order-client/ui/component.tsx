import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useIsFetching, useMutation } from "react-query";
import { OrderClient } from "../api/restClient.js"
import { ProductClient } from "../../product-client/api/restClient.js"
import { Spinner } from "../../product-client/ui/component.js"

const orderClient = new OrderClient();
const productClient = new ProductClient();

const CountContext = React.createContext(null);

export function Item() {
    let { id } = useParams();
    const { isLoading: productLoad, error: productError, data: productData} = useQuery(id, ()=>productClient.getProduct(id))
    const add = useMutation(mutation);
    const queryClient = useQueryClient();
    function getDomQuantity() {
        const quantity = Number((document.getElementById("quantity") as HTMLInputElement).value);
        return quantity;
    }
    async function mutation(quantity: number) {
        await orderClient.addItem("test", id, quantity);
        queryClient.refetchQueries(id);
    }
    if (productLoad || add.isLoading) return <Spinner />;
    if (productError || add.error) return <div>Error</div>;
    const data = productData;
    return(
        <div className="container-fluid">
            <div className="row border-bottom border-muted">
                <div className="col-md d-flex align-items-center justify-content-center bg-light px-3 w-100 mt-1" style={{height: "400px"}}>    
                    <img className="rounded img-fluid h-auto" src={data.image_path} style={{width:"300px"}}/>
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
    if (data == false) return <div>Cart is empty</div>
    const products = data.products;
    const quantities = data.quantities;
    return (
        <CountContext.Provider value={{token, del}}>
            <div className="container-fluid">
                <div className="row">
                    {products.length > 0 && <CartEntry data={products[0]} quantity={quantities[0]}/>}
                    {products.length > 1 && <CartEntry data={products[1]} quantity={quantities[1]}/>}
                </div>
                <div className="row">
                    {products.length > 2 && <CartEntry data={products[2]} quantity={quantities[2]}/>}
                    {products.length > 3 && <CartEntry data={products[3]} quantity={quantities[3]}/>}
                </div>
                <div className="row">
                    {products.length > 4 && <CartEntry data={products[4]} quantity={quantities[4]}/>}
                    {products.length > 5 && <CartEntry data={products[5]} quantity={quantities[5]}/>}
                </div>
                <div className="row">
                    {products.length > 6 && <CartEntry data={products[6]} quantity={quantities[6]}/>}
                    {products.length > 7 && <CartEntry data={products[7]} quantity={quantities[7]}/>}
                </div>
                <div className="row">
                    {products.length > 8 && <CartEntry data={products[8]} quantity={quantities[8]}/>}
                    {products.length > 9 && <CartEntry data={products[9]} quantity={quantities[9]}/>}
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
        <div className="col-md border border-muted rounded m-1 d-flex align-items-center text-dark">
            <div className="d-flex align-items-center justify-content-center bg-light px-3" style={{height:"270px", width: "270px"}}>
                <img className="rounded img-fluid h-auto" src={product.image_path} style={{width:"200px"}}/>
            </div>
            <div className="ms-3 w-50">
                <h5>{product.title}</h5>
                <p>${product.price}</p>
                <p>{product.stock} in stock</p>
                <p>quantity: {quantity}</p>
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