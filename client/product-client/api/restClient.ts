import axios from "axios";

type Props = {
	id: string;
	stock: number;
	category: string;
	title: string;
	price: number;
	featured: boolean;
	image_path: string;
}

export class ProductClient {
	async getProduct(id: string) {
		try {
			const response = await axios.get(`/product/item/${id}`);
			const props: Props = response.data[0];
			return props;
		} 
		catch (error) {
			console.error(error);
		}
	}
	async getCategory(category: string) {
		try {
			const response = await axios.get(`/product/category/${category}`);
			const props: Props = response.data;
			return props;
		} 
		catch (error) {
			console.error(error);
		}
	}
	async getFeatured() {
		try {
			const response = await axios.get(`/product/featured`);
			const props: Props = response.data;
			return props;
		} 
		catch (error) {
			console.error(error);
		}
	}
	async getSearch(text: string) {
		try {
			const response = await axios.get(`/product/search/${text}`);
			const props: Props = response.data;
			return props;
		} 
		catch (error) {
			console.error(error);
		}
	}
    async getCartProducts(token: string) {
		try {
            const cart = await axios.get(`/cart/read/${token}`);
            if (cart.data.message == "empty") {
                return false;
            } 
            const idArray: string[] = [];
            const quantityArray: number[] = [];
            for (const entry of cart.data.items) {
                idArray.push(`'${entry.id}'`);
                quantityArray.push(entry.quantity)
            }
            const list = idArray.join();
			const response = await axios.get(`/product/many/${list}`);
			return {products: response.data, quantities: quantityArray};
		} 
		catch (e) {
			console.error(e);
		}
	}
}
  