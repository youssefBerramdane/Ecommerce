package com.example.ecommerce.Service;

import com.example.ecommerce.Entity.Categorie;
import com.example.ecommerce.Entity.CategorieProjection;
import com.example.ecommerce.Entity.Product;
import com.example.ecommerce.Repositories.CategorieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;


@Service
public class CategorieService {
    @Autowired
    private CategorieRepo categorieRepo;

    public List<Categorie> GetAllCategorie(){
        return categorieRepo.findAll();
    }

    public ResponseEntity<?> AddCategorie(String name, MultipartFile image) throws IOException {
        String FileName= new Date().getTime()+image.getOriginalFilename();
        Files.copy(image.getInputStream(), Paths.get("src/main/resources/images/"+FileName));
        Categorie cat=new Categorie();
        cat.setImage(FileName);
        cat.setName(name);
        categorieRepo.save(cat);
        return ResponseEntity.ok("Categorie was aded");
    }

    public ResponseEntity<?> UpdateCategorie(int id,String name,MultipartFile image) throws IOException {
        Categorie cat=new Categorie();
        if(image!=null){
            cat.setImage(new Date().getTime()+image.getOriginalFilename());
            Files.delete(Paths.get("./src/main/resources/images/"+categorieRepo.findById(id).get().getImage()));
        }else{

        }

        cat.setId(id);
        cat.setName(name);
        categorieRepo.save(cat);
        return ResponseEntity.ok("Categorie was updated");
    }

    public ResponseEntity<?> GetCategorieByID(int id){
        Optional<Categorie> cat =categorieRepo.findById(id);
        if(cat.isPresent()){
            return ResponseEntity.ok(cat.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> DeleteCategorie(int id){
        Optional<Categorie> cat = categorieRepo.findById(id);
        if(cat.isPresent()){
            categorieRepo.delete(cat.get());
            return ResponseEntity.ok("Categorie was deleted");
        }else{
            return ResponseEntity.badRequest().body("Categorie Not found");
        }
    }

    public ResponseEntity<?> SomeCategories() throws IOException {
        List<Categorie> categories= categorieRepo.findAll();
        Random rand= new Random();
        ArrayList<Categorie> Categories=new ArrayList<>();
        ArrayList<Integer> numbers=new ArrayList<>();
        while (Categories.size()<6){

            int number=rand.nextInt(categories.size());
            if(numbers.contains(number)){

            }else{
                numbers.add(number);
                categories.get(number).setImage(ConvertToBase64(categories.get(number).getImage()));
                Categories.add(categories.get(number));
            }
        }
        return ResponseEntity.ok(Categories);

    }


    public String ConvertToBase64(String namefile) throws IOException {
        File ImageFile=new File("src/main/resources/images/"+namefile);
        FileInputStream fileInputStream= new FileInputStream(ImageFile);
        byte[] bytes=new byte[(int) ImageFile.length()];
        fileInputStream.read(bytes);
        fileInputStream.close();
        return Base64.getEncoder().encodeToString(bytes);
    }
}
