import { WidgetItem } from '@/components';
import { getCartFromCookies } from '@/helpers';
import { TCartFromCookie } from '@/interfaces';
import { Product, products } from '@/products/data/products';
import { ItemCard } from '@/shopping-cart';
import Link from 'next/link';
import { IoArrowBackCircleOutline, IoSadOutline } from 'react-icons/io5';

export const metadata = {
  title: 'Carrito de compras',
  description: 'Carrito de compras',
};

interface IProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: TCartFromCookie): IProductInCart[] => {
  const productsInCart: IProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);

    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

const CartPage = () => {
  const cart = getCartFromCookies();

  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce(
    (prev, current) => prev + current.product.price * current.quantity,
    0
  );

  return (
    <div className="h-screen">
      <div className="my-3">
        <Link href={'/dashboard/products'}>
          <IoArrowBackCircleOutline size={25} />
        </Link>
      </div>
      <h1 className="text-5xl">Carrito de compras</h1>
      <hr className="my-5" />

      {!productsInCart.length && (
        <div className="flex flex-row justify-center mt-10">
          <IoSadOutline size={25} className="mr-2 text-gray-500" />
          <div className="text-gray-500 text-center">
            No tienes productos, puedes agregarlos en la pantalla de productos
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12 ">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col  w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">$ {(totalToPay * 1.15).toFixed(2)}</h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 15%: $ {(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
