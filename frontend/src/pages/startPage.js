import React, { useEffect, useState } from "react";
import "../css/startPage.css";

const StartPage = () => {
    const [products, setProducts] = useState([])
    const [purchaseId, setPurchaseId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [message, setMessage] = useState("");

    const [style, setStyle] = useState("show");

    const changeStyle = () => {
        if (style === "hide") {
         setStyle("show")
        } else {setStyle("hide")}
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

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/purchase?purchaseId=${purchaseId}&productId=${productId}&quantity=${quantity}`, {
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
        setMessage("product added to chopping cart")
    }

    return (
        <div>
            <div className="Page-container">
                <h1>All products</h1>

                {products.map(product => (           
                    <div key={product.id}>
                        <span> Product: {product.name} </span> 
                        <span> Price: {product.price} </span>

                        <form onSubmit={handleSubmit}>
                            <input
                                value={purchaseId}
                                placeholder="purchaseId"
                                onChange={(e) => setPurchaseId(e.target.value)}
                            /><br />
                            <input
                                value={quantity}
                                placeholder="quantity"
                                onChange={(e) => setQuantity(e.target.value)}
                            /><br />
                            <button 
                                value={product.id}
                                type="submit"
                                onClick={(e) => setProductId(e.target.value)}>
                                Submitt purchase
                            </button>
                        </form><br />
                                       
                    </div>           
                ))}        
            </div>

        </div>
    );
};

export default StartPage;