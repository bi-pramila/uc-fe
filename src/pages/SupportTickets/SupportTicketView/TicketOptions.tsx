import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';

const TicketOptions = () => {

    const options = [
        { value: '', label: 'Select Employee' },
        { value: 'Willie Torres', label: 'Willie Torres' },
        { value: 'Patricia Garcia', label: 'Patricia Garcia' },
        { value: 'Juliette Fecteau', label: 'Juliette Fecteau' },
        { value: 'Thomas Hatfield', label: 'Thomas Hatfield' },
        { value: 'Willie Torres', label: 'Willie Torres' },
        { value: 'Juliette Fecteau', label: 'Juliette Fecteau' },
        { value: 'Nancy Reynolds', label: 'Nancy Reynolds' },
        { value: 'Holly Kavanaugh', label: 'Holly Kavanaugh' },
        { value: 'Jonas Frederiksen', label: 'Jonas Frederiksen' },
    ];

    const leaveOptions = [
        { value: '', label: 'Select Leave Type' },
        { value: 'Medical Leave', label: 'Medical Leave' },
        { value: 'Casual Leave', label: 'Casual Leave' },
        { value: 'Sick Leave', label: 'Sick Leave' },
        { value: 'Annual Leave', label: 'Annual Leave' },
    ];

    const leaveOptions1 = [
        { value: '', label: 'Select Leave Day' },
        { value: 'Full Day', label: 'Full Day' },
        { value: 'Half Day', label: 'Half Day' },
    ];

    const departmentOptions = [
        { value: 'Technical Support', label: 'Technical Support' },
        { value: 'Sales Department', label: 'Sales Department' },
        { value: 'Human Resources', label: 'Human Resources' },
    ];

    return (
        <React.Fragment>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-12">
                    <div className="card">
                        <div className="card-body">
                            <form action="#!">
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="employeeName" className="inline-block mb-2 text-base font-medium">Department</label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                                options={departmentOptions}
                                                isSearchable={false} // If you want to disable search
                                                name="employeeName"
                                                id="employeeName"
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="employeeName" className="inline-block mb-2 text-base font-medium">Client</label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                                options={options}
                                                isSearchable={false} // If you want to disable search
                                                name="employeeName"
                                                id="employeeName"
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-12">
                                        <div>
                                            <label htmlFor="remainingLeaves" className="inline-block mb-2 text-base font-medium">Subject</label>
                                            <input type="text" id="remainingLeaves" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="leaveType" className="inline-block mb-2 text-base font-medium">Department</label>
                                            <Select
                                                className="border-slate-200 focus:outline-none focus:border-fecustom-500"
                                                options={leaveOptions}
                                                isSearchable={false} // To disable search
                                                name="leaveType"
                                                id="leaveType"
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="employeeName" className="inline-block mb-2 text-base font-medium">Status</label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                                options={options}
                                                isSearchable={false} // If you want to disable search
                                                name="employeeName"
                                                id="employeeName"
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <div>
                                            <label htmlFor="employeeName" className="inline-block mb-2 text-base font-medium">Priority</label>
                                            <Select
                                                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                                options={options}
                                                isSearchable={false} // If you want to disable search
                                                name="employeeName"
                                                id="employeeName"
                                            />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="leaveDayInput" className="inline-block mb-2 text-base font-medium">CC Reciepents</label>
                                        <Select
                                            className="border-slate-200 focus:outline-none focus:border-fecustom-500"
                                            options={leaveOptions1}
                                            isSearchable={false} // To disable search
                                            name="leaveDayInput"
                                            id="leaveDayInput"
                                        />
                                    </div>
                                    <div className="md:col-span-2 xl:col-span-12">
                                        <div>
                                            <label htmlFor="reasonInput" className="inline-block mb-2 text-base font-medium">Ticket Description</label>
                                            <textarea className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" id="reasonInput" rows={3}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zinc-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                                    <button type="submit" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Add Leave</button>
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
