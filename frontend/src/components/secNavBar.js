import "../css/global.css";

export default function secNavBar(props) {

    return (
        <div>
        <span>Order id ({props.uuid})</span><br />
        <span>Shopping Cart ({props.quantity})</span>      
        </div>
    )

}
