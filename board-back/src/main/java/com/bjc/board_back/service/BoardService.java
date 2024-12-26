package com.bjc.board_back.service;

import org.springframework.http.ResponseEntity;

import com.bjc.board_back.dto.request.board.PostBoardRequestDto;
import com.bjc.board_back.dto.request.board.PostCommentRequestDto;
import com.bjc.board_back.dto.response.board.GetBoardResponseDto;
import com.bjc.board_back.dto.response.board.GetCommentListResponseDto;
import com.bjc.board_back.dto.response.board.GetFavoriteListResponseDto;
import com.bjc.board_back.dto.response.board.PostBoardResponseDto;
import com.bjc.board_back.dto.response.board.PostCommentResponseDto;
import com.bjc.board_back.dto.response.board.PutFavoriteResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer baordNumber);

    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email);
    
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

}
