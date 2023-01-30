import React, { useEffect, useState } from "react";
import "../css/global.css";
import TopNavBar from "../components/topNavbar";
import SecTopNavBar from "../components/secNavBar";

const StartPage = () => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [productId, setProductId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cart, setCart] = useState(0);
    const [uuid, setUuid] = useState("");

    //show&hide modals
    const [purchaseModal, setPurchaseModal] = useState("hide");
    const [dimProducts, setDimProducts] = useState("no_dim");

    const show = (modal) => {modal("show modal"); setDimProducts("dim")};
    const hide = (modal) => {modal("hide"); setDimProducts("no_dim")};

    function CloseBtn() {
        return (<button className="close-btn" onClick={() => hide(setPurchaseModal)}>X</button>)           
    }

    //render all products on startpage
    useEffect(() => {
        fetch("http://localhost:8080/product", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then((result) => {
                setProducts(result);
            })
    }, [])

    //render choosen product in modal
    const handleSubmit1 = (e) => {
        e.preventDefault()
        
        fetch("http://localhost:8080/product/" + productId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then((result) => {
                setProduct(result);
            })
    }

    //POST choosen product
    const handleSubmit2 = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8080/purchase?purchaseId=${purchaseId}&productId=${product}&quantity=${quantity}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({})
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                });
                setQuantity("");
                setCart(+cart + +quantity);
                if(uuid === "") {
                    setUuid(crypto.randomUUID());   
                }
            }
        });       
    }  

    return (
        <div className="page-container">          
            <div>
                <TopNavBar uuid={uuid}/>
                <SecTopNavBar quantity={cart}/>
            </div>

            <div className={dimProducts}></div>
            
            <div className="product-list">
                    {products.sort((b, a) => a.id - b.id).map(p => (           
                        <div key={p.id} className="product">
                            <div className="product-name"> {p.name} </div>
                            <div className="product-price"> $ {p.price} </div>
                            <form onSubmit={handleSubmit1}>
                                <button className="red-button"
                                    value={p.id}
                                    type="submit"
                                    onClick={(e) => {setProductId(e.target.value); show(setPurchaseModal)}}>
                                    Add to cart
                                </button>
                            </form>
                        </div>
                    ))}
            </div>

            <div className={purchaseModal}>
                <div className="modal">
                    <div className="modal-txt">
                        <span> {product.name} </span><br />
                        <span> Price: {product.price} </span>
                    </div>

                    <form onSubmit={handleSubmit2}>
                        <input
                            autoFocus
                            required
                            value={quantity}
                            placeholder="quantity"
                            onChange={(e) => {setQuantity(e.target.value)}}
                        /><br />
                        <button className="red-button modal-btn" 
                            disabled={!quantity > 0}
                            value={productId}
                            type="submit"
                            onClick={(e) => {setPurchaseId(uuid); setProduct(e.target.value); hide(setPurchaseModal)}}>
                            Add to cart
                        </button>
                    </form><br />
                    <CloseBtn />
                </div>
            </div>
        </div>
    );
};

export default StartPage;