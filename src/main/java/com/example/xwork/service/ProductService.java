package com.example.xwork.service;

import java.util.List;

import com.example.xwork.entity.Product;

public interface ProductService {
    Product createProduct(Product product);
    Product getProduct(Long id);
    List<Product> getProducts();
}
