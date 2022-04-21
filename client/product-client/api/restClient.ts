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
type Query = {
  field: string;
  value: string;
}

export async function getProduct(id: string) {
    try {
      const response = await axios.get(`product/item?id=${id}`);
      const props: Props = response.data[0];
      console.log(props);
      return props;
    } 
    catch (error) {
      console.error(error);
    }
  }
  