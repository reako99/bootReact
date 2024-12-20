import React, { useState, KeyboardEvent, useRef, ChangeEvent } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest } from 'apis';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';

//          component: 인증 화면 컴포넌트          //
export default function Authentication() {

  //          state: 화면 상태           //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  //          state: cookie 상태           //
  const [cookies, setCookie] = useCookies();

  //          function: navigator 함수            //
  const navigator = useNavigate();

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

    //          function: sign in response 처리 함수          //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null ) => {
      if (!responseBody) {
        alert('네트워크 이상입니다.');
        return;
      };
      const { code } = responseBody;
      if (code === 'DBE') {
        alert('데이터베이스 오류입니다.');
        return;
      };
      if (code === 'VF') {
        setError(true);
        return;
      };
      if (code === 'SF') {
        setError(true);
        return;
      };
      if (code === 'SU') {
        const { token, expirationTime } = responseBody as SignInResponseDto;
        const now = new Date().getTime();
        const expires = new Date( now + ( expirationTime * 1000 ) );
        setCookie('accessToken', token, { expires:expires , path: MAIN_PATH() });
        navigator(MAIN_PATH());
        return;
      };
      
    }

    //           event handler: email change event 처리 함수            //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setEmail(value);
    };
    //           event handler: password change event 처리 함수            //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setPassword(value);
    };
    //           event handler: sign in button click event 처리 함수            //
    const onSignInButtonClickEventHandler = () => {
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    };
    //           event handler: sign up link click event 처리 함수            //
    const onSignUpLinkClickEventHandler = () => {
      setView('sign-up');
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
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
            <InputBox ref={emailRef} label='email' type='text' placeholder='put email' value={email} error={error} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} label='password' type={passwordType} placeholder='put password' value={password} error={error} onChange={onPasswordChangeHandler} onKeyDown={onPasswordKeyDownHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler}/>
          </div>
          <div className='auth-card-bottom'>
            {error && 
            <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>{' !\n .'}</div>
            </div>
            }
            <div className='black-large-full-button' onClick={onSignInButtonClickEventHandler} >{'로그인'}</div>
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

    //          state: email 요소 참조 상태          //
    const emailRef = useRef<HTMLInputElement | null> (null);
    //          state: password 요소 참조 상태          //
    const passwordRef = useRef<HTMLInputElement | null> (null);
    //          state: password check 요소 참조 상태          //
    const passwordCheckRef = useRef<HTMLInputElement | null> (null);
    //          state: nickname 요소 참조 상태          //
    const nicknameRef = useRef<HTMLInputElement | null> (null);
    //          state: tel number 요소 참조 상태          //
    const telNumberRef = useRef<HTMLInputElement | null> (null);
    //          state: address 요소 참조 상태          //
    const addressRef = useRef<HTMLInputElement | null> (null);
    //          state: address detail 요소 참조 상태          //
    const addressDetailRef = useRef<HTMLInputElement | null> (null);
    //          state: password type 상태          //
    const [passwordType, setPasswordType] = useState<'text'|'password'>('password');
    //          state: password icon 상태          //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon');
    //          state: password check type 상태          //
    const [passwordCheckType, setPasswordCheckType] = useState<'text'|'password'>('password');
    //          state: password check icon 상태          //
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon');
    //          state: nickname 상태          //
    const [nickname, setNickname] = useState<string>('');
    //          state: tel number 상태          //
    const [telNumber, setTelNumber] = useState<string>('');
    //          state: address 상태          //
    const [address, setAddress] = useState<string>('');
    //          state: address detail 상태          //
    const [addressDetail, setAddressDetail] = useState<string>('');
    //          state: page number state          //
    const [page, setPage] = useState< 1 | 2 > (2);
    //          state: email state          //
    const [email, setEmail] = useState<string> ('');
    //          state: password state          //
    const [password, setPassword] = useState<string> ('');
    //          state: password check state          //
    const [passwordCheck, setPasswordCheck] = useState<string> ('');
    //          state: email error 상태          //
    const [isEmailError, setEmailError] = useState<boolean>(false);
    //          state: password error 상태          //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    //          state: password check error 상태          //
    const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
    //          state: nickname error 상태          //
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    //          state: tel number error 상태          //
    const [isTelNumberError, setTelNumberError] = useState<boolean>(false);
    //          state: address error 상태          //
    const [isAddressError, setAddressError] = useState<boolean>(false);
    //          state: email error message 상태          //
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    //          state: password error message 상태          //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    //          state: password check error message 상태          //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
    //          state: nickname error message 상태          //
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
    //          state: tel number error message 상태          //
    const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');
    //          state: address error message 상태          //
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
    //          state: agreed personal state          //
    const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);
    //          state: agreed personal error state          //
    const [isAgreedPersonalError, setAgreedPersonalError] = useState<boolean>(true);


    //          function: daum address search popup open function          //
    const open = useDaumPostcodePopup();

    //          event handler: email change event handler          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setEmail(value);
      setEmailError(false);
      setEmailErrorMessage('');
    }
    //          event handler: password change event handler          //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    //          event handler: password check change event handler          //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');
    }
    //          event handler: nickname change event handler          //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMessage('');
    }
    //          event handler: tel number change event handler          //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setTelNumber(value);
      setTelNumberError(false);
      setTelNumberErrorMessage('');
    }
    //          event handler: address change event handler          //
    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setAddress(value);
      setAddressError(false);
      setAddressErrorMessage('');
    }
    //          event handler: address detail change event handler          //
    const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setAddressDetail(value);
    }
    
    //           event handler: password button click event 처리 함수            //
    const onPasswordButtonClickHandler = () => {
      if(passwordType === 'text') {
        setPasswordType('password');
        setPasswordButtonIcon('eye-light-off-icon')
      }else{
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon')
      }
    }
    //           event handler: password check button click event 처리 함수            //
    const onPasswordCheckButtonClickHandler = () => {
      if(passwordCheckType === 'text') {
        setPasswordCheckType('password');
        setPasswordCheckButtonIcon('eye-light-off-icon')
      }else{
        setPasswordCheckType('text');
        setPasswordCheckButtonIcon('eye-light-on-icon')
      }
    }
    //           event handler: address button click event 처리 함수            //
    const onAddressButtonClickHandler = () => {
      open({onComplete:onComplite});
    }
    //           event handler: agreed personal click event 처리 함수            //
    const onAgreedPersonalClickHandler = () => {
      setAgreedPersonal(!agreedPersonal);
      setAgreedPersonalError(!isAgreedPersonalError);
    }
    //           event handler: email input key down event 처리 함수            //
    const onEmailKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    };
    //           event handler: password input key down event 처리 함수            //
    const onPasswordKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    };
    //           event handler: password check input key down event 처리 함수            //
    const onPasswordCheckKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!nicknameRef.current) return;
      onNextPageButtonClickEventHandler();
      nicknameRef.current.focus();
    };
    //           event handler: nickname input key down event 처리 함수            //
    const onNicknameKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!telNumberRef.current) return;
      telNumberRef.current.focus();
    };
    //           event handler: tel number input key down event 처리 함수            //
    const onTelNumberKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!addressRef.current) return;
      addressRef.current.focus();
    };
    //           event handler: address input key down event 처리 함수            //
    const onAddressKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    };
    //           event handler: address detail input key down event 처리 함수            //
    const onAddressDetailKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      onSignUpButtonClickEventHandler();
    };
    //           event handler: next page button click event 처리 함수            //
    const onNextPageButtonClickEventHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.');
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword){
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 읿력해주세요.');
      }
      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
      }
      if (isEmailPattern && isCheckedPassword && isEqualPassword ) setPage(2);
      return;
    };
    //          event handler: sign in lick click event handler         //
    const onSignInButtonClickEventHandler = () => {
      setView('sign-in');
    }
     //          event handler: sign up button click event handler         //
     const onSignUpButtonClickEventHandler = () => {
      alert('sign-up');
    }

    //          event handler: daum address search complite event handler          //
    const onComplite = (data: Address) => {
      const { address } = data;
      setAddress(address);
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    }

    //          render: sign up card 컴포넌트 랜더링          //
    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'회원가입'}</div>
              <div className='auth-card-page'>{`${page} / 2`}</div>
            </div>
            {page === 1 && (
            <>
            <InputBox ref={emailRef} label='email*' type='text' placeholder='put email' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='password*' type={passwordType} placeholder='put password' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
            <InputBox ref={passwordCheckRef} label='password check*' type={passwordCheckType} placeholder='put password check' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onKeyDown={onPasswordCheckKeyDownHandler}/>
            </>
            )}
            {page === 2 && (
              <>
              <InputBox ref={nicknameRef} label='nickname*' type='text' placeholder='put nickname' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler} />
              <InputBox ref={telNumberRef} label='tel number*' type='text' placeholder='put tel number' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} message={telNumberErrorMessage} onKeyDown={onTelNumberKeyDownHandler} />
              <InputBox ref={addressRef} label='address*' type='text' placeholder='find address' value={address} onChange={onAddressChangeHandler} error={isAddressError} message={addressErrorMessage} icon='expand-right-light-icon' onButtonClick={onAddressButtonClickHandler} onKeyDown={onAddressKeyDownHandler} />
              <InputBox ref={addressDetailRef} label='address detail' type='text' placeholder='put address detail' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false} onKeyDown={onAddressDetailKeyDownHandler} />
              </>
            )}
          </div>
          <div className='auth-card-bottom'>
            {page === 1 && (
            <div className='black-large-full-button' onClick={onNextPageButtonClickEventHandler}>{'다음 단계'}</div>
            )}
            {page === 2 && (
              <>
              <div className='auth-consent-box'>
                <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                  <div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div>     
                </div>
                <div className={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'개인정보동의'}</div>
                <div className='auth-consent-link'>{'더보기 >'}</div>
              </div>
              <div className='black-large-full-button' onClick={onSignUpButtonClickEventHandler}>{'회원 가입'}</div>
              </>
            )}
            <div className='auth-description-box'>
              <div className='auth-description'>{'이미 계정이 있으신가요? '}<span className='auth-description-link' onClick={onSignInButtonClickEventHandler}>{'login'}</span></div>
            </div>
          </div>
        </div>
      </div>
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
