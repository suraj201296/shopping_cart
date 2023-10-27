import { Card , Button} from 'react-bootstrap';
import { BsCurrencyRupee } from 'react-icons/bs';
import { useShoppingCart } from '../context/ShoppingCartContext';

type ItemPropsType = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export default function StoreItem({ id, name, price, imgUrl }: ItemPropsType) {
  const { getItemQuantity , IncreaseItemQuantity , decreaseItemQuantity, removeItemQuantity} = useShoppingCart();  
  const quantity = getItemQuantity(id);
  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={imgUrl}
        height='250px'
        style={{ objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-3'>{name}</span>
          <span className='ms-2 text-muted'>
            {price} <BsCurrencyRupee className='mb-1' />
          </span>
        </Card.Title>
      </Card.Body>
      <div className='mt-auto p-3'>
        {quantity === 0 ? (
          <Button className='w-100' onClick={()=> IncreaseItemQuantity(id)}>+ Add To Cart</Button>
        ) : (
          <div className='d-flex align-items-center flex-column'>
            <div className='d-flex align-items-center justify-content-center' style={{ gap : ".5rem"}}>
                <Button onClick={()=> decreaseItemQuantity(id)}>-</Button>
                <div>
                    <span className='fs-4'>{quantity}</span> in a cart
                </div>
                <Button onClick={()=> IncreaseItemQuantity(id)}>+</Button>
            </div>
            <Button variant='danger' size='sm' onClick={()=>removeItemQuantity(id)}>Remove</Button>
          </div>
        )}
      </div>
    </Card>
  );
}
