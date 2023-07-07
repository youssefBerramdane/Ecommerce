package com.example.ecommerce.Controllers;

import com.example.ecommerce.Entity.CartItems;
import com.example.ecommerce.Repositories.CartItemsRepo;
import com.example.ecommerce.Service.CartService;
import com.example.ecommerce.Service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;
    @GetMapping("/allproducts/page/{nb}")
    public ResponseEntity<?>GetAllProducts(@PathVariable(required = false) int nb,
                                           @RequestParam(required = false) String sort,
                                           @RequestParam(required = false) String order,
                                           @RequestParam(required = false) String search,
                                           @RequestParam(required = false)  List<String> price,
                                           @RequestParam(required = false) List<String> sizes,
                                           @RequestParam(required = false) List<String> colors){

        return productService.GetAllProducts(nb,sort,order,search,price,sizes,colors);
    }


    @PostMapping("/newproduct")
    public ResponseEntity<?>NewProduct(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam MultipartFile image,
            @RequestParam int quantity,
            @RequestParam int CatId,
            @RequestParam List<String> colors,
            @RequestParam List<String> sizes
            ) throws IOException {
        return ResponseEntity.ok(productService.NewProduct(name,description,price,quantity,CatId,image,colors,sizes));
    }

    @GetMapping("/trendsproducts")
    public ResponseEntity<?>GetTrendsProducts(){
        return ResponseEntity.ok(productService.GetTrendProduct());
    }

    @GetMapping("/Categorie/{id}")
    public ResponseEntity<?>GetProductsByCategorie(@PathVariable int id){
        return ResponseEntity.ok(productService.GetProductsByCategorie(id));
    }

    @GetMapping("/productSimilar/{id}")
    public ResponseEntity<?>ProductSimilar(@PathVariable int id) throws IOException {
        return productService.ProductSimilar(id);
    }

    @GetMapping("/productdetails/{id}")
    public ResponseEntity<?>GetProductDetails(@PathVariable int id) throws IOException {
        return ResponseEntity.ok(productService.GetProductById(id));
    }
    @GetMapping("/someproducts")
    public ResponseEntity<?>SomeProducts() throws IOException {
        return productService.SomeProducts();
    }
    @PostMapping("/addProductToCart/{id}")
    public ResponseEntity<?>AddProductToCart(HttpServletRequest http,@PathVariable int id,String quantity,String size,String color){

        return productService.AddProductToCart(http,id,quantity,size,color);
    }





}
