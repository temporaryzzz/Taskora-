package com.taskora.backend.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private int jwtExpirationMs;

    private SecretKey key;


    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Long id) {
        return Jwts.builder()
            .setSubject(String.valueOf(id))
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    public String getIdFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key).build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(token);

            return true;
        } catch (SecurityException e) {
            System.out.println("Невалидная JWT сигнатура: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Невалидный JWT токен: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT токен истек: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT токен не поддерживается: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims пустой: " + e.getMessage());
        }

        return false;
    }
}
