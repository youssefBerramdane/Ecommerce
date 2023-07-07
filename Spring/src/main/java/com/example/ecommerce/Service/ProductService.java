package com.example.ecommerce.Service;

import com.example.ecommerce.Entity.*;
import com.example.ecommerce.Repositories.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategorieRepo categorieRepo;
    @Autowired
    private CartItemsRepo cartItemsRepo;
    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private JwtDecoder jwtDecoder;

    public ResponseEntity<?>NewProduct(String name, String description, double price, int quantity, int id, MultipartFile image,List<String> colors,List<String> sizes) throws IOException {
        Categorie cat = categorieRepo.findById(id).get();
        String Filename = new Date().getTime()+image.getOriginalFilename();
        Files.copy(image.getInputStream(), Paths.get("src/main/resources/images/"+Filename));
        productRepo.save(new Product(name,description,Filename,price,quantity,cat, String.join(", ",colors), String.join(", ",sizes)));
        return ResponseEntity.ok("Product was aded");
    }

    public ResponseEntity<?>GetProductsByCategorie(int id){
        Optional<Categorie> cat= categorieRepo.findById(id);
        if(cat.isPresent()){
            List<Product> Products= productRepo.findProductsByCategorie(cat.get());
            return ResponseEntity.ok(Products);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?>ProductSimilar(int id) throws IOException {
        List<Product> products=productRepo.findProductsByCategorieId(id);

        Random rand= new Random();
        ArrayList<Product> Products=new ArrayList<>();
        ArrayList<Integer> numbers=new ArrayList<>();
        if(products.size()>3){
            while (Products.size()<4){
                int number=rand.nextInt(products.size());
                if(numbers.contains(number)){

                }else{
                    numbers.add(number);
                    products.get(number).setImage(Outils.ConvertToBase64(products.get(number).getImage()));
                    Products.add(products.get(number));
                }
            }
        }

        return ResponseEntity.ok(Products);
    }

    public ResponseEntity<?>GetTrendProduct(){
        List<Product> Products=productRepo.findAll().subList(0,7);
        return ResponseEntity.ok(Products);
    }

    public ResponseEntity<?>DeleteProduct(int id){
        productRepo.delete(productRepo.findById(id).get());
        return  ResponseEntity.ok("Product was deleted");
    }
    public ResponseEntity<?>GetProductById(int id) throws IOException {
        Optional<Product> Prd=productRepo.findById(id);
        if(Prd.isPresent()){
            Prd.get().setImage(Outils.ConvertToBase64(Prd.get().getImage()));
            return ResponseEntity.ok(Prd.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    public ResponseEntity<?>SomeProducts() throws IOException {
        List<Product> products=productRepo.findAll();
        Random rand= new Random();
        ArrayList<Product> Products=new ArrayList<>();
        ArrayList<Integer> numbers=new ArrayList<>();
        while (Products.size()<8){
            int number=rand.nextInt(products.size()-1);
            if(numbers.contains(number)){

            }else{
                numbers.add(number);
                products.get(number).setImage(Outils.ConvertToBase64(products.get(number).getImage()));
                Products.add(products.get(number));
            }
        }
        return ResponseEntity.ok(Products);
    }

    public ResponseEntity<?>GetAllProducts(int nb,String sort,String order,String search,List<String> price,List<String> size,List<String> color){

       Pageable page;
        Page<Product>products;

        if(sort!=null && !sort.isBlank()){
            page= PageRequest.of(nb,9,order.equals("desc")?Sort.by(sort).descending():Sort.by(sort).ascending());
        }else{
            page= PageRequest.of(nb,9,Sort.by("id").descending());
        }
        if(search!=null){
            products=productRepo.findProductsByNameContaining(search,page);
        }else{
            products=productRepo.findAll(page);
        }



        products.forEach(product -> {
            try {
                product.setImage(Outils.ConvertToBase64(product.getImage()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return ResponseEntity.ok(products);
    }
    public ResponseEntity<?> AddProductToCart(HttpServletRequest http,int id,String quantity,String size,String color){
        try{
            String userid=jwtDecoder.decode(http.getHeader(("Authorization")).substring(7)).getClaims().get("jti").toString();
            Optional<Cart> cartUser=cartRepo.findCartByuserId(Integer.valueOf(userid));
            if(cartUser.isPresent()){
                Optional<CartItems> product=cartItemsRepo.findCartItemsByProductId(id);
                if(product.isPresent()){
                    product.get().setQuantity(product.get().getQuantity()+1);
                    cartItemsRepo.save(product.get());
                }else {
                    cartItemsRepo.save(new CartItems(Integer.valueOf(quantity),productRepo.findById(id).get(),cartUser.get(),size,color));
                }

            }else{
                return ResponseEntity.status(403).body("Some things is Wrong");
            }

        }catch (Exception e){
            return ResponseEntity.status(403).body("Some things is Wrong");
        }
        return ResponseEntity.ok("Product was aded");
    }


}
