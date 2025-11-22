package com.taskora.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.taskora.backend.dto.ErrorMessageDTO;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<?> handleForbidden(ForbiddenException ex) {
        return ResponseEntity
            .status(403)
            .body(new ErrorMessageDTO(ex.getMessage()));
    }
    
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFound(NotFoundException ex) {
        return ResponseEntity
            .notFound()
            .build();
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<?> handleAlreadyExists(AlreadyExistsException ex) {
        return ResponseEntity
            .status(409)
            .body(new ErrorMessageDTO(ex.getMessage()));
    }
}
