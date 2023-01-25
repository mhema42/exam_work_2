package com.example.xwork.service;

import java.util.List;

import com.example.xwork.entity.Purchase;

public interface PurchaseService {
    Purchase createPurchase(Purchase purchase, Long purchaseId, Long productId, int quantity);
    Purchase getPurchase(Long id);
    List<Purchase> getPurchases();


}
