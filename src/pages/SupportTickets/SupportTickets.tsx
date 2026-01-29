import React, { useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import TableContainer from 'Common/TableContainer';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import Select from 'react-select';

// Icons
import { Search, Plus, Pencil, Info, FileBarChart2, CalendarDays, Stethoscope, Anchor } from 'lucide-react';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import {
    getLeaveManageEmployee as onGetLeaveManageEmployee,
    fetchSupportTickets
} from 'slices/thunk';
import filterDataBySearch from 'Common/filterDataBySearch';

const LeaveManageEmployeeData = [
    {
      "id": 1,
      "ticketId": 504197,
      "department": "Technical Support (Pramila S)",
      "subject": "test from external",
      "requestor": "Pramila (AUTHORIZED USER)",
      "owner": "Paul Webber",
      "status": "Open",
      "lastReply": "149d 0h 46m"
    },
    {
      "id": 2,
      "ticketId": 330850,
      "department": "Technical Support",
      "subject": "Server slow",
      "requestor": "Pramila (AUTHORIZED USER)",
      "owner": "Paul Webber",
      "status": "Open",
      "lastReply": "183d 4h 2m"
    },
    {
      "id": 3,
      "ticketId": 786367,
      "department": "Technical Support",
      "subject": "Testing",
      "requestor": "Pramila (AUTHORIZED USER)",
      "owner": "Paul Webber",
      "status": "Open",
      "lastReply": "188d 6h 50m"
    },
    {
      "id": 4,
      "ticketId": 926687,
      "department": "Technical Support",
      "subject": "website",
      "requestor": "Pramila (AUTHORIZED USER)",
      "owner": "Paul Webber",
      "status": "Customer-Reply",
      "lastReply": "188d 21h 29m"
    },
    {
      "id": 5,
      "ticketId": 225617,
      "department": "Technical Support (Pramila S)",
      "subject": "Server slow",
      "requestor": "Tinu S (OPERATOR)",
      "owner": "Paul Webber",
      "status": "Open",
      "lastReply": "198d 20h 22m"
    },
    {
      "id": 6,
      "ticketId": 427019,
      "department": "Sales Department",
      "subject": "Your Account Login Info",
      "requestor": "Eric J (OPERATOR)",
      "owner": "Paul Webber",
      "status": "Answered",
      "lastReply": "199d 18h 19m"
    },
    {
      "id": 7,
      "ticketId": 427536,
      "department": "Technical Support",
      "subject": "test",
      "requestor": "Asma D (AUTHORIZED USER)",
      "owner": "Paul Webber",
      "status": "Answered",
      "lastReply": "236d 18h 36m"
    }
  ]

const SupportTickets = () => {

    const dispatch = useDispatch<any>();

    const selectSupportTicketsData = createSelector(
        (state: any) => state.SupportTickets,
        (supportTickets) => ({
            tickets: supportTickets.tickets,
            totalResults: supportTickets.totalResults,
            statuses: supportTickets.statuses,
            loading: supportTickets.loading,
            error: supportTickets.error
        })
    );

    const { tickets, statuses, totalResults, loading, error } = useSelector(selectSupportTicketsData);

    const [data, setData] = useState<any>(LeaveManageEmployeeData);

    // Get Data from WHMCS API
    useEffect(() => {
        console.log("Fetching Support Tickets from WHMCS");
        dispatch(fetchSupportTickets({ limitstart: 0, limitnum: 25 }));
        dispatch(fetchSupportStatuses());
    }, [dispatch]);

    // Update local state when tickets change
    useEffect(() => {
        if (tickets && tickets.length > 0) {
            // Transform WHMCS data to match our table structure
            const transformedData = tickets.map((ticket: any, index: number) => ({
                id: index + 1,
                ticketId: ticket.tid || ticket.id,
                department: ticket.department || "—",
                subject: ticket.subject || "—",
                requestor: `${ticket.name || "Unknown"} (${ticket.email || "—"})`,
                owner: ticket.lastreply || "—",
                status: ticket.status || "Open",
                lastReply: ticket.lastreply || "—"
            }));
            setData(transformedData);
        }
    }, [tickets]);

    // Search Data
    const filterSearchData = (e: any) => {
        const search = e.target.value;
        const keysToSearch = ['leaveType', 'reason', 'noOfDays', 'from', 'to', 'approvedBy', 'status'];
        filterDataBySearch(data, search, keysToSearch, setData);
    };

    // Table Head Action On Right
    useEffect(() => {
        const tableHead = document.querySelectorAll("th");
        const lastTheadElement = tableHead[tableHead.length - 1];
        lastTheadElement?.classList.add("ltr:text-right", "rtl:text-left");

        return () => {
            lastTheadElement?.classList.remove("ltr:text-right", "rtl:text-left");
        };
    });

    const options = [
        { value: 'Open', label: 'Open' },
        { value: 'Closed', label: 'Closed' },
        { value: 'Answered', label: 'Answered' },
        { value: 'onHold', label: 'On Hold' },
    ];



    const Status = ({ item }: any) => {
        switch (item) {
            case "Open":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-yellow-100 border-transparent text-yellow-500 dark:bg-yellow-500/20 dark:border-transparent">{item}</span>);
            case "Answered":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">{item}</span>);
            case "Customer-Reply":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-blue-100 border-transparent text-blue-500 dark:bg-blue-500/20 dark:border-transparent">{item}</span>);
            case "Closed":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">{item}</span>);
            default:
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-slate-100 border-transparent text-slate-500 dark:bg-slate-500/20 dark:border-transparent">{item}</span>);
        }
    };

    const columns = useMemo(() => [
        {
            header: "Ticket ID",
            accessorKey: "ticketId",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <Link to={`/support/support-ticket/${cell.getValue()}`} className="font-semibold text-fecustom-500">#{cell.getValue()}</Link>
            ),
        },
        {
            header: "Department",
            accessorKey: "department",
            enableColumnFilter: false,
        },
        {
            header: "Subject",
            accessorKey: "subject",
            enableColumnFilter: false,
        },
        {
            header: "Requestor",
            accessorKey: "requestor",
            enableColumnFilter: false,
        },
        {
            header: "Owner",
            accessorKey: "owner",
            enableColumnFilter: false,
        },
        {
            header: "Status",
            accessorKey: "status",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <Status item={cell.getValue()} />
            ),
        },
        {
            header: "Last Reply",
            accessorKey: "lastReply",
            enableColumnFilter: false,
        },
        {
            header: "Action",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cell: any) => (
                <div className="flex justify-end gap-2">
                    <Link to="#!" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md text-slate-500 bg-slate-100 hover:text-white hover:bg-slate-500 dark:text-zinc-200 dark:bg-zinc-600 dark:hover:text-white dark:hover:bg-zinc-400"><Pencil className="size-4" /></Link>
                    <Link to="#!" data-modal-target="leaveOverviewModal" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md text-fecustom-500 bg-fecustom-100 hover:text-white hover:bg-fecustom-500 dark:bg-fecustom-500/20 dark:hover:bg-fecustom-500"><Info className="size-4" /></Link>
                </div>
            ),
        }
    ], []
    );

    return (
        <React.Fragment>
            <BreadCrumb title='Support Tickets' pageTitle='Support' />
            <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-12">
                <div className="xl:col-span-3">
                    <div className="card">
                        <div className="flex items-center gap-3 card-body">
                            <div className="flex items-center justify-center size-12 text-red-500 bg-red-100 rounded-md text-15 dark:bg-red-500/20 shrink-0"><FileBarChart2 /></div>
                            <div className="grow">
                                <h5 className="mb-1 text-16">
                                    <CountUp end={totalResults || 0} className="counter-value" />
                                </h5>
                                <p className="text-slate-500 dark:text-zinc-200">Total Tickets</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3">
                    <div className="card">
                        <div className="flex items-center gap-3 card-body">
                            <div className="flex items-center justify-center size-12 text-green-500 bg-green-100 rounded-md text-15 dark:bg-green-500/20 shrink-0"><CalendarDays /></div>
                            <div className="grow">
                                <h5 className="mb-1 text-16">
                                    <CountUp end={12} className="counter-value" />
                                </h5>
                                <p className="text-slate-500 dark:text-zinc-200">Annual Leave</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3">
                    <div className="card">
                        <div className="flex items-center gap-3 card-body">
                            <div className="flex items-center justify-center size-12 text-purple-500 bg-purple-100 rounded-md text-15 dark:bg-purple-500/20 shrink-0"><Stethoscope /></div>
                            <div className="grow">
                                <h5 className="mb-1 text-16">
                                    <CountUp end={4} className="counter-value" />
                                </h5>
                                <p className="text-slate-500 dark:text-zinc-200">Medical Leave</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3">
                    <div className="card">
                        <div className="flex items-center gap-3 card-body">
                            <div className="flex items-center justify-center size-12 rounded-md text-sky-500 bg-sky-100 text-15 dark:bg-sky-500/20 shrink-0"><Anchor /></div>
                            <div className="grow">
                                <h5 className="mb-1 text-16">
                                    <CountUp end={11} className="counter-value" />
                                </h5>
                                <p className="text-slate-500 dark:text-zinc-200">Remaining Leave</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" id="ordersTable">
                <div className="card-body">
                    
                    <div className="grid grid-cols-1 gap-4 mb-5 lg:grid-cols-2 xl:grid-cols-12">
                        <div className="xl:col-span-3">
                            <div className="relative">
                                <input type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" placeholder="Search for ..." autoComplete="off" />
                                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zinc-200 fill-slate-100 dark:fill-zinc-600" />
                            </div>
                        </div>
                        <div className="xl:col-span-2">
                            <Select
                                className="border-slate-200 focus:outline-none focus:border-fecustom-500"
                                options={options}
                                isSearchable={false} // To disable search
                                name="statusFilterSelect"
                                id="statusFilterSelect"
                            />
                        </div>
                        
                        <div className="xl:col-span-2 xl:col-start-11">
                            <div className="lg:ltr:text-right lg:rtl:text-left">
                                 <div className="ltr:lg:text-right rtl:lg:text-left">
                                <Link to="/support/add-support-ticket" type="button" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20"><Plus className="inline-block size-4" /> <span className="align-middle">Add Ticket</span></Link>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="py-6 text-center">
                                <p>Loading tickets...</p>
                            </div>
                        ) : error ? (
                            <div className="py-6 text-center">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : data && data.length > 0 ? (
                            <TableContainer
                                isPagination={true}
                                columns={(columns || [])}
                                data={(data || [])}
                                customPageSize={10}
                                divclassName="overflow-x-auto"
                                tableclassName="w-full whitespace-nowrap"
                                theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:bg-zinc-600 dark:text-zinc-200"
                                thclassName="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zinc-500"
                                tdclassName="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500"
                                PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                            />
                        ) : (
                            <div className="noresult">
                                <div className="py-6 text-center">
                                    <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                                    <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                                    <p className="mb-0 text-slate-500 dark:text-zinc-200">No support tickets found.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SupportTickets;
function fetchSupportStatuses(): any {
    throw new Error('Function not implemented.');
}

