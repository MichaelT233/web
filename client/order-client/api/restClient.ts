import axios from "axios";

export class OrderClient {
	async create(token: string) {
		try {
			const response = await axios.post(`/cart/create/${token}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
	async delete(token: string) {
		try {
			const response = await axios.delete(`/cart/delete/${token}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
	async addItem(token: string, id: string, quantity: number) {
		try {
			const response = await axios.put(`/cart/additem/${token}/${id}/${quantity}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
	async deleteItem(token: string, id: string) {
		try {
			const response = await axios.put(`/cart/deleteitem/${token}/${id}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
    async inc(token: string, id: string) {
		try {
			const response = await axios.put(`/cart/inc/${token}/${id}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
    async dec(token: string, id: string) {
		try {
			const response = await axios.put(`/cart/dec/${token}/${id}`);
			return response.status;
		} 
		catch (e) {
			console.error(e);
		}
	}
    async read(token: string) {
        try {
			const response = await axios.get(`/cart/read/${token}`);
			return response.data;
		} 
		catch (e) {
			console.error(e);
		}
    }
}
  