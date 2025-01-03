import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import BoardItem from 'components/BoardItem';
import { SEARCH_PATH } from 'constant';
import Pagination from 'components/Pagination';
import { getRelationListRequest, getSearchBoardListRequest } from 'apis';
import { GetSearchBoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import { GetRelationListResponseDto } from 'apis/response/search';

//          component: 검색 화면 컴포넌트          //
export default function Search() {

  //            state: 페이지 네이션 관련 상태           //
  const {
    currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList } = usePagination<BoardListItem>(5);

  //          state: searchWord path variable state           //
  const {searchWord } = useParams();

  //          state: pre search word state          //
  const [preSearchWord, setPreSearchWord] = useState<string>('');

  //          state: search board list count state          //
  const [count, setCount] = useState<number>(0);

  //          state: search board list state (tempt)          //
  const [searchBoardList, setSearchBoardList] = useState<BoardListItem[]>([]);

  //          state: relation list state          //
  const [relationWordList, setRelationWordList] = useState<string[]>([]);

  //          function : navigate function           //
  const navigate = useNavigate();

  //          function : get search baord list resopnse           //
  const getSearchBoardListResponse = (responseBody: GetSearchBoardListResponseDto | ResponseDto | null ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;
    if (!searchWord) return;
    const { searchList } = responseBody as GetSearchBoardListResponseDto;
    setSearchBoardList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  }

  //          function : get relation word list resopnse           //
  const getRelationListResponse = (responseBody: GetRelationListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;
    if (!searchWord) return;
    const { relationWordList } = responseBody as GetRelationListResponseDto;
    setRelationWordList(relationWordList);
  }

  //          effect: search word 상태 변경 시 실행될 함수           //
  useEffect(()=>{
    if(!searchWord) return;
    getSearchBoardListRequest(searchWord, preSearchWord).then(getSearchBoardListResponse);
    getRelationListRequest(searchWord).then(getRelationListResponse);
  },[searchWord]);

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
                  { relationWordList.length === 0 ? 
                  <div className='search-relation-card-contents-nothing'>{'관련 검색어가 없습니다.'}</div> :
                  <div className='search-relation-card-contents'>
                  { relationWordList.map(word => <div className='word-badge' onClick={ () => onRelationWordClickHandler(word)}>{word}</div>)}
                  </div>
                  }
              </div>
            </div>
          </div>
        </div>
        <div className='search-pagination-box'>
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
  )
}
