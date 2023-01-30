import { React, useState } from 'react'
import "../css/global.css";

export default function NewCustomer() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, SetMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const customer = { "name": name, "address": address, "phone": phone, "email": email }
        fetch("http://localhost:8080/customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                SetMessage(name + " is added as a new customer")
                });
            } SetMessage("Something went wrong, " + name + " was NOT added as a new customer...")
        }); 
    }

    return (
        <div className='Page-container'>
            <form onSubmit={handleSubmit}>
                <input
                    className='name'
                    type="text"
                    value={name}
                    placeholder="Name of the customer"
                    onChange={(e) => setName(e.target.value)}
                /><br />
                <input
                    className='address'
                    type="text"
                    value={address}
                    placeholder="Address of the customer"
                    onChange={(e) => setAddress(e.target.value)}
                /><br />
                <input
                    className='phone'
                    type="text"
                    value={phone}
                    placeholder="Phone of the customer"
                    onChange={(e) => setPhone(e.target.value)}
                /><br />
                <input
                    className='email'
                    type="text"
                    value={email}
                    placeholder="email of the customer"
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <button
                    className="red-button"
                    type="submit">
                    Submitt customer
                </button>
            </form>
            <p className="message">{message}</p>
        </div>
    );

}
