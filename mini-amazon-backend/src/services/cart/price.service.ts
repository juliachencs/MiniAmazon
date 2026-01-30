import type { CartI } from "../../types/cart.interface.js";
import { promoCodes } from "../../config/promo_code.js";

export function calculateSubTotal(cart: CartI): number {

}

export function calculateTotal(cart: CartI): number {

}

export async function promoCodeValidator(promoCode: string): Promise<boolean> {
    // No real DB, fake for now
    return promoCodes.includes(promoCode);
}

function discountHandler(promoCode: string, subtotal: number): number {
    
}