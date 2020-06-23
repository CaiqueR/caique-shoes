import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import api from '../../services/api';
import { ProductInterface } from './ProductInterface';
import { formatPrice } from '../../util/formatter';
import { addItemToCart } from '../../store/modules/cart/actions';

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    api.get<ProductInterface[]>('products').then((response) => {
      const data = response.data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));

      setProducts(data);
    });
  }, []);

  const handleAddProduct = useCallback((product: ProductInterface) => {
    dispatch(
      addItemToCart(product),
    );
  }, [dispatch]);

  return (
    <ProductList>
      {
        products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.formattedPrice}</span>

            <button type="button" onClick={() => handleAddProduct(product)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {' '}
                3
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))
      }
    </ProductList>
  );
}
