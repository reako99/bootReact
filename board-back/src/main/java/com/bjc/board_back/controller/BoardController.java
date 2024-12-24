package com.bjc.board_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bjc.board_back.dto.request.board.PostBoardRequestDto;
import com.bjc.board_back.dto.response.board.GetBoardResponseDto;
import com.bjc.board_back.dto.response.board.PostBoardResponseDto;
import com.bjc.board_back.dto.response.board.PutFavoriteResponseDto;
import com.bjc.board_back.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBaord(
        @PathVariable("boardNumber") Integer boardNumber
    ) {
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
        return response;
    }

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
        @RequestBody @Valid PostBoardRequestDto requestBody,
        @AuthenticationPrincipal String email
    ) {
       ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
       return response;
    }

    @PutMapping("/{boardNumber}")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
        @PathVariable("boardNumber") Integer boardNumber,
        @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(boardNumber, email);
        return response;
    }
    
}
