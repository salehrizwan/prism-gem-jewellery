export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: string;
  image: string;
  shortDescription: string;
  description: string;
  specifications: {
    metal: string;
    gemstone: string;
    caratWeight?: string;
    clarity?: string;
    color?: string;
    dimensions?: string;
    hallmark: string;
  };
  options?: {
    name: string;
    choices: string[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}
