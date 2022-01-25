import {Module} from './utility.js'
var module = new Module('checkout', 'start')
// checkout object and it's react components
export class Checkout {
    load() {
        if (module.getItemCount() != 0) {
            module.readCartData((rows) => {
                var totalPrice = 0.0
                for (const row of rows) {
                    totalPrice += Number(row.price) * module.getItemQuantity(row.id)
                }
                totalPrice = totalPrice.toFixed(2)
                const checkoutHead = <BuildCheckoutHeader totalPrice={totalPrice} totalQuantity={module.getTotalCount()}/>
                ReactDOM.render(checkoutHead, document.getElementById('productHead'))
                const checkout = <BuildCheckoutForm/>
                ReactDOM.render(checkout, document.getElementById('formView'))
                const cartItems = <BuildCheckoutItems rows={rows}/>
                ReactDOM.render(cartItems, document.getElementById('mainView'))
            })
        }
        else {
            ReactDOM.render(<div><h2>Cart Empty</h2></div>, document.getElementById('productHead'))
            ReactDOM.render(<div></div>, document.getElementById('formView'))
            ReactDOM.render(<div></div>, document.getElementById('mainView'))
        }
    }
    setBehavior() {
        window.addEventListener('load', () => {
            this.load()
            document.getElementById('backIcon').addEventListener('click', () => {
                history.back()
            })
        })
    }
}
var checkout = new Checkout()
function BuildCheckoutForm() {
    return (
        <div id='form'>
            <form action='/checkout-data' method='POST'>
                <h2>Shipping address</h2>
                <div>
                    <label htmlFor='firstName'>First name: </label>
                    <input type='text' id='firstName'/>
                </div>
                <div>
                    <label htmlFor='lastName'>Last name: </label>
                    <input type='text' id='lastName'/>
                </div>
                <div>
                    <label htmlFor='address'>Address: </label>
                    <input type='text' id='address'/>
                </div>
                <div>
                    <label htmlFor='city'>City: </label>
                    <input type='text' id='city'/>
                </div>
                <div>
                    <label htmlFor='state'>State: </label>
                    <input type='text' id='state'/>
                </div>
                <h2>Payment method</h2>
                <div>
                    <label htmlFor='cardNumber'>Card number: </label>
                    <input type='text' id='cardNumber'/>
                </div>
                <div>
                    <label htmlFor='ccv'>CVV: </label>
                    <input type='text' id='ccv'/>
                </div>
                <input type='submit' value='Place your order'/>
            </form>
            <h2>Review items and shipping</h2>
        </div>
    )
}
function BuildCheckoutHeader(props) {
    return (
        <div id='checkoutHead'>
            <h2>Total ${props.totalPrice}</h2>
            {props.totalQuantity == 1 && <h2>{props.totalQuantity} item</h2>}
            {props.totalQuantity != 1 && <h2>{props.totalQuantity} items</h2>}
        </div>
    )
}
function BuildCheckoutItems(props) {
    const roots = props.rows.map((row) =>    
    <div key={row.id} className="product" id={row.id}>
        {/*product image source*/}
        <img alt={row.image_path} src={row.image_path}/>
        {/*wrapper for non-image content of a store item*/}
        <div className="productText">
            {/*products title heading*/}
            <h2>{row.title}</h2>
            {/*product price*/}
            <h2>${row.price}</h2>
            {/*product stock*/}
            {row.stock > 0 && <p>In Stock ({row.stock})</p>}
            {row.stock == 0 && <p>Out of Stock</p>}
            {/*product description*/}
            <p>{row.descr}</p>
            {/*product quantity selector*/}
            <label htmlFor="quantity">Qty: </label>
            {/*decrement button*/}
            <button className="updateCart" type="button" onClick={ () => module.decItem(row.id, checkout.load)}>-</button>
            {/*quantity display*/}
            <input id={row.id + 'q'} className="cartQuantity" type="number" name="quantity" value={module.getItemQuantity(row.id)} disabled/>
            {/*increment button*/}
            <button className="updateCart" type="button" onClick={ () => module.incItem(row.id, checkout.load)}>+</button>
            {/*delete button*/}
            <button className="removeCart" type="button" onClick={ () => module.deleteItem(row.id, checkout.load)}>Delete</button>
        </div>
    </div>)
    return (
        <div className='products'>
            {roots}
        </div>
    )
}