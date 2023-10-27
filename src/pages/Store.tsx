import StoreItem from '../components/StoreItem'
import storeItems from '../data/items.json'
import {Col, Row} from "react-bootstrap"
type Props = {}

export default function Store({}: Props) {
  console.log("Store render");
  return (
    <>
        <Row md={2} xs={1} lg={4} className='g-3'>
            { storeItems.map((item)=>(
                <Col key={item.id}><StoreItem {...item}/></Col>
            ))}
        </Row>
    </>
  )
}