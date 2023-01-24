package com.example.xwork.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
    public Purchase createPurchase(Purchase purchase, long purchaseId, long productId, int quantity) {
        Product product = productService.getProduct(productId);
        purchase.setPurchaseId(purchaseId);
        purchase.setProduct(product);
        purchase.setQuantity(quantity);
        return purchaseRepository.save(purchase);
    }
    
    @Override
    public Purchase getPurchase(Long id) {
        if (purchaseRepository.findById(id).isPresent()) {
            return purchaseRepository.findById(id).get();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
    }

    @Override
    public List<Purchase> getPurchases() {
        return (List<Purchase>)purchaseRepository.findAll();
    }

}    
