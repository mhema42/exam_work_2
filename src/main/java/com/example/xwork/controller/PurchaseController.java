package com.example.xwork.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.xwork.entity.Purchase;
import com.example.xwork.service.PurchaseService;

@RestController
public class PurchaseController {

    @Autowired 
    PurchaseService purchaseService;

    @PostMapping("/purchase")
    public ResponseEntity<Purchase> savePurchase(
        @RequestBody Purchase purchase, 
        @RequestParam("purchaseId") String purchaseId, 
        @RequestParam("productId") Long productId, 
        @RequestParam("quantity") int quantity
        ) {
        return new ResponseEntity<>(purchaseService.createPurchase(
            purchase, 
            purchaseId, 
            productId, 
            quantity
            ), HttpStatus.CREATED);
    }
    
    @GetMapping("/purchase/id")
    public ResponseEntity<List<Purchase>> getPurchaseByPurchaseId(@RequestParam(required = true) String purchaseId) {
        return new ResponseEntity<>(purchaseService.findPurchaseByPurchase(purchaseId), HttpStatus.OK);
    }

    @GetMapping("/purchase")
    public ResponseEntity <List<Purchase>> getPurchases() {
        return new ResponseEntity<>(purchaseService.getPurchases(), HttpStatus.OK);
    }

}
