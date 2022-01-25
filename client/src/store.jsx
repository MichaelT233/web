// store and cart classes along with their react components
// import database api
import {Module} from './utility.js'
var module = new Module('store', 'home')
/*
class:
    main store page functionality
*/
export class Store {
    constructor() {
        if (location.pathname == '/') {
            if(history.state == null) {
                history.replaceState({store: {state: 'home', category: null, pattern: null}}, 'Store')
            }
            else if ('store' in history.state == false) {
                history.replaceState({store: {state: 'home', category: null, pattern: null}}, 'Store')
            }
        }
    }
    // get data for all products and render on page
    loadAll() {
        ReactDOM.render(<h1>All Products</h1>, document.getElementById('productHead'))
        module.readTable((rows) => {
            const storeItems = <BuildStore rows={rows}/>
            ReactDOM.render(storeItems, document.getElementById('mainView'))
        })
        document.getElementById('searchBar').value = ''
    }
    // load products from search bar query
    loadSearch(pattern) {
        ReactDOM.render(<h1>Search Results for "{pattern}"</h1>, document.getElementById('productHead'))
        module.readSearchData(pattern, (rows) => {
            const storeItems = <BuildStore rows={rows}/>
            ReactDOM.render(storeItems, document.getElementById('mainView'))
        })
    }
    loadCategory(category) {
        ReactDOM.render(<h1>{category}</h1>, document.getElementById('productHead'))
        module.readRows('category', `'${category}'`, (rows) => {
            const storeItems = <BuildStore rows={rows}/>
            ReactDOM.render(storeItems, document.getElementById('mainView'))
        })
        document.getElementById('searchBar').value = ''
    }
    displayDropdown() {
        if (document.getElementById('dropdownContent').className == 'dropdownContentOn') {
            document.getElementById('dropdownContent').className = 'dropdownContentOff'
        }
        else {
            document.getElementById('dropdownContent').className = 'dropdownContentOn'
        }
    }
    renderState() {
        switch (history.state.store.state) {
            case 'home':
                this.loadAll()
                break
            case 'cart':
                this.loadCart()
                break
            case 'search':
                this.loadSearch(history.state.store.pattern)
                document.getElementById('searchBar').value=history.state.store.pattern
                break
            case 'category':
                this.loadCategory(history.state.store.category)
                break
        }
    }
    setBehavior() {
        window.addEventListener('load', ()=>{
            /***********************************/
            document.getElementById('mainTitle').addEventListener('click', () => {
                this.loadAll()
                history.pushState({store: {state: 'home'}}, 'Store')
            })
            document.getElementById('cartIcon').addEventListener('click', () => {
                this.loadCart()
                history.pushState({store: {state: 'cart'}}, 'Store')
            })
            var menu = document.getElementById('dropdownContent')
            for (let i = 0; i < menu.children.length; i++) {
                menu.children[i].addEventListener('click', () => {
                    this.loadCategory(`category${i}`)
                    history.pushState({store: {state: 'category', category: `category${i}`}}, 'Store')
                })
            }
            var searchBar = document.getElementById('searchBar')
            searchBar.addEventListener('change', () => {
                const pattern = searchBar.value
                this.loadSearch(pattern)
                history.pushState({store: {state: 'search', pattern: pattern}}, 'Store')
            })
            document.getElementById('menuIcon').addEventListener('click', () => {
                this.displayDropdown()
            })
            var dropdownContent = document.getElementById('dropdownContent')
            dropdownContent.addEventListener('click', () => {
                dropdownContent.className = 'dropdownContentOff'
            })
            console.log('window0')
            this.renderState()
            /***********************************/
            window.addEventListener('popstate', () => {
                console.log(('window1'))
                this.renderState()
            })
            /***********************************/
        })
    }
    // load product data for cart items
    loadCart() {
        console.log('hi')
        console.log(module.getItemCount())
        console.log(module.getItemCount() > 0)
        if (module.getItemCount() > 0) {
            module.readCartData((rows) => {
                const cartItems = <BuildCart rows={rows}/>
                ReactDOM.render(cartItems, document.getElementById('mainView'))
                var totalPrice = 0.0
                for (const row of rows) {
                    totalPrice += Number(row.price) * module.getItemQuantity(row.id)
                }
                totalPrice = totalPrice.toFixed(2)
                const head = <BuildCartHeader totalPrice={totalPrice} totalQuantity={module.getTotalCount()}/>
                ReactDOM.render(head, document.getElementById('productHead'))
            })
            document.getElementById('searchBar').value = ''
        }
        else {
            console.log('here')
            ReactDOM.render(<div><h2>Cart Empty</h2></div>, document.getElementById('productHead'))
            ReactDOM.render(<div></div>, document.getElementById('mainView'))
            document.getElementById('searchBar').value = ''
        }
    }
}
var store = new Store()
// react component: build main store page items
function BuildStore(props) {
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
            {/*quantity input*/}
            <input id={row.id + 'q'} type="number" name="quantity" min="1" defaultValue="1"/>
            {/*add to cart button*/}
            <button className="addCart" type="button" onClick={()=>{module.addItem(row.id);console.log('Y')}}>Add to Cart</button>
        </div>
    </div>)
    return (
        <div className='products'>
            {roots}
        </div>
    )
}
// react component: build cart page items
function BuildCart(props) {
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
            <button className="updateCart" type="button" onClick={ () => module.decItem(row.id, store.loadCart)}>-</button>
            {/*quantity display*/}
            <input id={row.id + 'q'} className="cartQuantity" type="number" name="quantity" value={module.getItemQuantity(row.id)} disabled/>
            {/*increment button*/}
            <button className="updateCart" type="button" onClick={ () => module.incItem(row.id, store.loadCart)}>+</button>
            {/*delete button*/}
            <button className="removeCart" type="button" onClick={ () => module.deleteItem(row.id, store.loadCart)}>Delete</button>
        </div>
    </div>)
    return (
        <div className='products'>
            {roots}
        </div>
    )
}
// react component: build cart page header
function BuildCartHeader(props) {
    return (
        <div id='cartHead'>
            <h2>Total ${props.totalPrice}</h2>
            {props.totalQuantity == 1 && <a href = '/checkout'><button type='button'>Proceed to Checkout {'('+props.totalQuantity+' item)'}</button></a>}
            {props.totalQuantity != 1 && <a href = '/checkout'><button type='button'>Proceed to Checkout {'('+props.totalQuantity+' items)'}</button></a>}
        </div>
    )
}