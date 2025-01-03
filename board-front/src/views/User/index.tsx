import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import defualtProfileImage from 'assets/image/default-profile-image.png';
import { useParams } from 'react-router-dom';

//          component: 유저 화면 컴포넌트          //
export default function User() {
  
    //          state: user email state          //
    const { userEmail } = useParams();

  //         component: 유저 상단 화면 컴포넌트          //
  const UserTop = () => {

    //          state: image file input ref state           //
    const imageInputRef = useRef<HTMLInputElement | null >(null);
    
    //          state: my page state          //
    const [isMyPage, setMyPage] = useState<boolean>(true);

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
      setChangeNickname(nickname);
      setNicknameChange(!isNicknameChange);
    }

    //          event handler : profile box click event handler          //
    const onProfileImageClickHandler = () => {
      if (!isMyPage) return;
      if (!imageInputRef.current) return;
      imageInputRef.current.click();
    }

    //         event handler : profile image change event handler          //
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
    }

    //         event handler : nickname change event handler          //
    const onNicknameChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setChangeNickname(value);
    }

    //          effect: email path variable 변경시 실행할 함수           //
    useEffect(() => {
      if(!userEmail) return;
      setNickname('test');
      setProfileImage('http://localhost:4000/file/40c0acfc-92a6-4278-9d90-9ab96ec1f273.JPG');
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
    //          render : 유저 하단 화면 컴포넌트 랜더링          //
    return(
      <div></div>
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
