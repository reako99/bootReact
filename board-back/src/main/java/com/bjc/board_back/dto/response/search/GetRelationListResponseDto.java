package com.bjc.board_back.dto.response.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.bjc.board_back.common.ResponseCode;
import com.bjc.board_back.common.ResponseMessage;
import com.bjc.board_back.dto.response.ResponseDto;
import com.bjc.board_back.repository.resultSet.GetRelationListResultSet;

import lombok.Getter;

@Getter
public class GetRelationListResponseDto extends ResponseDto {

    private List<String> relationWordList;
    
    private GetRelationListResponseDto(List<GetRelationListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        List<String> relationWordList = new ArrayList<>();
        for (GetRelationListResultSet resultSet: resultSets) {
            relationWordList.add(resultSet.getSearchWord());
        }
        this.relationWordList = relationWordList;
    }

    public static ResponseEntity<GetRelationListResponseDto> success(List<GetRelationListResultSet> resultSets) {
        GetRelationListResponseDto result = new GetRelationListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    
}
