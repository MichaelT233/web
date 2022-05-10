// rest api client for product service

import axios from "axios";
import { Product } from "../../../server/product-server/business-logic/catalog.js"

export type CartItem = {
    product: Product;
    quantity: number;
}

export class ProductClient {
    // query product by id
	async getProduct(id: string): Promise<Product> {
		try {
			const response = await axios.get(`/product/item/${id}`);
            return response.data.result[0];
		} 
		catch (error) {
			console.error(error);
		}
	}
    // query products by category
	async getCategory(category: string): Promise<Product[]> {
		try {
			const response = await axios.get(`/product/category/${category}`);
			return response.data.result;
		} 
		catch (error) {
			console.error(error);
		}
	}
    // query featured products
	async getFeatured(): Promise<Product[]> {
		try {
			const response = await axios.get(`/product/featured`);
			return response.data.result;
		} 
		catch (error) {
			console.error(error);
		}
	}
    // query products by title containing search pattern
	async getSearch(text: string): Promise<Product[]> {
		try {
			const response = await axios.get(`/product/search/${text}`);
			return response.data.result;
		} 
		catch (error) {
			console.error(error);
		}
	}
    // query products within cart
    async getCartItems(): Promise<CartItem[]> {
		try {
            const cartResponse = await axios.get(`/cart/read`);
            const cartResult = cartResponse.data.result;
            if (cartResult !== null) {
                const idArray: string[] = [];
                const quantityArray: number[] = [];
                for (const entry of cartResult.items) {
                    idArray.push(`'${entry.id}'`);
                    quantityArray.push(entry.quantity)
                }
                const list = idArray.join();
                const productsResponse = await axios.get(`/product/many/${list}`);
                const productResult = productsResponse.data.result;
                if (productResult !== null) {
                    const result: CartItem[] = [];
                    for (const product of productResult) {
                        for (const entry of cartResult.items) {
                            if (entry.id == product.id) {
                                const cartItem: CartItem = {product: product, quantity: entry.quantity};
                                result.push(cartItem);
                            }
                        }
                    }
                    return result;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
		} 
		catch (e) {
			console.error(e);
		}
	}
}  