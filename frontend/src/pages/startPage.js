import React, { useEffect, useState } from "react";
import "../css/startPage.css";
import NewProduct from "./newProduct";

const StartPage = () => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [productId, setProductId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [uuid, setUuid] = useState("");

    const [purchaseModal, setModal] = useState("hide");
    const [productModal, setModal1] = useState("hide");
    const [dimProducts, setDimProducts] = useState("no_dim");

    const show = (s) => {
        s("show")
        setDimProducts("dim")
    };

    const hide = (s) => {
         s("hide")
         setDimProducts("no_dim")
    };

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
            }
        });
    }

    const reset = () => {
        setPurchaseId("");
        setQuantity("");
    }

    function Close() {
        return (
            <button 
                className="close"
                type="close"
                onClick={() => {hide(setModal); hide(setModal1)}}>
                X
            </button>
        )           
    }

    return (
        <div>
            <div className={productModal}>
                <NewProduct />
                <Close />
            </div>

            <div className="page-container">

                <div className={dimProducts}></div>

                <div className="all_products">
                    <h1>All products</h1>
                    {products.map(p => (           
                        <div key={p.id}>
                            <span> Product: {p.name} </span><br />
                            <span> Price: {p.price} </span>
                        <form onSubmit={handleSubmit1}>
                            <button className="buy-button"
                                value={p.id}
                                type="submit"
                                onClick={(e) => {reset(); setProductId(e.target.value); show(setModal)}}>
                                Cart
                            </button>
                        </form><br />
                        </div>
                    ))}
                </div>
               
                <div className={purchaseModal}>
                    <Close />
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
                            onClick={(e) => {setProduct(e.target.value); hide(setModal)}}>
                            Buy
                        </button>
                    </form><br />
                </div>
            </div>
        </div>
    );
};

export default StartPage;