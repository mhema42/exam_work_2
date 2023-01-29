import "../css/global.css";
import "../css/navbar.css";

export default function secNavBar(props) {

    return (
        <div>
        <span>Shopping Cart ({props.quantity})</span>      
        </div>
    )

}
