import { computed, Inject, Injectable, InjectionToken, signal } from "@angular/core";
import { Product } from "@shared/product.model";

// export const CART_SERVICE_TOKEN = new InjectionToken<CartService>("CartService");

type CartOptions = {
  persistenceType: string,  // SQL, localstorage, etc.
  persistenceKey: string  // localstorage key name
}

export const CART_OPTIONS_TOKEN = new InjectionToken<CartOptions>('CART_OPTIONS');

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<Product[]>([]);

  // private cartOptions: CartOptions = {
  //   persistenceType: 'local',
  //   persistenceKey: 'cart'
  // };

  constructor(
    @Inject(CART_OPTIONS_TOKEN) private cartOptions: CartOptions) {
    if (this.cartOptions && this.cartOptions.persistenceType === 'local') {
      // attempt to load the cart from local storage
      const cartString = localStorage.getItem(this.cartOptions.persistenceKey);
      const cart: Product[] = cartString ? JSON.parse(cartString) as Product[]: [];
      this.cartItems.set(cart);
    }
  }

  get cart() {
    return this.cartItems.asReadonly();
  }

  add(product: Product) {
    // update the cart to the old value of the cart plus the supplied product
    this.cartItems.update((oldCart) => [...oldCart, product]);
    this.storeCart();
  }

  remove(product: Product) {
    // update the card to the old list of products with the supplied product filtered out
    this.cartItems.update((oldCart) => oldCart.filter(p => p !== product));
    this.storeCart();
  }

  private storeCart() {
    if (this.cartOptions && this.cartOptions.persistenceType === 'local') {
      localStorage.setItem(this.cartOptions.persistenceKey, JSON.stringify(this.cartItems()));
    }
  }

  get cartTotal() {
    // computed() is used to calculate a value based on a signal
    // in this case we are looping through the cart's items, and adding its price
    // (minus discount) to a total
    return computed(() => this.cartItems().reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0));
  }

}
