package com.taskora.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthProperties {

    @Value("${auth.session.seconds}")
    private long seconds;

    
    public long getSeconds() {
        return seconds;
    }

    public long getMillis() {
        return seconds * 1000;
    }

    public void setSeconds(long seconds) {
        this.seconds = seconds;
    }
}