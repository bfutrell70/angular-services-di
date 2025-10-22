import { computed, Injectable, signal } from "@angular/core";
import { Product } from "@shared/product.model";

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<Product[]>([]);

  add(product: Product) {
    // update the cart to the old value of the cart plus the supplied product
    this.cart.update((oldCart) => [...oldCart, product]);
  }

  remove(product: Product) {
    // update the card to the old list of products with the supplied product filtered out
    this.cart.update((oldCart) => oldCart.filter(p => p !== product));
  }

  get cartTotal() {
    // computed() is used to calculate a value based on a signal
    // in this case we are looping through the cart's items, and adding its price
    // (minus discount) to a total
    return computed(() => this.cart().reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0));
  }

}
