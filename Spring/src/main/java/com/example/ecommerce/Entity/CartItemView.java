package com.example.ecommerce.Entity;

public class CartItemView {
    private int productId;
    private String productName;
    private String productPicture;
    private  double price;
    private int quantite;
    private double total;
    private String fullName;

    public CartItemView() {
    }

    public CartItemView(int productId,String productName, String productPicture, double price, int quantite, String fullName) {
        this.productId=productId;
        this.productName = productName;
        this.productPicture = productPicture;
        this.price = price;
        this.quantite = quantite;
        this.total = quantite*price;
        this.fullName = fullName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductPicture() {
        return productPicture;
    }

    public void setProductPicture(String productPicture) {
        this.productPicture = productPicture;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }
}
