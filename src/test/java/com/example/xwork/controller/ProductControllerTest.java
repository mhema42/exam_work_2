package com.example.xwork.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.xwork.entity.Product;
import com.example.xwork.repository.ProductRepository;
import com.example.xwork.service.ProductService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.hamcrest.CoreMatchers.is;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ProductControllerTest {

    @MockBean
    ProductRepository productRepository;

    @MockBean
    ProductService productService;

    @Autowired
    private MockMvc mockMvc;

    private List<Product> productList;

    @BeforeEach
    void setup() {
        this.productList = new ArrayList<>();
        this.productList.add(new Product(1L, "Bil", 5000 ));
        this.productList.add(new Product(2L, "Cykel", 50 ));
        this.productList.add(new Product(3L, "Båt", 500 ));
    }

    @Test
    void callingEndpointGetProductShouldReturn200OK() throws Exception {
        mockMvc.perform( get("/product"))
        .andExpect(status().isOk());
    }

    @Test
    void callingEndpointGetProductIdShouldReturn200OK() throws Exception {
        mockMvc.perform( get("/product/1"))
        .andExpect(status().isOk());
    }

    @Test
    void shouldFetchAllProducts() throws Exception {
        given(productService.getProducts()).willReturn(productList);       
        this.mockMvc.perform(get("/product"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.size()", is(productList.size())));
    }

}
