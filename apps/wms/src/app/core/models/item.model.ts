export class Item {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  category: string;
  thumbnail?: string;
  rating?: number;
  inventoryStatus?: string;

 
  constructor() {
    this.category = ''
    
  }
}
