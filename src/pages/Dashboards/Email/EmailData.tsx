import { Dropdown } from 'Common/Components/Dropdown';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { EmailDataChart } from './Charts';
import { Link } from 'react-router-dom';

const EmailData = () => {
    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-6">
                <div className="card-body">
                    <div className="flex items-center gap-2">
                        <h6 className="text-15 grow">Email Data</h6>
                        <Dropdown className="relative">
                            <Dropdown.Trigger type="button" className="px-2 py-1.5 text-xs bg-white border-dashed text-fecustom-500 btn border-fecustom-500 hover:text-fecustom-500 hover:bg-fecustom-50 hover:border-fecustom-600 focus:text-fecustom-600 focus:bg-fecustom-50 focus:border-fecustom-600 active:text-fecustom-600 active:bg-fecustom-50 active:border-fecustom-600 dark:bg-zinc-700 dark:ring-fecustom-400/20 dark:hover:bg-fecustom-800/20 dark:focus:bg-fecustom-800/20 dark:active:bg-fecustom-800/20 dropdown-toggle" id="emailDataDropdown" data-bs-toggle="dropdown">
                                This Yearly 
                                <ChevronDown className="inline-block size-4 ltr:ml-1 rlt:mr-1"></ChevronDown>
                            </Dropdown.Trigger>

                            <Dropdown.Content placement="right-end" className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zinc-600" aria-labelledby="emailDataDropdown">
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zinc-100 dark:hover:bg-zinc-500 dark:hover:text-zinc-200 dark:focus:bg-zinc-500 dark:focus:text-zinc-200" to="#!">1 Weekly</Link>
                                </li>
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zinc-100 dark:hover:bg-zinc-500 dark:hover:text-zinc-200 dark:focus:bg-zinc-500 dark:focus:text-zinc-200" to="#!">1 Monthly</Link>
                                </li>
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zinc-100 dark:hover:bg-zinc-500 dark:hover:text-zinc-200 dark:focus:bg-zinc-500 dark:focus:text-zinc-200" to="#!">3 Monthly</Link>
                                </li>
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zinc-100 dark:hover:bg-zinc-500 dark:hover:text-zinc-200 dark:focus:bg-zinc-500 dark:focus:text-zinc-200" to="#!">6 Monthly</Link>
                                </li>
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zinc-100 dark:hover:bg-zinc-500 dark:hover:text-zinc-200 dark:focus:bg-zinc-500 dark:focus:text-zinc-200" to="#!">This Yearly</Link>
                                </li>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <EmailDataChart chartId="emailDataChart" />
                </div>
            </div>
        </React.Fragment>
    );
};

export default EmailData;
