package com.example.xwork.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.xwork.entity.Purchase;

public interface PurchaseRepository extends CrudRepository<Purchase, Long> {
}
