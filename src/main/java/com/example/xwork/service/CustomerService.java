package com.example.xwork.service;

import java.util.List;

import com.example.xwork.entity.Customer;

public interface CustomerService {
    Customer createCustomer(Customer customer);
    Customer getCustomer(Long id);
    List<Customer> getCustomers();
}
