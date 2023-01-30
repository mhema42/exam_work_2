import { useState } from "react";
import "../css/global.css";
import "../css/navbar.css";
import NewProduct from "./newProduct";
import NewCustomer from "./newCustomer";

export default function TopNavBar(props) {
    const [productModal, setProductModal] = useState("hide");
    const [customerModal, setCustomerModal] = useState("hide");
    const [dimProducts, setDimProducts] = useState("no_dim");

    const show = (modal) => {modal("show"); setDimProducts("dim")};
    const hide = (modal) => {modal("hide"); setDimProducts("no_dim")};

    function CloseBtn() {
        return (<button className="close-btn" onClick={() => {hide(setProductModal); hide(setCustomerModal)}}>X</button>)           
    }

    return (       
        <div className="top-navbar">
            <div className={dimProducts}></div>
            <span>Order id ({props.uuid})</span>
            <div className={productModal}>
                <NewProduct />
                <CloseBtn className="close-btn"/>
            </div>
            <div className={customerModal}>
                <NewCustomer />
                <CloseBtn className="close-btn"/>
            </div>
            <button className="new-btn"
                        type="submit"
                        onClick={(e) => {show(setProductModal)}}>
                        Add products
            </button>
            <button className="new-btn"
                        type="submit"
                        onClick={(e) => {show(setCustomerModal)}}>
                        Add customers
            </button>
        </div>
    )
}