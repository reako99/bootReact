import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import defualtProfileImage from 'assets/image/default-profile-image.png';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import BoardItem from 'components/BoardItem';
import { AUTH_PATH, BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';
import { getUserRequest, patchProfileImageRequest, fileUploadRequest, patchNicknameRequest, getUserBoardListRequest } from 'apis';
import { GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from 'apis/request/user';
import { useCookies } from 'react-cookie';
import { usePagination } from 'hooks';
import { GetUserBoardListResponseDto } from 'apis/response/board';
import Pagination from 'components/Pagination';

//          component: 유저 화면 컴포넌트          //
export default function User() {
  
  //          state: user email state          //
  const { userEmail } = useParams();

  //          state: login user state          //
  const { loginUser } = useLoginUserStore();
  //          state: cookies state          //
  const [cookies, setCookie] = useCookies();
  //          state: my page state          //
  const [isMyPage, setMyPage] = useState<boolean>(false);



  
  
  
  //          function : navigate func          //
  const navigate = useNavigate();

  //         component: 유저 상단 화면 컴포넌트          //
  const UserTop = () => {

    //          state: image file input ref state           //
    const imageInputRef = useRef<HTMLInputElement | null >(null);
    
    //          state: nickname change state          //
    const [isNicknameChange, setNicknameChange] = useState<boolean>(false);

    //          state: nickname state          //
    const [nickname, setNickname] = useState<string>('');
    
    //          state: change nickname state          //
    const [changeNickname, setChangeNickname] = useState<string>('');
    
    //          state: profile image state          //
    const [profileImage, setProfileImage] = useState<string|null>(null);

    //          event handler : nickname edit button click event handler          //
    const onNicknameEditButtonClickHandler = () => {
      if (!isNicknameChange || nickname === changeNickname) {
        setChangeNickname(nickname);
        setNicknameChange(!isNicknameChange);
        return;
      } 
      const requestBody: PatchNicknameRequestDto = {
        nickname: changeNickname
      };
      patchNicknameRequest(requestBody, cookies.accessToken).then(patchNicknameResponse);
      
    }

    //          event handler : profile box click event handler          //
    const onProfileImageClickHandler = () => {
      if (!isMyPage) return;
      if (!imageInputRef.current) return;
      imageInputRef.current.click();
    }

    //          function : file upload response            //
    const fileUploadResponse = (profileImage: string | null ) => {
    if (!profileImage) return;
    if (!cookies.accessToken) return;
    const requestBody : PatchProfileImageRequestDto = { profileImage };

    
    patchProfileImageRequest(requestBody, cookies.accessToken).then(patchProfileImageResponse);
    };

    //          function : patch nickname response            //
    const patchNicknameResponse = (responseBody: PatchNicknameResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF') alert('인증에 실패했습니다.');
    if (code === 'VF') alert('닉네임은 필수입니다.');
    if (code === 'DN') alert('중복되는 닉네임입니다.');
    if (code === 'NU') alert('존재하지 않는 유저입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') {
      alert(code);
      navigate(MAIN_PATH());
      return;
    }
    
    if(!userEmail) return;
    getUserRequest(userEmail).then(getUserResponse);
    setNicknameChange(false);
    };

    //         event handler : profile image change event handler          //
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);

      fileUploadRequest(data).then(fileUploadResponse);
    }

    //         event handler : nickname change event handler          //
    const onNicknameChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setChangeNickname(value);
    }

    //           function: get user response           //
    const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto | null ) => {
      if (!responseBody) return ;
      const { code } = responseBody;
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') {
        navigate(MAIN_PATH());
        return;

      }

      const { email, nickname, profileImage } = responseBody as GetUserResponseDto;
      setNickname(nickname);
      setProfileImage(profileImage);
      const isMyPage = email === loginUser?.email;
      setMyPage(isMyPage);
    };

    //          function : patch profile image function          //
    const patchProfileImageResponse = (responseBody: PatchProfileImageResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF') alert('인증에 실패했습니다.');
    if (code === 'NU') alert('존재하지 않는 유저입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') {
      navigate(MAIN_PATH());
      return;
    }
    
    if(!userEmail) return;
    getUserRequest(userEmail).then(getUserResponse);
    };

    //          effect: email path variable 변경시 실행할 함수           //
    useEffect(() => {
      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
    },[userEmail]);

    //          render : 유저 상단 화면 컴포넌트 랜더링          //
    return(
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ?
          <div className="user-top-my-profile-image-box" onClick={onProfileImageClickHandler}>
            {profileImage !== null ?
              <div className="user-top-my-profile-image" style={{backgroundImage: `url(${profileImage})`}}></div> :
              <div className='icon-box-large'>
                <div className="icon image-box-white-icon"></div>
              </div>
            }
            
            <input ref={imageInputRef} type="file" accept='image/*' style={{display: 'none'}} onChange={onProfileImageChangeHandler} />
          </div> :
          <div className="user-top-profile-image-box" style={{backgroundImage: `url(${profileImage ? profileImage : defualtProfileImage})`}}></div>
          }
          <div className="user-top-info-box">
            <div className="user-top-info-nickname-box">
              
              {isMyPage ?
              <>
              {isNicknameChange ? 
              <input type="text" className="user-top-info-nickname-input" size={changeNickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler}/>
              :
              
              <div className="user-top-info-nickname">{nickname}</div>
              }
              <div className="icon-button" onClick={onNicknameEditButtonClickHandler}>
                <div className="icon edit-icon"></div>
              </div>
              
              
              
              </> :
              <div className="user-top-info-nickname">{nickname}</div>
              }
            </div>
            <div className="user-top-info-email">{userEmail}</div>
          </div>
        </div>
      </div>
    );
  };

  //         component: 유저 하단 화면 컴포넌트          //
  const UserBottom = () => {

    //            state: 페이지 네이션 관련 상태           //
    const {
    currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList } = usePagination<BoardListItem>(5);

    //          state: board count state          //
    const [count, setCount] = useState<number>(0);

    //          function: get user board list response            //
    const getUserBoardListResponse = (responseBody : GetUserBoardListResponseDto | ResponseDto | null ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NU') {
        alert('존재하지 않는 유저입니다.');
        navigate(MAIN_PATH());
        return;
      }
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { userBoardList } = responseBody as GetUserBoardListResponseDto;
      setTotalList(userBoardList);
      setCount(userBoardList.length);
    }

    //          event handler : side card click handler          //
    const onSideCardclickHandler = () => {
      if (isMyPage) navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
      else if (loginUser) navigate(USER_PATH(loginUser.email));
      else navigate(AUTH_PATH());
    }

    //          effect : user email 변경시마다 실행할 함수           //
    useEffect(()=>{
      if (!userEmail) return;
      getUserBoardListRequest(userEmail).then(getUserBoardListResponse);
    },[userEmail]);

    //          render : 유저 하단 화면 컴포넌트 랜더링          //
    return(
      <div id="user-bottom-wrapper">
        <div className="user-bottom-container">
          <div className="user-bottom-title">{isMyPage ? '내 게시물 ' : '게시물 '}<span className='emphasis'>{'count'}</span></div>
          <div className="user-bottom-contents-box">
            {count === 0 ? 
            <div className="user-bottom-contents-nothing">{'게시물이 없습니다.'}</div>
            : <div className="user-bottom-contents">
              {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
            </div>
            }
            <div className="user-bottom-side-box">
              <div className="user-bottom-side-card" onClick={onSideCardclickHandler}>
                <div className="user-bottom-side-container">
                  {isMyPage ? 
                  <>
                    <div className='icon-box'>
                      <div className="icon edit-icon"></div>
                    </div>
                    <div className="user-bottom-side-text">{'글쓰기'}</div>
                  </> : 
                  <>
                    <div className="user-bottom-side-text">{'내 게시물로 가기'}</div>
                    <div className="icon-box">
                      <div className="icon arrow-right-icon"></div>
                    </div>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="user-bottom-pagination-box">
          {count !== 0 &&  <Pagination 
          currentPage={currentPage}
          currentSection={currentSection}
          setCurrentPage={setCurrentPage}
          setCurrentSection={setCurrentSection}
          totalSection={totalSection}
          viewPageList={viewPageList}
          /> }
          </div>
        </div>
      </div>
    );
  };

  //         render : 유저 화면 컴포넌트 랜더링          //
  return (
    <>
    <UserTop />
    <UserBottom />
    </>
  );
}
