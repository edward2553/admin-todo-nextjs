import { cookieCartName } from '@/consts';
import { TCartFromCookie } from '@/interfaces';
import { cookies } from 'next/headers';

export const getCartFromCookies = () => {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get(cookieCartName)?.value ?? '{}') as TCartFromCookie;

  return cart;
};
