package com.example.xwork.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.xwork.entity.Product;
import com.example.xwork.entity.Purchase;
import com.example.xwork.repository.PurchaseRepository;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    @Autowired
    PurchaseRepository purchaseRepository;

    @Autowired
    ProductService productService;

    public PurchaseRepository getPurchaseRepository() {
        return purchaseRepository;
    }

    public void setPurchaseRepository(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    @Override
    public Purchase createPurchase(Purchase purchase, Long purchaseId, Long productId, int quantity) {
        Product product = productService.getProduct(productId);
        purchase.setPurchaseId(purchaseId);
        purchase.setProduct(product);
        purchase.setQuantity(quantity);
        return purchaseRepository.save(purchase);
    }
    
    @Override
    public List<Purchase> findPurchaseByPurchase(Long purchaseId) {
        return purchaseRepository.filterByPurchaseId(purchaseId);
    }

    @Override
    public List<Purchase> getPurchases() {
        return (List<Purchase>)purchaseRepository.findAll();
    }

}    
