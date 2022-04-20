import { databaseAdapter } from '../database/databaseAdapter'

const database = new databaseAdapter();

export class Catalog {
    async provideCategory(category: string): Promise<any[]> {
        const data = await database.getCategory(category);
        return data;
    }
    async provideProduct(id: string): Promise<any[]> {
        const data = await database.getProduct(id);
        return data;
    }
    async provideFeatured(): Promise<any[]> {
        const data = await database.getFeatured();
        return data;
    }
    async provideSearch(text: string): Promise<any[]> {
        const data = await database.getCategory(text);
        return data;
    }
}