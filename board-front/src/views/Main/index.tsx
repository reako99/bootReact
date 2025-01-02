import React, { useEffect, useState } from 'react';
import './style.css';
import Top3Item from 'components/Top3Item';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock, top3BoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination';

//          component: 메인 화면 컴포넌트          //
export default function Main() {

  //          component: 메인 화면 상단 컴포넌트          //
  const MainTop = () => {

    //            state: 주간 top3 게시물 리스트 상태           //
    const [top3BoardList , setTop3BoardList] = useState<BoardListItem[]>([]);

    //          effect: 첫 마운트시 실행될 함수           //
    useEffect(()=>{
      setTop3BoardList(top3BoardListMock);
    },[])
    //         render : 메인 화면 상단 컴포넌트 랜더링          //
    return (
      <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'>{'Yongs board에서\n다양한 이야기를 나눠보세요'}</div>
          <div className='main-top-contents-box'>
            <div className='main-top-contents-title'>{'주간 top3 게시물'}</div>
            <div className='main-top-contents'>
              {top3BoardList.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}              
            </div>
          </div>
        </div>
      </div>
    )
  }

  //          component: 메인 화면 하단 컴포넌트          //
  const MainBottom = () => {

    //            state: 최신 게시물 리스트 상태           //
    const [latestBoardList , setLatestBoardList] = useState<BoardListItem[]>([]);
    //            state: 인기 검색어 리스트 상태           //
    const [popularWordList , setPopularWordList] = useState<String[]>([]);

    //          effect: 첫 마운트시 실행될 함수           //
    useEffect(()=>{
      setLatestBoardList(latestBoardListMock);
      setPopularWordList(['hi','bye']);
    },[])

    //         render : 메인 화면 하단 컴포넌트 랜더링          //
    return (
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신 게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-latest-contents'>
              {latestBoardList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
            </div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-box'>
                  <div className='main-bottom-popular-card-title'></div>
                  <div className='main-bottom-popular-card-contents'>
                    {popularWordList.map(word => <div className='word-badge'>{word}</div>)}                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='main-bottom-pagination-box'>
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    )
  }

  //         render : 메인 화면 컴포넌트 랜더링          //
  return (
    <div>
      <MainTop />
      <MainBottom />
    </div>
  )
}
