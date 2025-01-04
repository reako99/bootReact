import React from 'react';
import './style.css';


//          component: 푸터 레이아웃          //
export default function Footer() {

  //         event handler: 인스타 아이콘 버튼 클릭 이벤트 처리          //
  const onInstarIconButtonClickHandler = () => {
    // window.open('https://www.instagram.com');
  }

  //         event handler: 네이버 블로그 아이콘 버튼 클릭 이벤트 처리          //
  const onNaverBlogIconButtonClickHandler = () => {
    // window.open('https://blog.naver.com');
  }

  //          render: 푸터 레이아웃 랜더링         //
  return (
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box-width-80'>
                        <div className='icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{'Miracle community'}</div>
                </div>
                <div className='footer-link-box' onClick={onInstarIconButtonClickHandler} >
                    <div className='footer-email-link'>{''}</div>
                    <div className='icon-button'>
                        <div className='icon insta-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onNaverBlogIconButtonClickHandler} >
                        <div className='icon naver-blog-icon'></div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'>
                    {'Copyright ⓒ 2025 Yongs.'}
                </div>
            </div>
        </div>
    </div>
  )
}
