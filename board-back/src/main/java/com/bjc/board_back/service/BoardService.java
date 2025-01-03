package com.bjc.board_back.service;

import org.springframework.http.ResponseEntity;

import com.bjc.board_back.dto.request.board.PatchBoardRequestDto;
import com.bjc.board_back.dto.request.board.PostBoardRequestDto;
import com.bjc.board_back.dto.request.board.PostCommentRequestDto;
import com.bjc.board_back.dto.response.board.DeleteBoardResponseDto;
import com.bjc.board_back.dto.response.board.GetBoardResponseDto;
import com.bjc.board_back.dto.response.board.GetCommentListResponseDto;
import com.bjc.board_back.dto.response.board.GetFavoriteListResponseDto;
import com.bjc.board_back.dto.response.board.GetLatestBoardListResponseDto;
import com.bjc.board_back.dto.response.board.GetSearchBoardResponseDto;
import com.bjc.board_back.dto.response.board.IncreaseViewCountResponseDto;
import com.bjc.board_back.dto.response.board.PatchBoardResponseDto;
import com.bjc.board_back.dto.response.board.PostBoardResponseDto;
import com.bjc.board_back.dto.response.board.PostCommentResponseDto;
import com.bjc.board_back.dto.response.board.PutFavoriteResponseDto;
import com.bjc.board_back.dto.response.board.GetTop3BoardListResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer baordNumber);
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();
    ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();
    ResponseEntity<? super GetSearchBoardResponseDto> getSearchBoardList(String searchWord, String preSearchWord);

    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email);
    
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

    ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);

    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);

    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);

}
