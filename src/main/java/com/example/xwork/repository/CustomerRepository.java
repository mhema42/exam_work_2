package com.example.xwork.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.xwork.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
    Customer findByname(String name);
}
