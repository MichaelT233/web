import axios from "axios";

export class OrderClient {
	async create() {
		try {
			const response = await axios.post(`/cart/create`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
	async delete() {
		try {
			const response = await axios.delete(`/cart/delete`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
	async addItem(id: string, quantity: number) {
		try {
			const response = await axios.put(`/cart/additem/${id}/${quantity}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
	async deleteItem(id: string) {
		try {
			const response = await axios.put(`/cart/deleteitem/${id}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
    async inc(id: string) {
		try {
			const response = await axios.put(`/cart/inc/${id}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
    async dec(id: string) {
		try {
			const response = await axios.put(`/cart/dec/${id}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
    async read() {
        try {
			const response = await axios.get(`/cart/read`);
			return response.data;
		} 
		catch (e) {
			console.error(e);
		}
    }
}
  