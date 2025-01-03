import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import BoardItem from 'components/BoardItem';
import { SEARCH_PATH } from 'constant';
import Pagination from 'components/Pagination';

//          component: 검색 화면 컴포넌트          //
export default function Search() {

  //          state: searchWord path variable state           //
  const {searchWord } = useParams();

  //          state: search board list count state          //
  const [count, setCount] = useState<number>(0);

  //          state: search board list state (tempt)          //
  const [searchBoardList, setSearchBoardList] = useState<BoardListItem[]>([]);

  //          state: relation list state          //
  const [relationList, setRelationList] = useState<string[]>([]);

  //          effect: 첫 마운트시 실행될 함수           //
  useEffect(()=>{
    // setRelationList(['1','2','3']);
  },[searchWord]);

  //          function : navigate function           //
  const navigate = useNavigate();

  //          event handler : relation word click handler           //
  const onRelationWordClickHandler = (word : string) =>{
    navigate(SEARCH_PATH(word));
  }

  //          render : 검색 화면 컴포넌트 랜더링          //
  if(!searchWord) return(<></>);
  return (
    <div id='search-wrapper'>
      <div className='search-container'>
        <div className='search-title-box'>
          <div className='search-title'><span className='search-title-emphasis'>{searchWord}</span>{'에 대한 검색결과 입니다.'}</div>
          <div className='search-count'>{count}</div>
        </div>
        <div className='search-contents-box'>
          {count === 0 ?
          <div className='search-contents-nothing'>{'검색 결과가 없습니다.'}</div> :
          <div className='search-contents'>
            {searchBoardList.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)}
          </div>
          }
          <div className='search-relation-box'>
            <div className='search-relation-card'>
              <div className='search-relation-card-container'>
                <div className='search-relation-card-title'>{'관련 검색어'}</div>
                  {relationList.length===0 ? 
                  <div className='search-relation-card-contents-nothing'>{'관련 검색어가 없습니다.'}</div> :
                  <div className='search-relation-card-contents'>
                  {relationList.map(word => <div className='word-badge' onClick={ () => onRelationWordClickHandler(word)}>{word}</div>)}
                  </div>
                  }
              </div>
            </div>
          </div>
        </div>
        <div className='search-pagination-box'>
          {/* {count !== 0 &&  <Pagination /> } */}
          
        </div>
      </div>
    </div>
  )
}
