/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  MdRemoveCircleOutline, MdAddCircleOutline, MdDelete, MdArrowBack,
} from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Container, ProductTable, Total } from './styles';
import { useSelector } from '../../hooks/useTypedSelector';
import { ProductInterface } from '../Home/ProductInterface';
import { removeItemFromCart, updateItemFromCart } from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/formatter';

export default function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const cartMapped = useMemo<ProductInterface[]>(() => cart.map((product) => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })), [cart]);
  const total = useMemo(() => formatPrice(cart.reduce((totalValue, product) => totalValue + product.price * product.amount, 0)), [cart]);
  const haveCartItem = useMemo(() => cart.length > 0, [cart.length]);

  const handleRemoveItemCart = useCallback((product: ProductInterface) => {
    dispatch(
      removeItemFromCart(product),
    );
  }, [dispatch]);

  const increment = useCallback((product: ProductInterface) => {
    dispatch(updateItemFromCart(product, product.amount + 1));
  }, [dispatch]);

  const decrement = useCallback((product: ProductInterface) => {
    dispatch(updateItemFromCart(product, product.amount - 1));
  }, [dispatch]);

  function goBack() {
    history.push('/');
  }
  return (
    <Container>
      <ProductTable>
        {haveCartItem ? (
          <thead>
            <tr>
              <th />
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
        ) : null}

        <tbody>
          {haveCartItem ? cartMapped.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>

              <td>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>
              </td>

              <td>
                <div>
                  <button type="button" disabled={product.amount === 1} onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color={product.amount === 1 ? '#000' : '#89043D'} />
                  </button>

                  <input type="number" readOnly value={product.amount} />

                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#89043D" />
                  </button>
                </div>
              </td>

              <td>
                <strong>{product.subtotal}</strong>
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveItemCart(product)}
                >
                  <MdDelete size={20} color="#89043D" />
                </button>
              </td>
            </tr>
          )) : <tr><td><h1>Carrinho vazio</h1></td></tr>}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button" onClick={haveCartItem ? undefined : goBack}>
          {haveCartItem ? 'Finalizar pedido' : (
            <>
              <MdArrowBack size={20} color="#fff" />
              Voltar
            </>
          )}

        </button>

        {haveCartItem ? (
          <Total>
            <span>Total</span>
            <strong>{total}</strong>
          </Total>
        ) : null}
      </footer>
    </Container>
  );
}
