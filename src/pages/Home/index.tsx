import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
// @ts-ignore
import UseAnimations from 'react-useanimations';

import { toast } from 'react-toastify';
import { ProductList, Container } from './styles';
import api from '../../services/api';
import { ProductInterface } from './ProductInterface';
import { formatPrice } from '../../util/formatter';
import { addItemToCartRequest } from '../../store/modules/cart/actions';
import { useSelector } from '../../hooks/useTypedSelector';
import { setItensToLoad } from '../../store/modules/loading/actions';

interface MapNumberNumber { [key: number]: number; }

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const cartItens = useSelector((state) => state.cart);
  const itensMapLoading = useSelector((state) => state.load);
  const totalAmount = cartItens.reduce<MapNumberNumber>((amount, product) => {
    const newAmount = amount;
    newAmount[product.id] = product.amount;
    return newAmount;
  }, {});

  useEffect(() => {
    async function loadItens() {
      const response = await api.get<ProductInterface[]>('products');
      const data = response.data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));

      dispatch(setItensToLoad(data));
      setProducts(data);
      setIsloading(false);
    }

    loadItens();
  }, [dispatch]);

  const handleAddProduct = useCallback((product: ProductInterface) => {
    toast.dark(`Produto ${product.title} adicionado ao carrinho`, { autoClose: 4000, position: 'bottom-center' });
    dispatch(
      addItemToCartRequest(product.id),
    );
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container>
        <UseAnimations style={{ color: '#fff' }} animationKey="loading" />
      </Container>
    );
  }
  return (
    <ProductList>
      {
        products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>
              <div>
                {product.formattedPrice}
                {itensMapLoading[product.id] ? <UseAnimations animationKey="loading" /> : null}
              </div>
            </span>

            <button type="button" onClick={() => handleAddProduct(product)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />

                {totalAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))
      }
    </ProductList>
  );
}
