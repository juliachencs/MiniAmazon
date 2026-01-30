import type { CartDTO, CartI } from "../../types/cart.interface.js";
import { Cart } from "../../models/cart.model.js";
import type { CartItemPop } from "../../types/cartItem.interface.js";
import { Product } from "../../models/product.model.js";
import type { ProductView } from "../../types/product.interface.js";
import { HttpBadRequestError } from "../../errors/bad-request-error.js";
import { HttpConfilctError } from "../../errors/conflict-error.js";
import { HttpNotFoundError } from "../../errors/not-found-error.js";
import * as priceService from './price.service.js'

export async function getCartService(userId: string): Promise<CartDTO> {
    const cart: CartI<CartItemPop> | null = await Cart.findOne({ userId })
        .populate<{ products: CartItemPop[] }>('products.productId', 'name price inStockQuant imageURI');
    if (!cart) {
        // when user don't have cart yet, create a fake empty cart to return with
        return createEmptyCart(userId);
    }
    else {
        return mapCartInterfaceToDTO(cart);
    }
}

export async function clearCartService(userId: string): Promise<CartDTO> {
    // empty cart should be safe to parse as populated
    const cart: CartI<CartItemPop> | null = await Cart.findOneAndUpdate({ userId }, {
        products: [],
        promoCode: '',
        subTotal: 0,
        discount: 0,
        total: 0
    }, { new: true });

    if (!cart) {
        // when user don't have cart yet, create a fake empty cart to return with
        return createEmptyCart(userId);
    }
    else {
        return mapCartInterfaceToDTO(cart);
    }
}

export async function addCartItemService(userId: string, itemId: string): Promise<CartDTO> {
    let cart: CartI | null = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({
            userId: userId,
            products: [],
            promoCode: '',
            subTotal: 0,
            discount: 0,
            total: 0
        })
    }

    const item: ProductView | null = await Product.findById(itemId);

    if (!item) {
        throw new HttpBadRequestError('Product_id provided is invalid or product is removed');
    }

    const exist = cart.products.find((ele) => {
        return ele.productId.equals(item._id);
    })
    if (exist) {
        throw new HttpConfilctError('Product already added');
    }

    cart.products.push({
        productId: item._id,
        quantity: 1,
        priceSnapshot: item.price,
        recentChangedPrice: false,
        recentChangedStock: false
    });

    cart.subTotal = priceService.calculateSubTotal(cart);
    cart.total = priceService.calculateTotal(cart);

    // wait until update complete
    await Cart.findOneAndUpdate({ userId }, cart);

    return getCartService(userId);
}

export async function updateCartItemService(userId: string, itemId: string, quantityIn: number) {
    const cart: CartI | null = await Cart.findOne({ userId });

    // if we do throttle, change this
    if (!cart) {
        throw new HttpNotFoundError('Cart not found');
    }

    // Mongoose will handle the subdocument change
    const productInCart = cart.products.find((item) => {
        return item.productId.toString() === itemId;
    });

    if (productInCart) {
        const productInDB: ProductView | null = await Product.findById(itemId);
        if (!productInDB) {
            // maybe?
            // deleteCartItemService(userId, itemId);
            throw new HttpNotFoundError('Product now unavaliable')
        }
        // check for inStock quantity is enough
        if (quantityIn > productInDB.inStockQuant) {
            productInCart.recentChangedStock = true;
            productInCart.quantity = productInDB.inStockQuant;
        }
        else {
            productInCart.quantity = quantityIn;
            // maybe?
            // productInCart.recentChangedStock = false;
        }
        // check for price change
        if (productInCart.priceSnapshot != productInDB.price) {
            productInCart.recentChangedPrice = true;
            productInCart.priceSnapshot = productInDB.price;
        }
        else {
            // Probably too quick
            // productInCart.recentChangedPrice = false;
        }
    } else {
        throw new HttpNotFoundError('Product not found');
    }

    cart.subTotal = priceService.calculateSubTotal(cart);
    cart.total = priceService.calculateTotal(cart);

    // wait until update complete
    await Cart.findOneAndUpdate({ userId }, cart);

    return getCartService(userId);
}

export async function deleteCartItemService(userId: string, itemId: string) {
    const cart: CartI | null = await Cart.findOne({ userId });

    if (!cart) {
        throw new HttpNotFoundError('Cart not found');
    }

    // let mongoose handle the subdocument change
    const item = cart.products.find((item) => {
        return item.productId.toString() === itemId;
    });

    if (!item) {
        throw new HttpNotFoundError('Product not found');
    }

    cart.products = cart.products.filter((p) => {
        return p.productId.toString() !== itemId
    });

    cart.subTotal = priceService.calculateSubTotal(cart);
    cart.total = priceService.calculateTotal(cart);

    // wait until update complete
    await Cart.findOneAndUpdate({ userId }, cart);

    return getCartService(userId);
}

export async function applyPromoCodeService(userId: string, promoCodeIn: string): Promise<CartDTO> {
    const valid: boolean = await priceService.promoCodeValidator(promoCodeIn);
    if (!valid) {
        throw new HttpBadRequestError('promoCode invalid or expired');
    }

    const cart: CartI | null = await Cart.findOneAndUpdate({ userId }, { promoCode: promoCodeIn });

    if (!cart) {
        throw new HttpNotFoundError('Cart not found');
    }
    else {
        cart.discount = priceService.calculateDiscount(promoCodeIn, cart.subTotal);
        cart.total = priceService.calculateTotal(cart);
        await Cart.findOneAndUpdate({ userId }, cart);
        return getCartService(userId);
    }
}

function mapCartInterfaceToDTO(cart: CartI<CartItemPop>): CartDTO {
    return {
        userId: cart.userId,
        products: cart.products.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            priceSnapshot: item.priceSnapshot,
            productImgURI: item.productId.imageURI,
            productName: item.productId.name,
            inStockQuant: item.productId.inStockQuant,
            recentChangedPrice: item.recentChangedPrice,
            recentChangedStock: item.recentChangedStock
        })),
        promoCode: cart.promoCode,
        subTotal: cart.subTotal,
        discount: cart.discount,
        total: cart.total
    }
}

function createEmptyCart(userId: string): CartDTO {
    return {
        userId: userId,
        products: [],
        promoCode: '',
        subTotal: 0,
        discount: 0,
        total: 0
    }
}