import React, { Dispatch, SetStateAction } from 'react';
import './style.css';

//          interface: pagination component Properties          //
interface Props {
  currentPage: number;
  currentSection: number;

  setCurrentPage: Dispatch<SetStateAction<number>>;
  setCurrentSection: Dispatch<SetStateAction<number>>;

  viewPageList : number[];
  totalSection : number;
}

//          component: pagination component          //
export default function Pagination(props : Props) {

  //           state: Properties           //
  const { currentPage, currentSection, totalSection, viewPageList } = props;
  const { setCurrentPage, setCurrentSection } = props;

  //          event handler : page click event handler          //
  const onPageClickHandler = (page : number) => {
    setCurrentPage(page);
  }
  //          event handler : previous button click event handler          //
  const onPreviousClickHandler = () => {
    if (currentSection === 1) return;
    setCurrentPage( (currentSection - 1) * 10 );
    setCurrentSection(currentSection - 1);
  }

  //          event handler : next button click event handler          //
  const onNextClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentPage(currentSection * 10 + 1);
    setCurrentSection(currentSection + 1);
  }

  //          render: pagination component render          //
  return (
    <div id='pagination-wrapper'>
      <div className='pagination-change-link-box'>
        <div className='icon-box-small'>
          <div className='icon expand-left-icon'></div>
        </div>
        <div className='pagination-change-link-text' onClick={onPreviousClickHandler}>{'이전'}</div>
      </div>
      <div className='pagination-divider'>{'\|'}</div>

      {viewPageList.map(page =>
      page === currentPage ?
      <div className='pagination-text-active'>{page}</div>
      :
      <div className='pagination-text' onClick={()=>onPageClickHandler(page)}>{page}</div>
      )}
      <div className='pagination-divider'>{'\|'}</div>
      <div className='pagination-change-link-box'>
        <div className='pagination-change-link-text' onClick={onNextClickHandler}>{'다음'}</div>
        <div className='icon-box-small'>
         <div className='icon expand-right-icon'></div>
        </div>
      </div>
    </div>
  )
}
