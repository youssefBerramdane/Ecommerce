package com.example.ecommerce.Entity;

import java.util.List;

public class ProductFilter {
    private List<String> colors;
    private List <String> sizes;
    private List<String> price;

    private String sort;
    private String order;

    public ProductFilter(List<String> colors, List<String> sizes, List<String> price, String sort, String order) {
        this.colors = colors;
        this.sizes = sizes;
        this.price = price;
        this.sort = sort;
        this.order = order;
    }

    public List<String> getColors() {
        return colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

    public List<String> getSizes() {
        return sizes;
    }

    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
    }

    public List<String> getPrice() {
        return price;
    }

    public void setPrice(List<String> price) {
        this.price = price;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }
}
