package com.example.xwork.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.xwork.entity.Purchase;
import com.example.xwork.repository.PurchaseRepository;
import com.example.xwork.service.PurchaseService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.hamcrest.CoreMatchers.is;

@WebMvcTest(PurchaseController.class)
@AutoConfigureMockMvc(addFilters = false)
public class PurchaseControllerTest {

    @MockBean
    PurchaseRepository purchaseRepository;

    @MockBean
    PurchaseService purchaseService;

    @Autowired
    private MockMvc mockMvc;

    private List<Purchase> purchaseList;

    @BeforeEach
    void setup() {
        this.purchaseList = new ArrayList<>();
        this.purchaseList.add(new Purchase(1L, "09e06ee3-9550-4323-ab6a-65de72e6d39d", 1L, 1, null ));
        this.purchaseList.add(new Purchase(2L, "09e06ee3-9550-4323-ab6a-65de72e6d39d", 2L, 2, null ));
        this.purchaseList.add(new Purchase(3L, "09e06ee3-9550-4323-ab6a-65de72e6d39d", 3L, 3, null ));
    }

    @Test
    void callingEndpointGetPurchaseShouldReturn200OK() throws Exception {
        mockMvc.perform( get("/purchase"))
        .andExpect(status().isOk());
    }

    @Test
    void callingEndpointGetPurchaseIdShouldReturn200OK() throws Exception {
        mockMvc.perform( get("/purchase/id?purchaseId=1"))
        .andExpect(status().isOk());
    }

    @Test
    void shouldFetchAllPurchase() throws Exception {
        given(purchaseService.getPurchases()).willReturn(purchaseList);       
        this.mockMvc.perform(get("/purchase"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.size()", is(purchaseList.size())));
    }

}
