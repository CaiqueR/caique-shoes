import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';
import logo from '../../assets/logo.png';
import { useSelector } from '../../hooks/useTypedSelector';

export default function Header() {
  const totalItens = useSelector((state) => state.cart.length);
  return (
    <Container>
      <Link to="/">

        <img src={logo} alt="Caique Shoes" height={30} />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>
            {totalItens}
            {' '}
            itens
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}
