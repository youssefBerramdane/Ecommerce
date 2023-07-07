package com.example.ecommerce.Entity;

public interface ProductProjection {
    int getID();
    String getName();
    double getPrice();
    String getImage();
    String getDescription();

    double getRate();
}
