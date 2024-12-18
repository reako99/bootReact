package com.bjc.board_back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="user")
@Table(name="user")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    private String email;
    
    private String password;

    private String nickname;

    private String telNumber;

    private String address;

    private String addressDetail;

    private String profileImage;
}
