package com.example.xwork.service;

import java.util.List;

import com.example.xwork.entity.Purchase;

public interface PurchaseService {
    Purchase createPurchase(Purchase purchase, String purchaseId, Long productId, int quantity);
    List<Purchase> findPurchaseByPurchase(String purchaseId);
    List<Purchase> getPurchases();


}
