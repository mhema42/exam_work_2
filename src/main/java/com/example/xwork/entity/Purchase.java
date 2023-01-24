package com.example.xwork.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity

public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    long purchaseId;
    int quantity;

    @OneToOne
    private Product product;

    public Purchase() {
    }
    
    public Purchase(Long id, long purchaseId, long productId, int quantity, Product product) {
        this.id = id;
        this.purchaseId = purchaseId;
        this.quantity = quantity;
        this.product = product;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(long purchaseId) {
        this.purchaseId = purchaseId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
