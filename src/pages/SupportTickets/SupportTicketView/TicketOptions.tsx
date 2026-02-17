import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSupportDepartments, fetchSupportStatuses, getClients, updateTicket, getTicket } from 'slices/supportTickets/thunk';
import { Editor } from '@tinymce/tinymce-react';

const TicketOptions = () => {
    const dispatch = useDispatch<any>();
    const { id } = useParams<{ id: string }>();
    
    const { departments, statuses, clients, ticketDetails, submitting, error } = useSelector((state: any) => state.SupportTickets);

    const [formData, setFormData] = useState({
        deptid: '',
        subject: '',
        userid: '',
        status: '',
        priority: '',
        message: '',
        ccrecipients: ''
    });

    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
    const [selectedStatus, setSelectedStatus] = useState<any>(null);
    const [selectedPriority, setSelectedPriority] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchSupportDepartments());
        dispatch(fetchSupportStatuses());
        dispatch(getClients());
    }, [dispatch]);

    // Populate form when ticket details are loaded
    useEffect(() => {
        if (ticketDetails) {
            setFormData({
                deptid: ticketDetails.deptid || '',
                subject: ticketDetails.subject || '',
                userid: ticketDetails.userid || '',
                status: ticketDetails.status || '',
                priority: ticketDetails.priority || '',
                message: ticketDetails.message || '',
                ccrecipients: ticketDetails.cc || ''
            });

            // Set selected values for react-select
            if (ticketDetails.deptid) {
                const dept = departmentOptions.find((opt: any) => opt.value === ticketDetails.deptid);
                setSelectedDepartment(dept);
            }

            if (ticketDetails.status) {
                const stat = statusOptions.find((opt: any) => opt.label === ticketDetails.status);
                setSelectedStatus(stat);
            }

            if (ticketDetails.priority) {
                const prior = priorityOptions.find((opt: any) => opt.value === ticketDetails.priority);
                setSelectedPriority(prior);
            }

            if (ticketDetails.userid) {
                const client = clientOptions.find((opt: any) => opt.value === ticketDetails.userid);
                setSelectedClient(client);
            }
        }
    }, [ticketDetails, departments, statuses, clients]);

    // Transform departments for react-select
    const departmentOptions = departments?.map((dept: any) => ({
        value: dept.id,
        label: dept.name
    })) || [];

    // Transform statuses for react-select
    const statusOptions = statuses?.map((status: any) => ({
        value: status.id || status.title,
        label: status.title || status.name
    })) || [];

    // Transform clients for react-select
    const clientOptions = clients?.clients?.client?.map((client: any) => ({
        value: client.id,
        label: `${client.firstname} ${client.lastname}`,
        email: client.email,
        firstname: client.firstname,
        lastname: client.lastname
    })) || [];

    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
    ];

    const handleClientChange = (option: any) => {
        setSelectedClient(option);
        setFormData(prev => ({
            ...prev,
            userid: option?.value || ''
        }));
    };

    const handleDepartmentChange = (option: any) => {
        setSelectedDepartment(option);
        setFormData(prev => ({
            ...prev,
            deptid: option?.value || ''
        }));
    };

    const handleStatusChange = (option: any) => {
        setSelectedStatus(option);
        setFormData(prev => ({
            ...prev,
            status: option?.label || ''
        }));
    };

    const handlePriorityChange = (option: any) => {
        setSelectedPriority(option);
        setFormData(prev => ({
            ...prev,
            priority: option?.value || ''
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!id) return;

        try {
            const updateData: any = {
                ticketid: parseInt(id),
                action: 'UpdateTicket'
            };

            // Only include fields that have values
            if (formData.deptid) updateData.deptid = parseInt(formData.deptid);
            if (formData.subject) updateData.subject = formData.subject;
            if (formData.userid) {
                updateData.userid = parseInt(formData.userid);
                updateData.clientid = parseInt(formData.userid); // Add clientid for update
            }
            if (formData.status) updateData.status = formData.status;
            if (formData.priority) updateData.priority = formData.priority;
            if (formData.message) updateData.message = formData.message;
            if (formData.ccrecipients) updateData.cc = formData.ccrecipients;

            const result = await dispatch(updateTicket({ ticketId: id, data: updateData })).unwrap();
            
            if (result.result === 'success') {
                // Refresh ticket details
                dispatch(getTicket(id));
                alert('Ticket updated successfully');
            }
        } catch (err) {
            console.error('Error updating ticket:', err);
            alert('Failed to update ticket');
        }
    };

    const handleReset = () => {
        // Reset to original ticket details
        if (ticketDetails) {
            setFormData({
                deptid: ticketDetails.deptid || '',
                subject: ticketDetails.subject || '',
                userid: ticketDetails.userid || '',
                status: ticketDetails.status || '',
                priority: ticketDetails.priority || '',
                message: ticketDetails.message || '',
                ccrecipients: ticketDetails.cc || ''
            });
        }
    };

    return (
        <React.Fragment>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-12">
                    <div className="card">
                        <div className="card-body">
                            {error && (
                                <div className="px-4 py-3 mb-4 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="department" className="inline-block mb-2 text-base font-medium">Department</label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                                options={departmentOptions}
                                                isSearchable={true}
                                                name="department"
                                                id="department"
                                                value={selectedDepartment}
                                                onChange={handleDepartmentChange}
                                                placeholder="Select Department"
                                                isLoading={!departments?.length}
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="clientSelect" className="inline-block mb-2 text-base font-medium">Client</label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                                options={clientOptions}
                                                isSearchable={true}
                                                name="clientSelect"
                                                id="clientSelect"
                                                value={selectedClient}
                                                onChange={handleClientChange}
                                                placeholder="Select Client"
                                                isLoading={!clients}
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-12">
                                        <div>
                                            <label htmlFor="subject" className="inline-block mb-2 text-base font-medium">Subject</label>
                                            <input 
                                                type="text" 
                                                id="subject" 
                                                className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="status" className="inline-block mb-2 text-base font-medium">Status</label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                                options={statusOptions}
                                                isSearchable={false}
                                                name="status"
                                                id="status"
                                                value={selectedStatus}
                                                onChange={handleStatusChange}
                                                placeholder="Select Status"
                                                isLoading={!statuses?.length}
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="priority" className="inline-block mb-2 text-base font-medium">Priority</label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                                options={priorityOptions}
                                                isSearchable={false}
                                                name="priority"
                                                id="priority"
                                                value={selectedPriority}
                                                onChange={handlePriorityChange}
                                                placeholder="Select Priority"
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-12">
                                        <label htmlFor="ccrecipients" className="inline-block mb-2 text-base font-medium">CC Recipients</label>
                                        <input 
                                            type="text" 
                                            id="ccrecipients" 
                                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                            value={formData.ccrecipients}
                                            onChange={(e) => setFormData({...formData, ccrecipients: e.target.value})}
                                            placeholder="Comma separated email addresses"
                                        />
                                    </div>
                                    <div className="md:col-span-2 xl:col-span-12">
                                        <div>
                                            <label htmlFor="message" className="inline-block mb-2 text-base font-medium">Ticket Description</label>
                                            <Editor
                                                apiKey="fa6066jy8lf383vm46h917goj6s5vijgvfkopig8uzjym6y1"
                                                value={formData.message}
                                                onEditorChange={(content) => setFormData({...formData, message: content})}
                                                init={{
                                                    height: 300,
                                                    menubar: false,
                                                    plugins: [
                                                        "advlist", "autolink", "lists", "link", "image",
                                                        "charmap", "preview", "anchor", "searchreplace",
                                                        "visualblocks", "code", "fullscreen",
                                                        "insertdatetime", "media", "table", "help", "wordcount"
                                                    ],
                                                    toolbar:
                                                        "undo redo | formatselect | bold italic backcolor | \
                                                        alignleft aligncenter alignright alignjustify | \
                                                        bullist numlist outdent indent | image | removeformat | help",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button 
                                        type="button"
                                        onClick={handleReset}
                                        className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zinc-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                                        disabled={submitting}
                                    >
                                        Reset
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Updating...' : 'Update Ticket'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TicketOptions;
