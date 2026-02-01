import type { CartI } from "../../types/cart.interface.js";
import { promoCodes, type PromoCode } from "../../config/promo_code.js";
import { HttpError } from "../../errors/http.error.js";

export function calculateSubTotal(cart: CartI): number {
    return cart.products.reduce((previous, current) => {
        return previous + current.priceSnapshot * current.quantity;
    }, 0);
}

export function calculateTotal(cart: CartI): number {
    // probably more complex logic in future
    const result = cart.subTotal - cart.discount;
    return result >= 0 ? result : 0;
}

export async function promoCodeValidator(promoCode: string): Promise<boolean> {
    // No real DB, fake for now
    return promoCodes.some((ele) => {
        return ele.code === promoCode
    });
}

export function calculateDiscount(promoCode: string, subtotal: number): number {
    const promo: PromoCode | undefined = promoCodes.find((ele) => {
        return ele.code === promoCode
    });

    if (!promo) {
        throw new HttpError('Promocode is expired but not updated', 500);
    }

    switch(promo.type){
        case "PERCENT":
            return subtotal * promo.value;
        case "MINUS":
            return promo.value;
    }
}