
import BreadCrumb from 'Common/BreadCrumb';
import { Nav } from "Common/Components/Tab/Nav";
import Tab from "Common/Components/Tab/Tab";
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// Icons
import { Info, Pencil, Ticket } from 'lucide-react';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getTicket, fetchSupportStatuses } from 'slices/supportTickets/thunk';

import AddReply from './AddReply';
import OtherTickets from './OtherTickets';
import AddNote from './AddNote';
import ClientLogs from 'pages/SupportTickets/SupportTicketView/ClientLogs';
import ActivityLogs from './Logs';
import TicketOptions from './TicketOptions';

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

const SupportTicketView = () => {

    const dispatch = useDispatch<any>();
    const { id } = useParams<{ id: string }>();

    const selectSupportTicketsData = createSelector(
        (state: any) => state.SupportTickets,
        (supportTickets) => ({
            tickets: supportTickets.tickets,
            ticketDetails: supportTickets.ticketDetails,
            totalResults: supportTickets.totalResults,
            loading: supportTickets.loading,
            error: supportTickets.error
        })
    );

    const { tickets, ticketDetails, totalResults, loading, error } = useSelector(selectSupportTicketsData);

    const [data, setData] = useState<any>(LeaveManageEmployeeData);
    const [value, setValue] = useState('');

    // Fetch ticket details and statuses
    useEffect(() => {
        if (id) {
            console.log(`Fetching ticket details for ID: ${id}`);
            dispatch(getTicket(id));
        }
        dispatch(fetchSupportStatuses());
    }, [dispatch, id]);

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
            // setData(transformedData);
        }
    }, [tickets]);

    // Search Data
    const filterSearchData = (e: any) => {
        const search = e.target.value;
        const keysToSearch = ['leaveType', 'reason', 'noOfDays', 'from', 'to', 'approvedBy', 'status'];
        // filterDataBySearch(dataList, search, keysToSearch, setData);
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
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-blue-100 border-transparent text-blue-500 dark:bg-blue-500/20 dark:border-transparent">{item}</span>);
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
                <Link to="#!" className="font-semibold text-fecustom-500">#{cell.getValue()}</Link>
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
            <BreadCrumb title='Support Ticket' pageTitle='Support' />
            <div className="card">
                <div className="card-body">
                    <Tab.Container defaultActiveKey="addReplyTab">
                    
                        <Nav className="flex flex-wrap w-full text-sm font-medium text-center border-b border-slate-200 dark:border-zinc-500 nav-tabs">
                            <Nav.Item eventKey="addReplyTab" className="group">
                                <a href="#!" data-tab-toggle data-target="addReplyTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zinc-200 border border-transparent border-t-2 group-[.active]:text-blue-500 group-[.active]:border-slate-200 dark:group-[.active]:border-zinc-500 group-[.active]:border-t-blue-500 dark:group-[.active]:border-t-blue-500 group-[.active]:border-b-white dark:group-[.active]:border-b-zinc-700 hover:text-blue-500 active:text-blue-500 dark:hover:text-blue-500 dark:active:text-blue-500 -mb-[1px]">Add Reply</a>
                            </Nav.Item>
                            <Nav.Item eventKey="addNoteTab" className="group">
                                <a href="#!" data-tab-toggle data-target="addNoteTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zinc-200 border border-transparent border-t-2 group-[.active]:text-blue-500 group-[.active]:border-slate-200 dark:group-[.active]:border-zinc-500 group-[.active]:border-t-blue-500 dark:group-[.active]:border-t-blue-500 group-[.active]:border-b-white dark:group-[.active]:border-b-zinc-700 hover:text-blue-500 active:text-blue-500 dark:hover:text-blue-500 dark:active:text-blue-500 -mb-[1px]">Add Note</a>
                            </Nav.Item>
                            <Nav.Item eventKey="customFieldsTab" className="group">
                                <a href="#!" data-tab-toggle data-target="customFieldsTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zinc-200 border border-transparent border-t-2 group-[.active]:text-blue-500 group-[.active]:border-slate-200 dark:group-[.active]:border-zinc-500 group-[.active]:border-t-blue-500 dark:group-[.active]:border-t-blue-500 group-[.active]:border-b-white dark:group-[.active]:border-b-zinc-700 hover:text-blue-500 active:text-blue-500 dark:hover:text-blue-500 dark:active:text-blue-500 -mb-[1px]">Custom Fields</a>
                            </Nav.Item>
                            <Nav.Item eventKey="otherTicketsTab" className="group">
                                <a href="#!" data-tab-toggle data-target="otherTicketsTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zinc-200 border border-transparent border-t-2 group-[.active]:text-blue-500 group-[.active]:border-slate-200 dark:group-[.active]:border-zinc-500 group-[.active]:border-t-blue-500 dark:group-[.active]:border-t-blue-500 group-[.active]:border-b-white dark:group-[.active]:border-b-zinc-700 hover:text-blue-500 active:text-blue-500 dark:hover:text-blue-500 dark:active:text-blue-500 -mb-[1px]">Other Tickets</a>
                            </Nav.Item>
                            <Nav.Item eventKey="clientLogTab" className="group">
                                <a href="#!" data-tab-toggle data-target="clientLogTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zinc-200 border border-transparent border-t-2 group-[.active]:text-blue-500 group-[.active]:border-slate-200 dark:group-[.active]:border-zinc-500 group-[.active]:border-t-blue-500 dark:group-[.active]:border-t-blue-500 group-[.active]:border-b-white dark:group-[.active]:border-b-zinc-700 hover:text-blue-500 active:text-blue-500 dark:hover:text-blue-500 dark:active:text-blue-500 -mb-[1px]">Client Log</a>
                            </Nav.Item>
                            <Nav.Item eventKey="optionsTab" className="group">
                                <a href="#!" data-tab-toggle data-target="optionsTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zinc-200 border border-transparent border-t-2 group-[.active]:text-blue-500 group-[.active]:border-slate-200 dark:group-[.active]:border-zinc-500 group-[.active]:border-t-blue-500 dark:group-[.active]:border-t-blue-500 group-[.active]:border-b-white dark:group-[.active]:border-b-zinc-700 hover:text-blue-500 active:text-blue-500 dark:hover:text-blue-500 dark:active:text-blue-500 -mb-[1px]">Options</a>
                            </Nav.Item>
                            <Nav.Item eventKey="logTab" className="group">
                                <a href="#!" data-tab-toggle data-target="logTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zinc-200 border border-transparent border-t-2 group-[.active]:text-blue-500 group-[.active]:border-slate-200 dark:group-[.active]:border-zinc-500 group-[.active]:border-t-blue-500 dark:group-[.active]:border-t-blue-500 group-[.active]:border-b-white dark:group-[.active]:border-b-zinc-700 hover:text-blue-500 active:text-blue-500 dark:hover:text-blue-500 dark:active:text-blue-500 -mb-[1px]">Log</a>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className="mt-5 tab-content">
                            <Tab.Pane eventKey="addReplyTab" id="addReplyTab">
                                <p className="mb-0"><AddReply/></p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="addNoteTab" id="addNoteTab">
                                <p className="mb-0"><AddNote/> </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="customFieldsTab" id="customFieldsTab">
                                <p className="mb-0">Setting  </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="otherTicketsTab" id="otherTicketsTab">
                                <p className="mb-0"><OtherTickets/></p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="clientLogTab" id="clientLogTab">
                                <p className="mb-0"><ClientLogs/></p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="optionsTab" id="optionsTab">
                                <p className="mb-0"><TicketOptions/></p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="logTab" id="logTab">
                                <p className="mb-0"><ActivityLogs/></p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
            
        </React.Fragment>
    );
};

export default SupportTicketView;
