package com.example.ecommerce.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;

public class Outils {
    static public String ConvertToBase64(String namefile) throws IOException {
        File ImageFile=new File("src/main/resources/images/"+namefile);
        FileInputStream fileInputStream= new FileInputStream(ImageFile);
        byte[] bytes=new byte[(int) ImageFile.length()];
        fileInputStream.read(bytes);
        fileInputStream.close();
        return Base64.getEncoder().encodeToString(bytes);
    }
}
