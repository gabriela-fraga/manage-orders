export class Order {
    id: number;
    products: string[] = [];
    status: string = 'OPEN';
  
    constructor(id: number) {
        this.id = id;
    }
  
    addProduct(product: string) {
      this.products.push(product)
    }
  
    removeProduct(product: string) {
      const productIdx = this.products.indexOf(product);
      if (productIdx > -1) {
        this.products.splice(productIdx, 1);
      }
    }
  
    closeOrder() {
      this.status = 'CLOSED';
    }
  
  }