// package com.taskora.backend.entity;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;

// Не используется
// @Entity
// public class Settings {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     Long id;

//     @OneToOne(cascade = CascadeType.ALL)
//     @JoinColumn(name = "user_id")
//     User user;

//     @Column(columnDefinition = "BOOLEAN DEFAULT true")
//     Boolean dark_mode;

//     @Column(columnDefinition = "BOOLEAN DEFAULT false")
//     Boolean notifications_enabled;
// }
