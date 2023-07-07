package com.example.ecommerce.Controllers;

import com.example.ecommerce.Entity.Categorie;
import com.example.ecommerce.Service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/categorie")
@CrossOrigin("http://localhost:3000")
public class CategorieController {
    @Autowired
    private CategorieService categorieService;

    @GetMapping("/all")
    public List<Categorie> GetAllCAtegorie(){
        return categorieService.GetAllCategorie();
    }

    @PostMapping("/new")
    public ResponseEntity<?> NewCategorie(@RequestParam(name = "name") String name, @RequestParam(name = "image")MultipartFile image) throws IOException {
        return categorieService.AddCategorie(name,image);
    }
    @PutMapping("/update")
    public ResponseEntity<?> UpdateCategorie(@RequestParam(name = "id") int id ,@RequestParam(name = "name",required = false) String name,@RequestParam(name = "image",required = false) MultipartFile image) throws IOException {
        return categorieService.UpdateCategorie(id,name,image);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> DeleteCategorie(@PathVariable int id){
        return  categorieService.DeleteCategorie(id);
    }
    @GetMapping("/somecategorie")
    public ResponseEntity<?> SomeCategorie() throws IOException {
        return categorieService.SomeCategories();
    }

}
