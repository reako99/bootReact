import React, { useEffect, useRef, useState } from 'react';
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
    const [isMyPage, setMyPage] = useState<boolean>(false);

    //          state: nickname change state          //
    const [isNicknameChange, setNicknameChange] = useState<boolean>(false);

    //          state: nickname state          //
    const [nickname, setNickname] = useState<string>('');
    
    //          state: change nickname state          //
    const [changeNickname, setChangeNickname] = useState<string>('');
    
    //          state: profile image state          //
    const [profileImage, setProfileImage] = useState<string|null>(null);

    //          effect: email path variable 변경시 실행할 함수           //
    useEffect(() => {
      if(!userEmail) return;
      setNickname('test');
      setProfileImage('$2a$10$cX2rXUq9swDRvrm14HI/9.1KsMcanzzPpOlpfxl.y2q1RAlzo0/0K');
    },[userEmail]);

    //          render : 유저 상단 화면 컴포넌트 랜더링          //
    return(
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ?
          <div className="user-top-my-profile-image-box">
            {profileImage !== null ?
              <div className="user-top-my-profile-image" style={{backgroundImage: `url(${profileImage})`}}></div> :
              <div className="user-top-my-profile-image-nothing-box">
                <div className='icon-box-large'>
                  <div className="icon image-box-white-icon"></div>
                </div>
              </div>
            }
            
            <input ref={imageInputRef} type="file" accept='image/*' style={{display: 'none'}} />
          </div> :
          <div className="user-top-profile-image-box" style={{backgroundImage: `url(${profileImage ? profileImage : defualtProfileImage})`}}></div>
          }
          <div className="user-top-info-box">
            <div className="user-top-info-nickname-box">
              
              {isMyPage ?
              <>
              {isNicknameChange ? 
              <input type="text" className="user-top-info-nickname-input" size={changeNickname.length + 1} value={changeNickname} />
              :
              <>
              <div className="user-top-info-nickname">{nickname}</div>
              <div className="icon-button">
                <div className="icon edit-icon"></div>
              </div>
              </>
              }
              
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
