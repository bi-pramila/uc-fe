
import BreadCrumb from 'Common/BreadCrumb';
import { Nav } from "Common/Components/Tab/Nav";
import Tab from "Common/Components/Tab/Tab";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getTicket } from 'slices/supportTickets/thunk';

import ClientLogs from 'pages/SupportTickets/SupportTicketView/ClientLogs';
import AddNote from './AddNote';
import AddReply from './AddReply';
import ActivityLogs from './Logs';
import OtherTickets from './OtherTickets';
import TicketOptions from './TicketOptions';

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

    const { ticketDetails, totalResults, loading, error } = useSelector(selectSupportTicketsData);

    const [data, setData] = useState<any>(null);
    const [value, setValue] = useState('');

    console.log('Ticket Details:', ticketDetails);

    // Fetch ticket details and statuses
    useEffect(() => {
        if (id) {
            console.log(`Fetching ticket details for ID: ${id}`);
            dispatch(getTicket(id));
        }
    }, [dispatch, id]);

    // Table Head Action On Right
    useEffect(() => {
        const tableHead = document.querySelectorAll("th");
        const lastTheadElement = tableHead[tableHead.length - 1];
        lastTheadElement?.classList.add("ltr:text-right", "rtl:text-left");

        return () => {
            lastTheadElement?.classList.remove("ltr:text-right", "rtl:text-left");
        };
    });


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
                                <AddReply/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="addNoteTab" id="addNoteTab">
                                <AddNote/> 
                            </Tab.Pane>
                            <Tab.Pane eventKey="customFieldsTab" id="customFieldsTab">
                                Setting  
                            </Tab.Pane>
                            <Tab.Pane eventKey="otherTicketsTab" id="otherTicketsTab">
                                <OtherTickets/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="clientLogTab" id="clientLogTab">
                                <ClientLogs/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="optionsTab" id="optionsTab">
                                <TicketOptions/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="logTab" id="logTab">
                                <ActivityLogs/>
                            </Tab.Pane>
                        </Tab.Content>

                    </Tab.Container>
                </div>

            </div>
            
        </React.Fragment>
    );
};

export default SupportTicketView;
