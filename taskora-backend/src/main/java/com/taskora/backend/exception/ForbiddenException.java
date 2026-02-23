package com.taskora.backend.exception;

/**
 * Исключение для отлова ситуаций, когда доступ к определенному элементу запрещен.
 */
public class ForbiddenException extends RuntimeException {
    
    public ForbiddenException(String message) {
        super(message);
    }
}
