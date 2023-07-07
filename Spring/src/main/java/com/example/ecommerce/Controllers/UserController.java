package com.example.ecommerce.Controllers;

import com.example.ecommerce.Service.CartService;
import com.example.ecommerce.Service.EuserDetailService;
import com.example.ecommerce.Service.UserServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserServices userServices;


    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private CartService cartService;


    @PostMapping("/registre")
    public ResponseEntity<?>Registre(String firstname,String lastname,String email,String password){


        return userServices.Register(firstname,lastname,email,password);
    }

    @GetMapping("/auth")
    //@PreAuthorize("hasAuthority('SCOPE_USER')")
    public String Welcome(Authentication authentication){




        return "WElcome "+authentication.isAuthenticated();
    }

    @PostMapping("/verification")
    public ResponseEntity<?> Verify(Authentication authentication, String code,HttpServletRequest http){
        return userServices.Verify(authentication,code,http);
    }

    @PostMapping("/login")
    public ResponseEntity<?>login(String email,String password){
        return userServices.login(email,password);
    }
    @GetMapping("/getItemcart")
    //@PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?>userCart(Authentication authentication,HttpServletRequest http) throws IOException {
        return cartService.LoaduserCart(authentication,http) ;
    }
    @PutMapping("/plusitemcart")
    public ResponseEntity<?>plusitemcart(Authentication authentication,String operation,int id,HttpServletRequest http){

        return cartService.plusitemcart(authentication,id,operation,http);
    }


}
