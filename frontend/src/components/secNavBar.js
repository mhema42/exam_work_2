import "../css/global.css";
import "../css/navbar.css";

export default function secNavBar(props) {

    return (
        <div className="sec-navbar">
            <div><img src="././mx.png" alt="logo"></img></div>
            <div className="search">
                <input type="search" placeholder="Search">
                </input>
            </div>
            <div className="cart">Shopping Cart ({props.quantity})</div>
        </div>
    )

}
