import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    calculatePrice(): number {
        return this.items.reduce((acc, prev) => acc + prev.price, 0);
    }

    calculatePriceDiscount(discount: number): number {
        const totalPrice = this.items.reduce((acc, prev) => acc + prev.price, 0);
        return totalPrice - ((totalPrice / 100) * discount);;
    }

    deleteId(id: number): void {
        const itemId = this.items.findIndex((item) => item.id === id);
        if (itemId === -1) {
            throw new Error('Unknown ID');
        }
        this._items.splice(itemId, 1);
    }
}