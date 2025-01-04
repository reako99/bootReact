import React, { useEffect, useState } from 'react';
import './style.css';
import Top3Item from 'components/Top3Item';
import { BoardListItem } from 'types/interface';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import { getPopularListRequest, getLatestBoardListRequest, getTop3BoardListRequest } from 'apis';
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import { GetPopularListResponseDto } from 'apis/response/search';

//          component: 메인 화면 컴포넌트          //
export default function Main() {

  //          function: navigate func          //
  const navigate = useNavigate();

  //          component: 메인 화면 상단 컴포넌트          //
  const MainTop = () => {

    //            state: 주간 top3 게시물 리스트 상태           //
    const [top3BoardList , setTop3BoardList] = useState<BoardListItem[]>([]);

    //           function : get top 3 board list response handler           //
    const getTop3BoardListResponse = (responseBody : GetTop3BoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    };

    //          effect: 첫 마운트시 실행될 함수           //
    useEffect(()=>{
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    },[])
    //         render : 메인 화면 상단 컴포넌트 랜더링          //
    return (
      <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'>
            
            </div>
          <div className='main-top-contents-box'>
            <div className='main-top-contents-title'>{''}</div>
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

    //            state: 페이지 네이션 관련 상태           //
    const {
      currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList } = usePagination<BoardListItem>(5);
    //            state: 인기 검색어 리스트 상태           //
    const [popularWordList , setPopularWordList] = useState<string[]>([]);

    //          event handler : popular word click event hendler          //
    const onPopularWordClickHandler = (word : string) => {
      navigate(SEARCH_PATH(word));
    }

    //          event handler: get latest board list response handler           //
    const getLatestBoardListResponse = (responseBody : GetLatestBoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    }

    //          event handler: get popular word list response handler           //
    const getPopularListResponse = (responseBody : GetPopularListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    }

    //          effect: 첫 마운트시 실행될 함수           //
    useEffect(()=>{
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListResponse);
    },[])

    //         render : 메인 화면 하단 컴포넌트 랜더링          //
    return (
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신 게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-latest-contents'>
              {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
            </div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-container'>
                  <div className='main-bottom-popular-card-title'></div>
                  <div className='main-bottom-popular-card-contents'>
                    {popularWordList.map(word => <div className='word-badge' onClick={()=>onPopularWordClickHandler(word)}>{word}</div>)}                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='main-bottom-pagination-box'>
            <Pagination 
            currentPage={currentPage}
            currentSection={currentSection}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            totalSection={totalSection}
            viewPageList={viewPageList}            
            />
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
