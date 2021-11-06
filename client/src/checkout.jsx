// checkout object and it's react components
export class Checkout {
    load() {
        const checkout = <BuildCheckout/>
        ReactDOM.render(<h1>Enter your Information</h1>, document.getElementById('productHead'))
        ReactDOM.render(checkout, document.getElementById('mainView'))
    }
}
function BuildCheckout() {
    return (
        <div id='form'>
            <form action='/checkout-data' method='POST'>
                <div>
                    <label htmlFor='firstName'>First Name: </label>
                    <input type='text' id='firstName'/>
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name: </label>
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
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}