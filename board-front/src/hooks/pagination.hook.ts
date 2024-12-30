import { useEffect, useState } from "react"

const usePagination = <T>(countPerPage:number) => {
    //           state : total object list state            //
    const [totalList, setTotalList] = useState<T[]>([]);
    //           state : view list state            //
    const [viewList, setViewList] = useState<T[]>([]);
    //           state : current page state            //
    const [currentPage, setCurrentPage] = useState<number>(1);
    //           state : total page list state            //
    const [totalPageList, setTotalPageList] = useState<number[]>([1]);
    //           state : view page list state            //
    const [viewPageList, setViewPageList] = useState<number[]>([1]);

    //           state : current section state            //
    const [currentSection, setCurrentSection] = useState<number>(1);

    //           state : total section state            //
    const [totalSection, setTotalSection] = useState<number>(1);

    //          function: set view list function   (object)        //
    const setView = () => {
        const FIRST_INDEX = countPerPage * (currentPage - 1);
        const LAST_INDEX = totalList.length > countPerPage * currentPage ? countPerPage * currentPage : totalList.length;
        const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX);
        setViewList(viewList);
    }

    //          function: set view page list function           //
    const setViewPage = () => {
        const FIRST_INDEX = 10 * (currentSection - 1);
        const LAST_INDEX = totalPageList.length > 10 * currentSection ? 10 * currentSection : totalPageList.length;
        const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
        setViewPageList(viewPageList);
    }

    //          effect: effects when change total list          //
    useEffect(() => {
        const totalPage = Math.ceil( totalList.length / countPerPage );
        const totalPageList = [];
        for (let page = 1; page <= totalPage; page ++ ) {
            totalPageList.push(page);
        }
        setTotalPageList(totalPageList);

        const totalSection = Math.ceil(totalList.length / ( countPerPage * 10 ));
        setTotalSection(totalSection);

        setCurrentPage(1);
        setCurrentSection(1);

        setView();
        setViewPage();
    }, [totalList]);

    //           effect: when change current page          //
    useEffect(setView, [currentPage]);
    //           effect: when change current section             //
    useEffect(setViewPage, [currentPage]);

    return {
        currentPage,
        setCurrentPage,
        currentSection,
        setCurrentSection,
        viewList,
        viewPageList,
        totalSection,
        setTotalList
    }

};

export default usePagination;