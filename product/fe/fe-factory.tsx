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

interface ProductUI {
    element: any;
    props: Props[];
}

export class ProductUIFactory {
    async createSingle(id: string) {
        const single = new Single();
        await single.init(id);
        return single.element;
    }
    //createListing(category, search, featured, use interface)
}

class Single implements ProductUI {
    async init(id: string): Promise<void> {
        const response = await fetch(`/product-api/search?f=id&v=${id}`);
        const rowArray = await response.json();
        const row = rowArray[0];
        const props: Props[] = [{
            id: row.id,
            stock: row.stock,
            category: row.category,
            title: row.title,
            price: row.price,
            featured: row.featured,
            imagePath: row.image_path
        }];
        this.props = props;
        this.element = <SingleComponent {...props[0]}/>;
    }
    element: any;
    props: Props[];
}

//class Listing implements ProductUI {
//}

export function SingleComponent(props: Props) {
    return(
        <div className="container-fluid">
            <div className="row border-bottom border-muted">
                <div className="col-md d-flex align-items-center justify-content-center bg-light px-3 w-100 mt-1" style={{height: "400px"}}>    
                    <img className="rounded img-fluid h-75" src={props.imagePath}/>
                </div>
                <div className="col-md rounded d-flex align-items-center">
                    <div className="mt-1">
                        <h5 className="border-bottom border-muted">{props.title}</h5>
                        {/*<p >Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>*/}
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
                        <button className="btn btn-outline-dark" type="submit">Add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    );
}