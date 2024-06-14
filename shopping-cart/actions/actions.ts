import { cookieCartName } from '@/consts';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

export const getCookieCart = (): { [id: string]: number } => {
  const cookieExists = hasCookie(cookieCartName);
  
  if (cookieExists) {
    const cookieCart = JSON.parse((getCookie(cookieCartName) as string) ?? '{}');

    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie(cookieCartName, JSON.stringify(cookieCart));
};

export const removeProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;

  delete cookieCart[id];

  setCookie(cookieCartName, JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {

  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;

  let productQuantity = cookieCart[id];

  if (productQuantity === 1) {

    removeProductToCart(id);
    return;
  }

  productQuantity -= 1;

  cookieCart[id] = productQuantity;

  setCookie(cookieCartName, JSON.stringify(cookieCart));

};


