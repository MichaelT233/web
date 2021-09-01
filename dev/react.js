import getJSON from './script.js';

function loadProducts() {
  function build_store(obj) {
    var container = `<div class='item_wrapper' id='store_item0'></div>`;
    var i = 1;

    while (i < obj.products.length) {
      container = container + `<div class='item_wrapper' id='store_item${i}'></div>`;
      i++;
    }

    var container_jsx = React.createElement("div", {
      id: "store_wrapper",
      dangerouslySetInnerHTML: {
        __html: container
      }
    });
    ReactDOM.render(container_jsx, document.getElementById('store_view'));

    function Store_Item(props) {
      return React.createElement("div", {
        class: "store_item"
      }, React.createElement("h2", null, props.title), React.createElement("img", {
        src: props.image_path,
        alt: "test image",
        class: "product_image"
      }), React.createElement("p", null, props.price), React.createElement("p", null, props.description), React.createElement("label", {
        for: "quantity"
      }, "Qty:"), React.createElement("input", {
        type: "number",
        name: "quantity",
        min: "1"
      }), React.createElement("button", {
        type: "button"
      }, "Add to Cart"));
    }

    i = 0;

    while (i < obj.products.length) {
      var item = React.createElement(Store_Item, {
        title: obj.products[i].name,
        description: obj.products[i].description,
        price: obj.products[i].price,
        image_path: obj.products[i].image_path
      });
      ReactDOM.render(item, document.getElementById('store_item' + i));
      i++;
    }
  }

  getJSON('db', build_store);
}

window.loadProducts = loadProducts;
