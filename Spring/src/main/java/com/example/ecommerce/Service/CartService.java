package com.example.ecommerce.Service;

import com.example.ecommerce.Entity.Cart;
import com.example.ecommerce.Entity.CartItemView;
import com.example.ecommerce.Entity.CartItems;
import com.example.ecommerce.Repositories.CartItemsRepo;
import com.example.ecommerce.Repositories.CartRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartItemsRepo cartItemsRepo;

    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private JwtDecoder jwtDecoder;

    public ResponseEntity<?>LoaduserCart(Authentication authentication, HttpServletRequest http) throws IOException {
        List<CartItemView> cartItemViews=new ArrayList<>();
        int iduser=Integer.valueOf(jwtDecoder.decode(http.getHeader("Authorization").substring(7)).getClaims().get("jti").toString());
        Optional<Cart> UserCart=cartRepo.findCartByuserId(iduser);
        if(UserCart.isPresent()){
            for (CartItems cart:cartItemsRepo.findCartItemsByCartId(UserCart.get().getId())) {
                cartItemViews.add(new CartItemView(
                        cart.getProduct().getId(),
                        cart.getProduct().getName(),
                        Outils.ConvertToBase64(cart.getProduct().getImage()),
                        cart.getProduct().getPrice(),
                        cart.getQuantity(),
                        cart.getCart().getUser().getFirstName()+cart.getCart().getUser().getLastName()
                ));
            }



            /*CartItemView cartItemView=;*/
            return ResponseEntity.ok(cartItemViews);
        }else{
            return ResponseEntity.status(404).body("user not found");
        }

    }

    public ResponseEntity<?>plusitemcart(Authentication authentication,int id,String operation,HttpServletRequest http){
        int userId=Integer.valueOf(jwtDecoder.decode(http.getHeader("Authorization").substring(7)).getClaims().get("jti").toString());
        Optional<Cart> cartuser=cartRepo.findCartByuserId(userId);
        if(cartuser.isPresent()){
            Optional <CartItems> cartItems=cartItemsRepo.findCartItemsByProductId(id);
            if(cartItems.isPresent()){
                if(operation.contains("+")){
                    cartItems.get().setQuantity(cartItems.get().getQuantity()+1);
                    cartItemsRepo.save(cartItems.get());
                }else{
                    if(cartItems.get().getQuantity()==1){
                        cartItemsRepo.deleteCartItemsByProductId(id);
                    }else{
                        cartItems.get().setQuantity(cartItems.get().getQuantity()-1);
                        cartItemsRepo.save(cartItems.get());
                    }
                }


                return ResponseEntity.ok("ok");
            }
        }
        return ResponseEntity.status(402).body("something is wrong");

    }
}
