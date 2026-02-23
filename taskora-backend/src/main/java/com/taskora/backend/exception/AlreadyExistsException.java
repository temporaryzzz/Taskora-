package com.taskora.backend.exception;

/**
 * Исключение для ситуаций, когда элемент уже существует
 */
public class AlreadyExistsException extends RuntimeException {
    
    public AlreadyExistsException(String message) {
        super(message);
    }
}