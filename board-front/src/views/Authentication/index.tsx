import React, { useState, KeyboardEvent, useRef } from 'react';
import './style.css';
import InputBox from 'components/InputBox';

//          component: 인증 화면 컴포넌트          //
export default function Authentication() {

  //          state: 화면 상태           //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

  //          component: sign in card 컴포넌트          //
  const SignInCard = () => {

    //          state: email 요소 참조 상태          //
    const emailRef = useRef<HTMLInputElement | null> (null);
    //          state: password 요소 참조 상태          //
    const passwordRef = useRef<HTMLInputElement | null> (null);
    //          state: email 상태          //
    const [email, setEmail] = useState<string>('');
    //          state: password 상태          //
    const [password, setPassword] = useState<string>('');
    //          state: password type 상태          //
    const [passwordType, setPasswordType] = useState<'text'|'password'>('password');
    //          state: password icon 상태          //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon');
    //          state: error 상태          //
    const [error, setError] = useState<boolean>(false);


    //           event handler: password button click event 처리 함수            //
    const onSignInButtonClickEventHandler = () => {

    };
    //           event handler: sign up link click event 처리 함수            //
    const onSignUpLinkClickEventHandler = () => {
      
    };
    //           event handler: password button click event 처리 함수            //
    const onPasswordButtonClickHandler = () => {
      if(passwordType === 'text') {
        setPasswordType('password');
        setPasswordButtonIcon('eye-light-off-icon')
      }else{
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon')
      }
    };

    //           event handler: email input key down event 처리 함수            //
    const onEmailKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    };

    //           event handler: password input key down event 처리 함수            //
    const onPasswordKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      onSignInButtonClickEventHandler();
    };


    //          render: sign in card 컴포넌트 랜더링          //
    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title' onClick={onSignInButtonClickEventHandler}>{'로그인'}</div>
            </div>
            <InputBox ref={emailRef} label='email' type='text' placeholder='put email' value={email} error={error} setValue={setEmail} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} label='password' type={passwordType} placeholder='put password' value={password} error={error} setValue={setPassword} onKeyDown={onPasswordKeyDownHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler}/>
          </div>
          <div className='auth-card-bottom'>
            {error && 
            <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>{' !\n .'}</div>
            </div>
            }
            <div className='black-large-full-button'>{'로그인'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>{'new? '}<span className='auth-description-link' onClick={onSignUpLinkClickEventHandler}>{'join'}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  //          component: sign up card 컴포넌트          //
  const SignUpCard = () => {
    //          render: sign up card 컴포넌트 랜더링          //
    return (
      <div className='auth-card'></div>
    );
  };

  //         render : 인증 화면 컴포넌트 랜더링          //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다'}</div>
              <div className='auth-jumbotron-text'>{'YONGs BOARD 입니다.'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}
      </div>
    </div>
  )
}
