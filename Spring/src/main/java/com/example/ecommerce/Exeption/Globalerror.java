package com.example.ecommerce.Exeption;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

public class Globalerror extends ResponseEntityExceptionHandler {

    @ExceptionHandler(userAlreadyexists.class)
    public ResponseEntity<?>handleException(userAlreadyexists ex){
        errorclass err=new errorclass(ex.getMessage(), HttpStatus.NOT_FOUND);
        return ResponseEntity.status(err.getHttpStatus()).body(err);

    }

}
