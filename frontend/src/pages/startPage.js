import React, { useEffect, useState } from "react";
import "../css/startPage.css";
import TopNavBar from "../components/topNavbar";

const StartPage = () => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [productId, setProductId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [uuid, setUuid] = useState("");

    //show&hide modals
    const [purchaseModal, setPurchaseModal] = useState("hide");
    const [dimProducts, setDimProducts] = useState("no_dim");

    const show = (modal) => {modal("show"); setDimProducts("dim")};
    const hide = (modal) => {modal("hide"); setDimProducts("no_dim")};

    function CloseBtn() {
        return (<button className="close" onClick={() => hide(setPurchaseModal)}>X</button>)           
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

        if(uuid === "") {
            setUuid(crypto.randomUUID());   
        }
    }

    function Product() {
        return (
            <div>
                <span> Product: {product.name} </span><br />
                <span> Price: {product.price} </span>

                <form onSubmit={handleSubmit2}>
                    <input
                        required
                        value={quantity}
                        placeholder="quantity"
                        onChange={(e) => {setQuantity(e.target.value); setPurchaseId(uuid)}}
                    /><br />
                    <button className="buy-button"
                        disabled={!quantity > 0}
                        value={productId}
                        type="submit"
                        onClick={(e) => {setProduct(e.target.value); hide(setPurchaseModal)}}>
                        Buy
                    </button>
                </form><br />
            </div>
        )
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
            }
        });       
    }  

    return (
        <div className="page-container">
            <div className={dimProducts}></div>
            <div>
                <TopNavBar />
            </div>
            <div>
                <h1>All products</h1>
                {products.sort((b, a) => a.id - b.id).map(p => (           
                    <div key={p.id}>
                        <span> Product: {p.name} </span><br />
                        <span> Price: {p.price} </span>
                    <form onSubmit={handleSubmit1}>
                        <button className="buy-button"
                            value={p.id}
                            type="submit"
                            onClick={(e) => {setProductId(e.target.value); show(setPurchaseModal)}}>
                            Cart
                        </button>
                    </form><br />
                    </div>
                ))}
            </div>
            <div className={purchaseModal}>
                <Product />
                <CloseBtn />
            </div>
        </div>
    );
};

export default StartPage;