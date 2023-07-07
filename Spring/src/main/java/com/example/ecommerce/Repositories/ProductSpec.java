package com.example.ecommerce.Repositories;

import com.example.ecommerce.Entity.Product;
import com.example.ecommerce.Entity.ProductFilter;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpec implements Specification<Product> {
    private ProductFilter filter;

    public ProductSpec(ProductFilter filter) {
        this.filter = filter;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if(filter.getColors().size()>0){
            for(String color: filter.getColors()){
                //predicates.add(criteriaBuilder.like(root.get("colors"),"White"));
            }

        }
        criteriaBuilder.isMember("white",root.get("colors"));

        return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
    }
}
