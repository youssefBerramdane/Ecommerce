package com.example.ecommerce.Service;

import com.example.ecommerce.Entity.Euser;
import com.example.ecommerce.Exeption.userAlreadyexists;
import com.example.ecommerce.Repositories.UserRepo;
import com.example.ecommerce.Security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EuserDetailService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    public Boolean loadUserByEmail(String Email){
        Optional<Euser> user= userRepo.findEuserByEmail(Email);
        if(user.isPresent()){
            return Boolean.FALSE;
        }else{
            return true;
        }
    }
}
