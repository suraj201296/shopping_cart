import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { BsCurrencyRupee } from 'react-icons/bs';

type Props = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: Props) {
  const { removeItemQuantity } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        src={item.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className='me-auto'>
        <div>
          {item.name}
          {'  '}
          {quantity > 1 && <span className='text-muted'> x {quantity}</span>}
          <div className='text-muted'> { item.price } <BsCurrencyRupee className='mb-1' /></div>
        </div>
      </div>
      <div> {item.price * quantity } <BsCurrencyRupee className='mb-1' /></div>
      <Button variant='outline-danger' size='sm' onClick={()=>removeItemQuantity(id)}>&times;</Button>
    </Stack>
  );
}
