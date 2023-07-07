package com.example.ecommerce.Repositories;

import com.example.ecommerce.Entity.Categorie;
import com.example.ecommerce.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer>, JpaSpecificationExecutor<Product> {

     List<Product>findProductsByCategorie(Categorie categorie);
     List<Product>findProductsByCategorieId(int id);

     Page<Product>findProductsByNameContaining(String name, Pageable page);
}
