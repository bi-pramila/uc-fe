import React from "react";
import { column } from "./index";
import TableContainer from "Common/TableContainer";
import { reactTableData } from "Common/data";

const BorderedTable = () => {

    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Position',
                accessorKey: 'position',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Office',
                accessorKey: 'office',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Age',
                accessorKey: 'age',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Start date',
                accessorKey: 'startDate',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Salary',
                accessorKey: 'salary',
                enableColumnFilter: false,
                enableSorting: true,
            },
        ],
        []
    );
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Bordered Table</h6>
                    <TableContainer
                        isPagination={true}
                        isSelect={true}
                        isGlobalFilter={true}
                        columns={(columns || [])}
                        data={(reactTableData || [])}
                        customPageSize={10}
                        divclassName="my-2 col-span-12 overflow-x-auto lg:col-span-12"
                        tableclassName="bordered group dataTable w-full text-sm align-middle whitespace-nowrap no-footer"
                        theadclassName="border-b border-slate-200 dark:border-zinc-500"
                        trclassName="group-[.stripe]:even:bg-slate-50 group-[.stripe]:dark:even:bg-zinc-600 transition-all duration-150 ease-linear group-[.hover]:hover:bg-slate-50 dark:group-[.hover]:hover:bg-zinc-600 [&.selected]:bg-fecustom-500 dark:[&.selected]:bg-fecustom-500 [&.selected]:text-fecustom-50 dark:[&.selected]:text-fecustom-50"
                        thclassName="p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zinc-500 sorting px-3 py-4 text-slate-900 bg-slate-200/50 font-semibold text-left dark:text-zinc-50 dark:bg-zinc-600 dark:group-[.bordered]:border-zinc-500"
                        tdclassName="p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zinc-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default BorderedTable;