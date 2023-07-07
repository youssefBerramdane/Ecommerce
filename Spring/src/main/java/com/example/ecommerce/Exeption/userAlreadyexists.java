package com.example.ecommerce.Exeption;

public class userAlreadyexists extends RuntimeException{
    public userAlreadyexists() {
    }

    public userAlreadyexists(String message) {
        super(message);
    }
}
