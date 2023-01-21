package com.example.xwork.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.xwork.entity.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
