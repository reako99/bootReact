package com.bjc.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bjc.board_back.dto.request.auth.SignUpRequestDto;
import com.bjc.board_back.dto.response.ResponseDto;
import com.bjc.board_back.dto.response.auth.SignUpResponseDto;
import com.bjc.board_back.entity.UserEntity;
import com.bjc.board_back.repository.UserRepository;
import com.bjc.board_back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        
        try {
            
            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if (existedEmail) return SignUpResponseDto.duplicateEmail();
            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if (existedNickname) return SignUpResponseDto.duplicateNickname();
            String telNumber = dto.getTelNumber();
            boolean existedTelNumber = userRepository.existsByTelNumber(telNumber);
            if (existedTelNumber) return SignUpResponseDto.duplicateTelNumber();

            String password = dto.getPassword();
            String EncodedPassword = passwordEncoder.encode(password);
            dto.setPassword(EncodedPassword);
            UserEntity userEntity = new UserEntity(dto);

            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return SignUpResponseDto.success();
    }
    
}
