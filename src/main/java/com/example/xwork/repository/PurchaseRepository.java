package com.example.xwork.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.xwork.entity.Purchase;

public interface PurchaseRepository extends CrudRepository<Purchase, Long> {

    @Query("""
        SELECT p FROM Purchase p WHERE p.purchaseId = :purchaseId  
    """)
    List<Purchase> filterByPurchaseId(@Param("purchaseId") Long purchaseId);

}
