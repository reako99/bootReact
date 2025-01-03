package com.bjc.board_back.entity;

import com.bjc.board_back.dto.request.auth.SignUpRequestDto;

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

    private boolean agreedPersonal;

    public UserEntity(SignUpRequestDto dto){
        this.email = dto.getEmail();
    
        this.password = dto.getPassword();

        this.nickname = dto.getNickname();

        this.telNumber = dto.getTelNumber();

        this.address = dto.getAddress();

        this.addressDetail = dto.getAddressDetail();

        this.agreedPersonal = dto.getAgreedPersonal();
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
