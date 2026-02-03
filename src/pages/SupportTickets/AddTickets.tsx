import React, { useEffect, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchSupportDepartments, 
    getClients, 
    createTicket 
} from 'slices/supportTickets/thunk';
import { useNavigate } from 'react-router-dom';


const AddTickets = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const { departments, clients, submitting, error } = useSelector((state: any) => state.SupportTickets);

    const [formData, setFormData] = useState({
        clientId: '',
        name: '',
        email: '',
        department: '',
        subject: '',
        message: '',
        priority: 'Medium',
        ccrecipients: ''
    });

    const [selectedClient, setSelectedClient] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchSupportDepartments());
        dispatch(getClients());
    }, [dispatch]);

    // Transform departments for react-select
    const departmentOptions = departments?.map((dept: any) => ({
        value: dept.id,
        label: dept.name
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
        if (option) {
            setFormData(prev => ({
                ...prev,
                clientId: option.value,
                name: `${option.firstname} ${option.lastname}`,
                email: option.email
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                clientId: '',
                name: '',
                email: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const ticketData = {
                clientid: formData.clientId,
                deptid: formData.department,
                subject: formData.subject,
                message: formData.message,
                priority: formData.priority,
                ...(formData.ccrecipients && { ccrecipients: formData.ccrecipients })
            };

            const result = await dispatch(createTicket(ticketData)).unwrap();
            
            if (result.result === 'success') {
                // Redirect to tickets list or show success message
                navigate('/support-tickets');
            }
        } catch (err) {
            console.error('Error creating ticket:', err);
        }
    };

    const handleReset = () => {
        setFormData({
            clientId: '',
            name: '',
            email: '',
            department: '',
            subject: '',
            message: '',
            priority: 'Medium',
            ccrecipients: ''
        });
        setSelectedClient(null);
    };

    return (
        <React.Fragment>
            <BreadCrumb title='Add Tickets' pageTitle='Support Tickets' />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-12">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15 grow">Add Tickets</h6>
                            {error && (
                                <div className="px-4 py-3 mb-4 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="clientSelect" className="inline-block mb-2 text-base font-medium">Client <span className="text-red-500">*</span></label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                                options={clientOptions}
                                                isSearchable={true}
                                                name="clientSelect"
                                                id="clientSelect"
                                                value={selectedClient}
                                                onChange={handleClientChange}
                                                placeholder="Select Client"
                                                isClearable
                                                isLoading={!clients}
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="name" className="inline-block mb-2 text-base font-medium">Name</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                                value={formData.name}
                                                disabled={!!selectedClient}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="department" className="inline-block mb-2 text-base font-medium">Department <span className="text-red-500">*</span></label>
                                            <Select
                                                className="border-slate-200 focus:outline-none focus:border-fecustom-500"
                                                options={departmentOptions}
                                                isSearchable={true}
                                                name="department"
                                                id="department"
                                                value={departmentOptions.find((opt: any) => opt.value === formData.department)}
                                                onChange={(option: any) => setFormData({...formData, department: option?.value || ''})}
                                                placeholder="Select Department"
                                                isLoading={!departments?.length}
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="email" className="inline-block mb-2 text-base font-medium">Email Address</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                                value={formData.email}
                                                disabled={!!selectedClient}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-12">
                                        <div>
                                            <label htmlFor="subject" className="inline-block mb-2 text-base font-medium">Subject <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" 
                                                id="subject" 
                                                className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" 
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                                required
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
                                                value={priorityOptions.find(opt => opt.value === formData.priority)}
                                                onChange={(option: any) => setFormData({...formData, priority: option?.value || 'Medium'})}
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
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
                                            <label htmlFor="message" className="inline-block mb-2 text-base font-medium">Ticket Description <span className="text-red-500">*</span></label>
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
                                        disabled={submitting || !formData.clientId || !formData.department || !formData.subject || !formData.message}
                                    >
                                        {submitting ? 'Creating...' : 'Create Ticket'}
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

export default AddTickets;
