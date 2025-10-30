import React from "react";
import { column } from "./index";
import TableContainer from "Common/TableContainer";

interface stateType {
    id: number | string; Column1: string; Column2: string; Column3: string; Column4: string; Column5: string;
}

const AddRows = () => {

    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Column 1',
                accessorKey: 'Column1',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Column 2',
                accessorKey: 'Column2',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Column 3',
                accessorKey: 'Column3',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Column 4',
                accessorKey: 'Column4',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Column 5',
                accessorKey: 'Column5',
                enableColumnFilter: false,
                enableSorting: true,
            }
        ],
        []
    );

    const [counter, setCounter] = React.useState<number>(1);

    const [data, setData] = React.useState<stateType[]>([
        { id: 1, Column1: counter + ".1", Column2: counter + '.2', Column3: counter + ".3", Column4: counter + '.4', Column5: counter + ".5" }
    ]);

    const handleData = () => {
        setCounter((prevCounter) => prevCounter + 1);
        setData([
            ...data,
            {
                id: (Math.floor(Math.random() * (30 - 20)) + 20),
                Column1: (counter + 1) + ".1", 
                Column2: (counter + 1) + ".2",
                Column3: (counter + 1) + ".3",
                Column4: (counter + 1) + ".4",
                Column5: (counter + 1) + ".5"
            }])
    }

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Add Rows</h6>
                    <div className="mb-3">
                        <button
                            className="text-white transition-all duration-200 ease-linear btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100" id="addRow"
                            onClick={handleData}
                        >
                            Add New Row
                        </button>
                    </div>
                    <TableContainer
                        isPagination={true}
                        isSelect={true}
                        isGlobalFilter={true}
                        columns={(columns || [])}
                        data={(data || [])}
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

export default AddRows;