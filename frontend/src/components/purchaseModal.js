import { useState, useEffect } from "react";

export default function PurchaseModal() {
    const [product, setProduct] = useState([])
    const [PID, setPId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [message, setMessage] = useState("");

    const productId = "2";

    useEffect(() => {
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
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/purchase?purchaseId=${purchaseId}&productId=${PID}&quantity=${quantity}`, {
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
                        value={productId}
                        type="submit"
                        onClick={(e) => setPId(e.target.value)}>
                        Submitt purchase
                    </button>
                </form><br />

            </div>
        </div>
    );
};