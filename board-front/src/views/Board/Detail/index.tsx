import React, { useEffect, useState } from 'react';
import './style.css';
import FavoriteItem from 'components/FavoriteItem';
import { CommentListItem, FavoriteListItem } from 'types/interface';
import { commentListMock, favoriteListMock } from 'mocks';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { USER_PATH } from 'constant';

//          component: 게시물 상세 보기 컴포넌트          //
export default function BoardDetail() {

  //          state: board number path variable state            //
  const { boardNumber } = useParams();

  //          state: login user state            //
  const { loginUser } = useLoginUserStore();

  //          function: navigate function          //
  const navigator = useNavigate();
  
  //          component: 게시물 상세 상단 컴포넌트          //
  const BoardDetailTop = () => {

    //         state: more button state          //
    const [showMore, setShowMore] = useState<boolean>(false);
    //         state: board state          //
    const [board, setBoard] = useState<Board>();

    //         event handler: more button click event handler          //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);

    }

    //         event handler: more button click event handler          //
    const onNicknameClickHandler = () => {
      navigator(USER_PATH())
    }

    //         render : 게시물 상세 상단 컴포넌트 랜더링          //
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{'제목자리'}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{backgroundImage: `url(${defaultProfileImage})`}}></div>
              <div className='board-detail-writer-nickname'>{'닉네임'}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{'2024-12-27'}</div>
            </div>
            <div className='icon-button' onClick={onMoreButtonClickHandler}>
              <div className='icon more-icon'></div>
            </div>
            {showMore &&             
            <div className='board-detail-more-box'>
              <div className='board-detail-update-button'>{'수정'}</div>
              <div className='divider'></div>
              <div className='board-detail-delete-button'>{'삭제'}</div>
            </div>
            }
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{'본문'}</div>
          <img className='board-detail-main-image' />
        </div>
      </div>
    );
  }

  //          component: 게시물 상세 하단 컴포넌트          //
  const BoardDetailBottom = () => {

    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    const [commentList, setCommentList] = useState<CommentListItem[]>([]);

    useEffect(() => {
      setFavoriteList(favoriteListMock);
      setCommentList(commentListMock);
    }, []);

    //         render : 게시물 상세 하단 컴포넌트 랜더링          //
    return (
      <div id='board-detail-bottom'>
        <div className='board-detail-bottom-button-box'>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button'>
              <div className='icon favorite-fill-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`좋아요 ${12}`}</div>
            <div className='icon-button'>
              <div className='icon up-light-icon'></div>
            </div>
          </div>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button'>
              <div className='icon comment-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`댓글 ${11}`}</div>
            <div className='icon-button'>
              <div className='icon up-light-icon'></div>
            </div>
          </div>
        </div>
        <div className='board-detail-bottom-favorite-box'>
          <div className='board-detail-bottom-favorite-container'>
            <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{12}</span></div>
            <div className='board-detail-bottom-favorite-contents'>
              { favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
            </div>
          </div>
        </div>
        <div className='board-detail-bottom-comment-box'>
          <div className='board-detail-bottom-comment-container'>
            <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{11}</span></div>
            <div className='board-detail-bottom-comment-list-container'>
              { commentList.map(item => <CommentItem commentListItem={item} />)}
            </div>
          </div>
          <div className='divider'></div>
          <div className='baord-detail-bottom-comment-pagination-box'>
            <Pagination />
          </div>
          <div className='board-detail-bottom-comment-input-box'>
            <div className='board-detail-bottom-comment-input-container'>
              <textarea className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' />
              <div className='board-detail-bottom-comment-button-box'>
                <div className='disable-button'>{'댓글달기'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //         render : 게시물 상세 보기 컴포넌트 랜더링          //
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}
