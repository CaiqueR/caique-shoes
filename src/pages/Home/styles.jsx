import styled from 'styled-components';
import { darken } from 'polished';

// eslint-disable-next-line import/prefer-default-export
export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  @media(max-width: 940px) {
    grid-template-columns: repeat(2, 1fr);

  }

  @media(max-width: 630px) {
    grid-template-columns: repeat(1, 1fr);

  }

  li {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    img {
      align-self: center;
      max-width: 250px;
    }
    > strong {
      margin-top: 5px;
      line-height: 20px;
      color: #333;
      font-size: 13px;
    }
    > span {
      margin: 5px 0 20px;
      font-size: 21px;
      font-weight: bold;
      div{
        display:flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    button {
      display: flex;
      align-items: center;
      overflow: hidden;
      margin-top: auto;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: #89043D;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#89043D')};
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        font-weight: bold;
        text-align: center;
      }
    }
  }
`;

export const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`;
