import React from 'react';
import './style.css';
import { CommentListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png';

interface Props { 
    commentListItem: CommentListItem;
 }


//          component: Comment List Item 컴포넌트          //
export default function CommentItem( { commentListItem } : Props) {

  //          properties          //
  const { nickname, profileImage, writeDatetime, content } = commentListItem;

  //          render: Comment List Item 랜더링          //
  return (
    <div className='coment-list-item'>
        <div className='coment-list-item-top'>
            <div className='coment-list-item-profile-box'>
                <div className='coment-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage })` }}></div>
            </div>
            <div className='coment-list-item-nickname'>{nickname}</div>
            <div className='coment-list-item-divider'>{'\|'}</div>
            <div className='coment-list-item-time'>{writeDatetime}</div>
        </div>
        <div className='coment-list-item-main'>
            <div className='coment-list-item-content'>{content}</div>
        </div>
    </div>
  )
}
