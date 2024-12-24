package com.bjc.board_back.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bjc.board_back.dto.request.board.PostBoardRequestDto;
import com.bjc.board_back.dto.response.ResponseDto;
import com.bjc.board_back.dto.response.board.GetBoardResponseDto;
import com.bjc.board_back.dto.response.board.PostBoardResponseDto;
import com.bjc.board_back.dto.response.board.PutFavoriteResponseDto;
import com.bjc.board_back.entity.BoardEntity;
import com.bjc.board_back.entity.FavoriteEntity;
import com.bjc.board_back.entity.ImageEntity;
import com.bjc.board_back.repository.BoardRepository;
import com.bjc.board_back.repository.FavoriteRepository;
import com.bjc.board_back.repository.ImageRepository;
import com.bjc.board_back.repository.UserRepository;
import com.bjc.board_back.repository.resultSet.GetBoardResultSet;
import com.bjc.board_back.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImple implements BoardService{

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final FavoriteRepository favoriteRepository;

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        

        try {
            boolean existedEmail = userRepository.existsByEmail(email);
            if (!existedEmail) return PostBoardResponseDto.notExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for (String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }
            imageRepository.saveAll(imageEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostBoardResponseDto.success();
    }

	@Override
	public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = null;

		try {
            resultSet = boardRepository.getBoard(boardNumber);
            if (resultSet == null) return GetBoardResponseDto.noExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardResponseDto.success(resultSet, imageEntities);
        
	}

    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {
        try {
           boolean existedUser = userRepository.existsByEmail(email);
           if (!existedUser) return PutFavoriteResponseDto.noExistUser();
           BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
           if (boardEntity == null) return PutFavoriteResponseDto.noExistBoard();
        
           FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
           if (favoriteEntity == null) {
            favoriteEntity = new FavoriteEntity(email, boardNumber);
            favoriteRepository.save(favoriteEntity);
            boardEntity.incereaseFavoriteCount();
           }else{
            favoriteRepository.delete(favoriteEntity);
            boardEntity.decreaseFavoriteCount();
           }
           boardRepository.save(boardEntity);
           
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PutFavoriteResponseDto.success();
    }

    
    
}
