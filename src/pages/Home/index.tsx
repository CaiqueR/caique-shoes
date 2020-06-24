import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
// @ts-ignore
import UseAnimations from 'react-useanimations';

import { ProductList, Container } from './styles';
import api from '../../services/api';
import { ProductInterface } from './ProductInterface';
import { formatPrice } from '../../util/formatter';
import { addItemToCartRequest } from '../../store/modules/cart/actions';
import { useSelector } from '../../hooks/useTypedSelector';

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const cartItens = useSelector((state) => state.cart);
  const totalAmount = cartItens.reduce((amount, product) => {
    // @ts-ignore
    amount[product.id] = product.amount;
    return amount;
  }, {});

  interface MapAny { [key: string]: any; }

  const buildStateMap = useCallback(
    (isSelected): MapAny => products.reduce(
      (state, item) => ({
        ...state,
        [item.id]: isSelected,
      }),
      {},
    ),
    [products],
  );
  const [selectedItems, setSelectedItems] = useState<MapAny>(buildStateMap(false));

  function verifyIfIsLoading(id: number) {
    return selectedItems[id];
  }

  const toggleOne = useCallback((item: number) => {
    setSelectedItems(({
      ...selectedItems,
      [item]: !selectedItems[item],
    }));
  },
    [selectedItems]);

  useEffect(() => {
    api.get<ProductInterface[]>('products').then((response) => {
      const data = response.data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));

      setProducts(data);
      setIsloading(false);
    });
  }, []);

  const handleAddProduct = useCallback((productId: number) => {
    toggleOne(productId);
    dispatch(
      addItemToCartRequest(productId),
    );
    setTimeout(() => {
      toggleOne(productId);
    }, 2000);
    console.log(selectedItems);
  }, [dispatch, selectedItems, toggleOne]);

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
                {verifyIfIsLoading(product.id) ? <UseAnimations animationKey="loading" /> : null}
              </div>
            </span>

            <button type="button" onClick={() => handleAddProduct(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />

                {
                  // @ts-ignore
                  totalAmount[product.id] || 0
                }
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))
      }
    </ProductList>
  );
}
