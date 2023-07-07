package com.example.ecommerce.Repositories;

import com.example.ecommerce.Entity.CartItems;
import com.example.ecommerce.Entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemsRepo extends JpaRepository<CartItems,Integer> {


    List<CartItems> findCartItemsByCartId(int id);
    Optional<CartItems>findCartItemsByProductId(int id);
    @Transactional
    void deleteCartItemsByProductId(int id);
}
