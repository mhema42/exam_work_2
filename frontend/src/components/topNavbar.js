import { useState } from "react";
import "../css/global.css";
import NewProduct from "./newProduct"
import NewCustomer from "./newCustomer"

export default function TopNavBar() {
    const [productModal, setProductModal] = useState("hide");
    const [customerModal, setCustomerModal] = useState("hide");
    const [dimProducts, setDimProducts] = useState("no_dim");

    const show = (modal) => {modal("show"); setDimProducts("dim")};
    const hide = (modal) => {modal("hide"); setDimProducts("no_dim")};

    function CloseBtn() {
        return (<button className="close" onClick={() => {hide(setProductModal); hide(setCustomerModal)}}>X</button>)           
    }

    return (       
        <div className="top-navbar">
            <div className={dimProducts}></div>
            <div className={productModal}>
                    <NewProduct />
                    <CloseBtn />
                </div>
                <div className={customerModal}>
                    <NewCustomer />
                    <CloseBtn />
            </div>
            <button className="new-product"
                        type="submit"
                        onClick={(e) => {show(setProductModal)}}>
                        Add products
            </button>
            <button className="new-customer"
                        type="submit"
                        onClick={(e) => {show(setCustomerModal)}}>
                        Add customers
            </button>
        </div>
    )
}