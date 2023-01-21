package com.example.xwork.controller;
    
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.xwork.entity.Customer;
import com.example.xwork.repository.CustomerRepository;
import com.example.xwork.service.CustomerService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.hamcrest.CoreMatchers.is;

@WebMvcTest(CustomerController.class)
@AutoConfigureMockMvc(addFilters = false)
public class CustomerControllerTest {

    @MockBean
    CustomerRepository customerRepository;

    @MockBean
    CustomerService customerService;

    @Autowired
    private MockMvc mockMvc;

    private List<Customer> customerList;

    @BeforeEach
    void setup() {
        this.customerList = new ArrayList<>();
        this.customerList.add(new Customer(1L, "Mats", "Kaxås", "mats@user.nu" ));
        this.customerList.add(new Customer(1L, "Pelle", "Göteborg", "pelle@user.nu" ));
        this.customerList.add(new Customer(1L, "Karin", "Stockholm", "karin@user.nu" ));
    }

    @Test
    void callingEndpointGetCustomerShouldReturn200OK() throws Exception {
        mockMvc.perform( get("/customer"))
        .andExpect(status().isOk());
    }

    @Test
    void callingEndpointGetCustomerIdShouldReturn200OK() throws Exception {
        mockMvc.perform( get("/customer/1"))
        .andExpect(status().isOk());
    }

    @Test
    void shouldFetchAllCustomers() throws Exception {
        given(customerService.getCustomers()).willReturn(customerList);       
        this.mockMvc.perform(get("/customer"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.size()", is(customerList.size())));
    }

}
