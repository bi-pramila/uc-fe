import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";


const Pagination = ({ data, currentPage, setCurrentPage, perPageData, currentdata }: any) => {

    const handleClick = (e: any) => {
        setCurrentPage(e);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data?.length / perPageData); i++) {
        pageNumbers.push(i);
    }
    const handleprevPage = () => {
        let prevPage = currentPage - 1;
        setCurrentPage(prevPage);
    };
    const handlenextPage = () => {
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    };

    useEffect(() => {
        if (pageNumbers.length && pageNumbers.length < currentPage) {
            setCurrentPage(pageNumbers.length);
        }

    }, [pageNumbers.length, currentPage, setCurrentPage]);
    return (
        <React.Fragment>
            <div className="flex flex-col items-center mb-5 md:flex-row">
                <div className="mb-4 grow md:mb-0">
                    <p className="text-slate-500 dark:text-zinc-200">Showing <b>{currentdata.length}</b> of <b>{data.length}</b> Results</p>
                </div>
                <ul className="flex flex-wrap items-center gap-2 shrink-0">
                    {currentPage <= 1 ? (
                        <Link className="inline-flex items-center justify-center bg-white dark:bg-zinc-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zinc-500 text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-100 dark:hover:bg-fecustom-500/10 focus:bg-fecustom-50 dark:focus:bg-fecustom-500/10 focus:text-fecustom-500 dark:focus:text-fecustom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-fecustom-500 dark:[&.active]:bg-fecustom-500 [&.active]:border-fecustom-500 dark:[&.active]:border-fecustom-500 [&.active]:hover:text-fecustom-700 dark:[&.active]:hover:text-fecustom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zinc-300 [&.disabled]:cursor-auto disabled" to="#!">
                            <ChevronLeft className="size-4 mr-1 rtl:rotate-180" /> Prev
                        </Link>
                    ) :
                        <li className={currentPage <= 1 ? "disabled" : ""}>
                            <Link to="#!" className="inline-flex items-center justify-center bg-white dark:bg-zinc-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zinc-500 text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-100 dark:hover:bg-fecustom-500/10 focus:bg-fecustom-50 dark:focus:bg-fecustom-500/10 focus:text-fecustom-500 dark:focus:text-fecustom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-fecustom-500 dark:[&.active]:bg-fecustom-500 [&.active]:border-fecustom-500 dark:[&.active]:border-fecustom-500 [&.active]:hover:text-fecustom-700 dark:[&.active]:hover:text-fecustom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zinc-300 [&.disabled]:cursor-auto" onClick={handleprevPage}>
                                <ChevronLeft className="size-4 mr-1 rtl:rotate-180" /> Prev
                            </Link>
                        </li>
                    }

                    {pageNumbers.map((item, key) => (
                        <React.Fragment key={key}>
                            <li>
                                <Link to="#!" className={currentPage === item ? "inline-flex items-center justify-center bg-white dark:bg-zinc-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zinc-500 text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-100 dark:hover:bg-fecustom-500/10 focus:bg-fecustom-50 dark:focus:bg-fecustom-500/10 focus:text-fecustom-500 dark:focus:text-fecustom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-fecustom-500 dark:[&.active]:bg-fecustom-500 [&.active]:border-fecustom-500 dark:[&.active]:border-fecustom-500 [&.active]:hover:text-fecustom-700 dark:[&.active]:hover:text-fecustom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zinc-300 [&.disabled]:cursor-auto active" : "inline-flex items-center justify-center bg-white dark:bg-zinc-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zinc-500 text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-100 dark:hover:bg-fecustom-500/10 focus:bg-fecustom-50 dark:focus:bg-fecustom-500/10 focus:text-fecustom-500 dark:focus:text-fecustom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-fecustom-500 dark:[&.active]:bg-fecustom-500 [&.active]:border-fecustom-500 dark:[&.active]:border-fecustom-500 [&.active]:hover:text-fecustom-700 dark:[&.active]:hover:text-fecustom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zinc-300 [&.disabled]:cursor-auto"} onClick={() => handleClick(item)}>{item}</Link>
                            </li>
                        </React.Fragment>
                    ))}

                    {currentPage >= pageNumbers.length ? (
                        <Link className="inline-flex items-center justify-center bg-white dark:bg-zinc-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zinc-500 text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-100 dark:hover:bg-fecustom-500/10 focus:bg-fecustom-50 dark:focus:bg-fecustom-500/10 focus:text-fecustom-500 dark:focus:text-fecustom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-fecustom-500 dark:[&.active]:bg-fecustom-500 [&.active]:border-fecustom-500 dark:[&.active]:border-fecustom-500 [&.active]:hover:text-fecustom-700 dark:[&.active]:hover:text-fecustom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zinc-300 [&.disabled]:cursor-auto disabled" to="#!">
                            Next <ChevronRight className="size-4 ml-1 rtl:rotate-180" />
                        </Link>
                    ) :
                        <li className={currentPage <= 1 ? "disabled" : ""}>
                            <Link to="#!" className="inline-flex items-center justify-center bg-white dark:bg-zinc-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zinc-500 text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-100 dark:hover:bg-fecustom-500/10 focus:bg-fecustom-50 dark:focus:bg-fecustom-500/10 focus:text-fecustom-500 dark:focus:text-fecustom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-fecustom-500 dark:[&.active]:bg-fecustom-500 [&.active]:border-fecustom-500 dark:[&.active]:border-fecustom-500 [&.active]:hover:text-fecustom-700 dark:[&.active]:hover:text-fecustom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zinc-300 [&.disabled]:cursor-auto" onClick={handlenextPage}>Next <ChevronRight className="size-4 ml-1 rtl:rotate-180" /></Link>
                        </li>
                    }
                </ul>
            </div>
        </React.Fragment>
    );
};

export default Pagination;
