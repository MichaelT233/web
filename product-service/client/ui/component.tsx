import * as React from "react";

type Props = {
    id: string;
    stock: number;
    category: string;
    title: string;
    price: number;
    featured: boolean;
    imagePath: string;
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