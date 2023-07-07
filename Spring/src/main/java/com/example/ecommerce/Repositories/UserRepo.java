package com.example.ecommerce.Repositories;

import com.example.ecommerce.Entity.Euser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Euser,Integer> {

    Optional<Euser> findEuserByEmail(String Email);


}
