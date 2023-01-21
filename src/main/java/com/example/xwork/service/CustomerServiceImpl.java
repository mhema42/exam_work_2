package com.example.xwork.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.xwork.entity.Customer;
import com.example.xwork.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    public CustomerRepository getCustomerRepository() {
        return customerRepository;
    }

    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer createCustomer(Customer customer) {
        if (customer.getEmail().contains("@")) {
            return customerRepository.save(customer);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
    }
    
    @Override
    public Customer getCustomer(Long id) {
        if (customerRepository.findById(id).isPresent()) {
            return customerRepository.findById(id).get();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
    }

    @Override
    public List<Customer> getCustomers() {
        return (List<Customer>)customerRepository.findAll();
    }

}    
