// rest api client for order service

import axios from "axios";

// cart entry object
export type Entry = {
    id: string;
    quantity: number;
}

export class OrderClient {
    // create cart document
	async create(): Promise<boolean> {
		try {
			const response = await axios.post(`/cart/create`);
			return response.data.result;
		} 
		catch (e) {
			console.error(e);
		}
	}
    // delete cart document
	async delete(): Promise<boolean> {
		try {
			const response = await axios.delete(`/cart/delete`);
			return response.data.result;
		} 
		catch (e) {
			console.error(e);
		}
	}
    // add item entry to cart
	async addItem(id: string, quantity: number): Promise<boolean> {
		try {
			const response = await axios.put(`/cart/additem/${id}/${quantity}`);
			return response.data.result;
		} 
		catch (e) {
			console.error(e);
		}
	}
    // delete item entry from cart
	async deleteItem(id: string): Promise<boolean> {
		try {
			const response = await axios.put(`/cart/deleteitem/${id}`);
			return response.data.result;
		} 
		catch (e) {
			console.error(e);
		}
	}
    // increment item entry in cart
    async inc(id: string): Promise<boolean> {
		try {
			const response = await axios.put(`/cart/inc/${id}`);
			return response.data.result;
		} 
		catch (e) {
			console.error(e);
		}
	}
    // decrement item entry in cart
    async dec(id: string): Promise<boolean> {
		try {
			const response = await axios.put(`/cart/dec/${id}`);
			return response.data.result;
		} 
		catch (e) {
			console.error(e);
		}
	}
    // read cart document
    async read(): Promise<Entry[]> {
        try {
			const response = await axios.get(`/cart/read`);
			return response.data.result;
		} 
		catch (e) {
			console.error(e);
		}
    }
}
  