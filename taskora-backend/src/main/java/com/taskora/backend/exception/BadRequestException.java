package com.taskora.backend.exception;

/**
 * Исключение для отлова некорректных запросов.
 */
public class BadRequestException extends RuntimeException {
    
    public BadRequestException(String message) {
        super(message);
    }
}
