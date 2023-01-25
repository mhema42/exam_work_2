import React, { useEffect, useState } from "react";
import "../css/startPage.css";

const StartPage = () => {
    const [products, setProducts] = useState([])

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

    return (
        <div>
            <div className="startPage-container">
                <h1 className="title">    
                    All products
                </h1>

                {products.map(product => (           
                    <div key={product.id}>
                        <span> Product: {product.name} </span> 
                        <span> Price: {product.price} </span>
                    </div>           
                ))}        
            </div>
        </div>
    );
};

export default StartPage;