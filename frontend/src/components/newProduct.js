import { React, useState } from 'react'
import "../css/global.css";
import StartPage from '../pages/startPage';

export default function NewProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [message, SetMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const product = { "name": name, "price": price }
        fetch("http://localhost:8080/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                });
            }
        });
        SetMessage(name + " is added as a new product")
        StartPage(this.forceUpdate());
    }

    return (
        <div className='modal'>
            <form onSubmit={handleSubmit}>
                <input
                    className='name'
                    type="text"
                    value={name}
                    placeholder="Name of the product"
                    onChange={(e) => setName(e.target.value)}
                /><br />
                <input
                    className='price'
                    type="text"
                    value={price}
                    placeholder="Price of the product"
                    onChange={(e) => setPrice(e.target.value)}
                /><br />
                <button
                    className="red-button"
                    type="submit"
                    >Submitt product
                </button>
            </form>
            <p className="message">{message}</p>
        </div>
    );

}
