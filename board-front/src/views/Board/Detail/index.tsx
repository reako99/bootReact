import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import FavoriteItem from 'components/FavoriteItem';
import { Board, CommentListItem, FavoriteListItem } from 'types/interface';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { deleteBoardRequest, getBoardRequest, getCommentListRequest, getFavoriteListRequest, increaseViewCountRequest, postCommentRequest, putFavoriteRequest } from 'apis';
import { ResponseDto } from 'apis/response';
import {GetCommentListResponseDto, GetFavoriteListResponseDto, IncreaseViewCountResponseDto, GetBoardResponseDto, PutFavoriteResponseDto, PostCommentResponseDto, DeleteBoardResponseDto } from 'apis/response/board';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { PostCommentRequestDto } from 'apis/request/board';
import { usePagination } from 'hooks';

//          component: 게시물 상세 보기 컴포넌트          //
export default function BoardDetail() {

  //         state: board state          //
  const [board, setBoard] = useState<Board | null>(null);

  //          state: board number path variable state            //
  const { boardNumber } = useParams();

  //          state: login user state            //
  const { loginUser } = useLoginUserStore();

  //          state: cookie state          //
  const [cookies, setCookies] = useCookies();

  //         state: is writer state          //
  const [isWriter, setWriter] = useState<boolean>(false);

  //          function: get board response function          //
  const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if ( code === 'NB') alert('존재하지 않는 게시물입니다.');
    if ( code === 'DBE') alert('데이터베이스 오류입니다.');
    if ( code !== 'SU') {
      navigate(MAIN_PATH());
      return;
    }
    const board:Board = {...responseBody as GetBoardResponseDto};
    setBoard(board);
    if (!loginUser) {
      setWriter(false);
      return;
    }
    const isWriter = loginUser.email === board.writerEmail;
    setWriter(isWriter);
  }

  //         effect: reload board when board number path variable change           //
  useEffect(() => {
    if (!boardNumber) {
      navigate(MAIN_PATH());
      return;
    }
    getBoardRequest(boardNumber).then(getBoardResponse);
    
  } , [boardNumber])


  //          function: navigate function          //
  const navigate = useNavigate();

  //         function: increase view count function          //
  const increaseViewCountResponse = (responseBody : IncreaseViewCountResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');

  }
  
  //          component: 게시물 상세 상단 컴포넌트          //
  const BoardDetailTop = () => {

    
    //         state: more button state          //
    const [showMore, setShowMore] = useState<boolean>(false);
    

    //           function: change date format function          //
    const getWriteDatetimeFormat = () => {
      if (!board) return;
      const date = dayjs(board.writeDatetime);
      return date.format('YYYY. MM. DD.');
    }

    

    //          function: delete board response function          //
    const deleteBoardResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return ;
      const { code } = responseBody;
      if ( code === 'VF') alert('잘못된 접근입니다.');
      if ( code === 'NU') alert('존재하지 않는 유저입니다.');
      if ( code === 'NB') alert('존재하지 않는 게시물입니다.');
      if ( code === 'AF') alert('인증에 실패했습니다.');
      if ( code === 'NP') alert('권한이 없습니다.');
      if ( code === 'DBE') alert('데이터베이스 오류입니다.');
      if ( code !== 'SU') {
        return;
      }
      navigate(MAIN_PATH());
    }

    

    //         event handler: more button click event handler          //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);

    }

    //         event handler: update button click event handler          //
    const onUpdateButtonClickHandler = () => {
      if(!board || !loginUser) return;
      if(loginUser.email !== board.writerEmail) return;
      navigate(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(board.boardNumber));
    }

    //         event handler: delete button click event handler          //
    const onDeleteButtonClickHandler = () => {
      if(!board || !loginUser || !boardNumber || !cookies.accessToken) return;
      if(loginUser.email !== board.writerEmail) return;
      deleteBoardRequest(boardNumber, cookies.accessToken).then(deleteBoardResponse);
    }

    //         event handler: nickname click event handler          //
    const onNicknameClickHandler = () => {
      if (!board) return;
      navigate(USER_PATH(board.writerEmail));
    }

    

    
    //         render : 게시물 상세 상단 컴포넌트 랜더링          //
    if (!board) return <></>
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{board.title}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{backgroundImage: `url(${board.writerProfileImage? board.writerProfileImage : defaultProfileImage})`}}></div>
              <div className='board-detail-writer-nickname' onClick={onNicknameClickHandler}>{board.writerNickname}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{getWriteDatetimeFormat()}</div>
            </div>
            {isWriter && 
            <div className='icon-button' onClick={onMoreButtonClickHandler}>
              <div className='icon more-icon'></div>
            </div>
            }
            {showMore &&             
            <div className='board-detail-more-box'>
              <div className='board-detail-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
              <div className='divider'></div>
              <div className='board-detail-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
            </div>
            }
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{board.content}</div>
          {board.boardImageList.map(image => <img className='board-detail-main-image' src={image}/>)}          
        </div>
      </div>
    );
  }

  //          component: 게시물 상세 하단 컴포넌트          //
  const BoardDetailBottom = () => {

    
    //           state: favorite list state           //
    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);


    //           function: get favorite list response handler function           //
    const getFavoriteListResponse = (responseBody : GetFavoriteListResponseDto | ResponseDto | null) => {
      if (!responseBody) return ;
      const { code } = responseBody;
      if ( code === 'NB') alert('존재하지 않는 게시물입니다.');
      if ( code === 'DBE') alert('데이터베이스 오류입니다.');
      if ( code !== 'SU') {
        return;
      }
      const { favoriteList } = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);
      if (!loginUser) {
        setFavorite(false);
        return;
      }
      const isFavorite =  favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1
      setFavorite(isFavorite);
    }

    //           function: get comment list response handler function           //
    const getCommentListResponse = (responseBody : GetCommentListResponseDto | ResponseDto | null) => {
      if (!responseBody) return ;
      const { code } = responseBody;
      if ( code === 'NB') alert('존재하지 않는 게시물입니다.');
      if ( code === 'DBE') alert('데이터베이스 오류입니다.');
      if ( code !== 'SU') {
        return;
      }
      const { commentList } = responseBody as GetCommentListResponseDto;
      setTotalList(commentList);
      setTotalCommentCount(commentList.length);
    }

    //           function: put favorite response handler function           //
    const putFavoriteResponse = (responseBody: PutFavoriteResponseDto | ResponseDto | null) => {
      if (!responseBody) return ;
      const { code } = responseBody;
      if ( code === 'VF') alert('잘못된 접근입니다.');
      if ( code === 'NU') alert('존재하지 않는 유저입니다.');
      if ( code === 'NB') alert('존재하지 않는 게시물입니다.');
      if ( code === 'AF') alert('인증에 실패했습니다.');
      if ( code === 'DBE') alert('데이터베이스 오류입니다.');
      if ( code !== 'SU') {
        return;
      }
      if (!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
    }

    //           function: post comment response handler function           //
    const postCommentResponse = (responseBody : PostCommentResponseDto | ResponseDto | null ) => {
      if (!responseBody) return ;
      const { code } = responseBody;
      if ( code === 'VF') alert('잘못된 접근입니다.');
      if ( code === 'NU') alert('존재하지 않는 유저입니다.');
      if ( code === 'NB') alert('존재하지 않는 게시물입니다.');
      if ( code === 'AF') alert('인증에 실패했습니다.');
      if ( code === 'DBE') alert('데이터베이스 오류입니다.');
      if ( code !== 'SU') {
        return;
      }
      setComment('');
      if (!boardNumber) return;
      getCommentListRequest(boardNumber).then(getCommentListResponse);
    }

    //         effect: reload board when board number path variable change           //
    useEffect(() => {
      if (!boardNumber) {
        navigate(MAIN_PATH());
        return;
      }
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
      getCommentListRequest(boardNumber).then(getCommentListResponse);
    } , [boardNumber])

    //           state: comment textarea ref state          //
    const commentRef = useRef<HTMLTextAreaElement | null >(null);

    //           state: favorite state           //
    const [isFavorite, setFavorite] = useState<boolean>(false);
    //           state: show favorite state           //
    const [showFavorite, setShowFavorite] = useState<boolean>(false);
    //           state: show comment state           //
    const [showComment, setShowComment] = useState<boolean>(false);
    //           state: pagination state            //
    const { 
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentPage, setCurrentSection, setTotalList 
    } = usePagination<CommentListItem>(3);
    
    //           state: comment state           //
    const [comment, setComment] = useState<string>('');
    //           state: total comment count state           //
    const [totalCommentCount, setTotalCommentCount] = useState<number>(0);

    //           event handler: favorite click event handler          //
    const onFavoriteClickHandler = () => {
      if (!loginUser || !cookies.accessToken || !boardNumber) return ;
      putFavoriteRequest(boardNumber, cookies.accessToken).then(putFavoriteResponse);
    }

    //           event handler: show favorite click event handler          //
    const onShowFavoriteClickHandler = () => {
      setShowFavorite(!showFavorite);
    }

    //           event handler: show comment click event handler          //
    const onShowCommentClickHandler = () => {
      setShowComment(!showComment);
    }

    //           event handler: comment submit button click event handler          //
    const onCommentSubmitButtonClickHandler = () => {
      if (comment.trim()==='' || !boardNumber || !loginUser || !cookies.accessToken ) return;
      const requestBody:PostCommentRequestDto = {content:comment};
      postCommentRequest(requestBody, cookies.accessToken, boardNumber).then(postCommentResponse);
    }

    //           event handler: comment change event handler          //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);
      if(!commentRef.current) return;
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }

  

    //         render : 게시물 상세 하단 컴포넌트 랜더링          //
    if (!board) return <></>
    return (
      <div id='board-detail-bottom'>
        <div className='board-detail-bottom-button-box'>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button' onClick={onFavoriteClickHandler}>
              {isFavorite?
              <div className='icon favorite-fill-icon'></div> :
              <div className='icon favorite-light-icon'></div>
              }              
            </div>
            <div className='board-detail-bottom-button-text'>{`좋아요 ${favoriteList.length}`}</div>
            <div className='icon-button' onClick={onShowFavoriteClickHandler}>
              {showFavorite ? 
              <div className='icon up-light-icon'></div> :
              <div className='icon down-light-icon'></div>
              }
            </div>
          </div>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button'>
              <div className='icon comment-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`댓글 ${totalCommentCount}`}</div>
            <div className='icon-button' onClick={onShowCommentClickHandler}>
              {showComment ? 
              <div className='icon up-light-icon'></div> :
              <div className='icon down-light-icon'></div>
              }
            </div>
          </div>
        </div>
        {showFavorite && 
        <div className='board-detail-bottom-favorite-box'>
          <div className='board-detail-bottom-favorite-container'>
            <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{favoriteList.length}</span></div>
            <div className='board-detail-bottom-favorite-contents'>
              { favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
            </div>
          </div>
        </div>
        }
        {showComment &&
        <div className='board-detail-bottom-comment-box'>
          <div className='board-detail-bottom-comment-container'>
            <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{totalCommentCount}</span></div>
            <div className='board-detail-bottom-comment-list-container'>
              { viewList.map(item => <CommentItem commentListItem={item} />)}
            </div>
          </div>
          <div className='divider'></div>
          <div className='baord-detail-bottom-comment-pagination-box'>
            <Pagination 
            currentPage={currentPage}
            currentSection={currentSection}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            viewPageList={viewPageList}
            totalSection={totalSection}
            />
          </div>
          {loginUser !== null && 
          <div className='board-detail-bottom-comment-input-box'>
            <div className='board-detail-bottom-comment-input-container'>
              <textarea ref={commentRef} className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' onChange={onCommentChangeHandler} value={comment} />
              <div className='board-detail-bottom-comment-button-box'>
                <div className={comment.trim() === '' ? 'disable-button' : 'black-button' } onClick={onCommentSubmitButtonClickHandler}>{'댓글달기'}</div>
              </div>
            </div>
          </div>
          }
        </div>
        }
      </div>
    );
  }


  //          effect: increase view count when change board number path variable          //
  let effectFlag = true;
  useEffect(() => {
    if (!boardNumber) return;
    if (effectFlag) {
      effectFlag = false;
      return;
    }

    increaseViewCountRequest(boardNumber).then(increaseViewCountResponse);
  }, [boardNumber]);

  //         render : 게시물 상세 보기 컴포넌트 랜더링          //
  if (!board) return <h2>{'NOT FOUND 404'}</h2>
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}
