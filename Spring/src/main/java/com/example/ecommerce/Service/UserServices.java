package com.example.ecommerce.Service;

import com.example.ecommerce.Entity.Cart;
import com.example.ecommerce.Entity.Euser;
import com.example.ecommerce.Exeption.userAlreadyexists;
import com.example.ecommerce.Mail.EmailService;
import com.example.ecommerce.Repositories.CartRepo;
import com.example.ecommerce.Repositories.UserRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.ClaimAccessor;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserServices {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EuserDetailService euserDetailService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;
    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private JwtEncoder jwtEncoder;

    public ResponseEntity<?>Register(String firstname,String lastname,String email,String password) {

        Map<String,String>map=new HashMap<>();
        if(!Validpassword(password) ||!ValidEmail(email) || firstname.length()<1 || lastname.length()<1 ){
            return ResponseEntity.status(402).body("please insert a valid data");
        }else{
            String Firstname = filterchain(firstname);
            String Lasttname = filterchain(lastname);
            String Email = filterchain(email);

            if (euserDetailService.loadUserByEmail(email)) {
                Random r = new Random();
                Instant instant= Instant.now();
                int number = r.nextInt(100000,999999);
                emailService.sendmail(Email,"Confirm you",String.valueOf(number));
                userRepo.save(new Euser(firstname,lastname,passwordEncoder.encode(password),email,"user"));
                JwtClaimsSet jwt = JwtClaimsSet.builder()
                        .issuedAt(instant)
                        .expiresAt(instant.plus(30, ChronoUnit.MINUTES))
                        .subject(Email)
                        .claim("code",number+450431)
                        .claim("scope","USER")
                        .issuer("security-service")
                        .build();
                String token=jwtEncoder.encode(JwtEncoderParameters.from(jwt)).getTokenValue();


                map.put("token",token);

                return ResponseEntity.ok(map);
            } else {

                return ResponseEntity.status(500).body("email already existe");
            }
        }

    }


    public String  filterchain(String string){
        return  string.replace("^[a-zA-Z0-9]@","");
    }

    public ResponseEntity<?>Verify(Authentication authentication, String code, HttpServletRequest http){
        if(code.matches("\\d+")){
            int sendedcode=Integer.valueOf(jwtDecoder.decode(http.getHeader("Authorization").substring(7)).getClaims().get("code").toString());
            if(sendedcode-450431!=Integer.valueOf(code)){
                return ResponseEntity.internalServerError().body("code incorrect");
            }else{
                String email=authentication.getName();
                Optional<Euser> existe=userRepo.findEuserByEmail(email);
                if(existe.isPresent()){
                    existe.get().setVerify("T");
                    userRepo.save(existe.get());
                    cartRepo.save(new Cart(existe.get()));
                    return ResponseEntity.ok("ok");
                }else{
                    return ResponseEntity.internalServerError().body("email not existe");
                }
            }
        }else{
            return ResponseEntity.badRequest().body("code contains only chiffres");
        }
    }
    public ResponseEntity<?>login(String email,String password){


        if(ValidEmail(email)){
            Optional<Euser> emailexiste=userRepo.findEuserByEmail(email);
            if(emailexiste.isPresent()){
                if(emailexiste.get().getVerify().contains("T")){
                    if(passwordEncoder.matches(password,emailexiste.get().getPassword())){
                        Instant instant=Instant.now();
                        JwtClaimsSet jwtClaimsSet= JwtClaimsSet.builder()
                                .issuedAt(instant)
                                .expiresAt(instant.plus(24,ChronoUnit.HOURS))
                                .id(String.valueOf(emailexiste.get().getId()))
                                .issuer("security-service")
                                .claim("scope", Arrays.stream(emailexiste.get().getRoles().split(",")).toList())
                                .claim("firstname",emailexiste.get().getFirstName())
                                .claim("lastname",emailexiste.get().getLastName())
                                .build();
                        String token=jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue();

                        return ResponseEntity.ok(token);
                    }
                }else{
                    Map<String,String> map=new HashMap<>();
                    Random r = new Random();
                    Instant instant= Instant.now();
                    int number = r.nextInt(100000,999999);
                    emailService.sendmail(emailexiste.get().getEmail(),"Confirm you",String.valueOf(number));

                    JwtClaimsSet jwt = JwtClaimsSet.builder()
                            .issuedAt(instant)
                            .expiresAt(instant.plus(30, ChronoUnit.MINUTES))
                            .subject(emailexiste.get().getEmail())
                            .claim("code",number+450431)
                            .claim("scope","USER")
                            .issuer("security-service")
                            .build();
                    String token=jwtEncoder.encode(JwtEncoderParameters.from(jwt)).getTokenValue();
                    map.put("token",token);
                    map.put("message","you need confirme your email");
                    return ResponseEntity.status(403).body(map);
                }

            }
        }
            return ResponseEntity.status(402).body("email or password invalid");

    }

    public boolean Validpassword(String text){
        Pattern pattern1= Pattern.compile("[!#@%^*()_+\\-=\\[\\]{};:\"\\\\|,.<>/?]");
        Pattern patern2=Pattern.compile("[a-zA-Z0-9]");
        Matcher matcher2=patern2.matcher(text);
        Matcher matcher= pattern1.matcher(text);
        return  matcher.find()&&matcher2.find();
    }
    public static boolean ValidEmail(String email) {
        Pattern pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }






}
