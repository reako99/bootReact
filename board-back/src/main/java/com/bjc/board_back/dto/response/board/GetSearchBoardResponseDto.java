package com.bjc.board_back.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.bjc.board_back.common.ResponseCode;
import com.bjc.board_back.common.ResponseMessage;
import com.bjc.board_back.dto.object.BoardListItem;
import com.bjc.board_back.dto.response.ResponseDto;
import com.bjc.board_back.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetSearchBoardResponseDto extends ResponseDto{

    private List<BoardListItem> searchList;

    private GetSearchBoardResponseDto(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.searchList = BoardListItem.getList(boardListViewEntities);
    }

    public static ResponseEntity<GetSearchBoardResponseDto> success (List<BoardListViewEntity> boardListViewEntities) {
        GetSearchBoardResponseDto result = new GetSearchBoardResponseDto(boardListViewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
}
