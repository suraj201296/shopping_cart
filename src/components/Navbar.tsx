
import {Container,Nav, Navbar as NavbarBS , Button} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Navbar() {
  const { openCart , cartQuantity } = useShoppingCart();
  return (
    <NavbarBS sticky="top" className='bg-white shadow-sm mb-3'>
      <>
        <Nav className='me-auto'>
          <Nav.Link to='/' as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to='/store' as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to='/about' as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        { cartQuantity > 0  && 
        <Button
          onClick={()=> openCart()}
          className='btn-success rounded-circle '
          style={{ width: '3rem', height: '3rem', position: 'relative' , marginRight: "10px"}}
        >
          <AiOutlineShoppingCart style={{ width: '20px', height: '30px' }} />
          <div
            className='rounded-circle bg-danger d-flex justify-content-center
            align-items-center'
            style={{
              color: 'white',
              width: '1.5rem',
              height: '1.5rem',
              position: 'absolute',
              top: 30,
              right: 0,
              transform: 'transalte(25%, 25%)',
            }}
          >
            { cartQuantity }
          </div>
        </Button>
        }
      </>
    </NavbarBS>
  );
}