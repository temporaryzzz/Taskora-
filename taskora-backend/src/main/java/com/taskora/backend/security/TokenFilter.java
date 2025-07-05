package com.taskora.backend.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private JwtCore jwtCore;
    private UserDetailsService userDetailsService;

    public TokenFilter(JwtCore jwtCore, UserDetailsService userDetailsService) {
        this.jwtCore = jwtCore;
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = null;
        String username = null;
        UserDetails userDetails = null;
        UsernamePasswordAuthenticationToken authenticationToken = null;

        try {
            String authenticationHeader = request.getHeader("Authorization");

            if (authenticationHeader != null && authenticationHeader.startsWith("Bearer "))
                jwt = authenticationHeader.substring(7);

            if (jwt != null)
                try {
                    username = jwtCore.getNameFromJwt(jwt);
                } catch (ExpiredJwtException e) { }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() != null) {
                userDetails = userDetailsService.loadUserByUsername(username);
                authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (Exception e) { }

        filterChain.doFilter(request, response);
    }
}
