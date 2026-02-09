package com.taskora.backend.exception;

/**
 * Исключение для отлова ситуаций, когда элемент не найден в репозитории.
 */
public class NotFoundException extends RuntimeException {
    
    public NotFoundException() {
        super();
    }
}
