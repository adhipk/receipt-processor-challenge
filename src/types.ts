export interface Item {
  shortDescription: string;
  price: number;
}
export interface UnverifiedItem {
  shortDescription: string;
  price: string;
}
export interface Receipt {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  total: number;
  items: Item[];
}
export interface UnverifiedReceipt {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  total: string;
  items: UnverifiedItem[];
}