package com.example.ecommerce.Repositories;

import com.example.ecommerce.Entity.Cart;
import com.example.ecommerce.Entity.Euser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer> {
    Optional<Cart> findCartByuserId(int id);
}
