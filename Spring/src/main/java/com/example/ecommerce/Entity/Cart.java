package com.example.ecommerce.Entity;

import jakarta.persistence.*;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "userId")
    private Euser user;

    public Cart() {
    }

    public Cart(Euser user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Euser getUser() {
        return user;
    }

    public void setUser(Euser user) {
        this.user = user;
    }
}
