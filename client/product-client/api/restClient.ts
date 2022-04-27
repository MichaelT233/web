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

export class RestClient {
	async getProduct(id: string) {
		try {
			const response = await axios.get(`/product/item?id=${id}`);
			const props: Props = response.data[0];
			return props;
		} 
		catch (error) {
			console.error(error);
		}
	}
	async getCategory(category: string) {
		try {
			const response = await axios.get(`/product/category?category=${category}`);
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
			const response = await axios.get(`/product/search?text=${text}`);
			const props: Props = response.data;
			return props;
		} 
		catch (error) {
			console.error(error);
		}
	}
}
  