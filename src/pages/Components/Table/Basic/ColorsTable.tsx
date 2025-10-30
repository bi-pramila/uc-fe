import React from "react";

const ColorsTable = () => {
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Primary Colors Table</h6>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-fecustom-50 dark:bg-fecustom-500/10">
                            <thead className="ltr:text-left rtl:text-right bg-fecustom-100 dark:bg-fecustom-500/10">
                                <tr>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-fecustom-200 dark:border-fecustom-900">Order ID</th>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-fecustom-200 dark:border-fecustom-900">Shop</th>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-fecustom-200 dark:border-fecustom-900">Customer</th>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-fecustom-200 dark:border-fecustom-900">Price</th>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-fecustom-200 dark:border-fecustom-900">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600">#541254265</a></td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">Amezon</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">Cleo Carson</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">$4,521</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600"><i className="ri-download-2-line"></i></a></td>
                                </tr>
                                <tr>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600">#744145235</a></td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">Shoppers</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">Juston Eichmann</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">$7,546</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600"><i className="ri-download-2-line"></i></a></td>
                                </tr>
                                <tr>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600">#9855126598</a></td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">Flipkart</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">Bettie Johson</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">$1,350</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600"><i className="ri-download-2-line"></i></a></td>
                                </tr>
                                <tr>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600">#847512653</a></td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">Tailwick</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">Maritza Blanda</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900">$4,521</td>
                                    <td className="px-3.5 py-2.5 border-y border-fecustom-200 dark:border-fecustom-900"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600"><i className="ri-download-2-line"></i></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Dark Table</h6>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-slate-800 dark:zinc-600">
                            <thead className="ltr:text-left rtl:text-right bg-white/5">
                                <tr>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Order ID</th>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Shop</th>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Customer</th>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Price</th>
                                    <th className="px-3.5 py-2.5 font-semibold border-b border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600">#541254265</a></td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Amezon</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Cleo Carson</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">$4,521</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600"><i className="ri-download-2-line"></i></a></td>
                                </tr>
                                <tr>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600">#744145235</a></td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Shoppers</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Juston Eichmann</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">$7,546</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600"><i className="ri-download-2-line"></i></a></td>
                                </tr>
                                <tr>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600">#9855126598</a></td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Flipkart</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Bettie Johson</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">$1,350</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600"><i className="ri-download-2-line"></i></a></td>
                                </tr>
                                <tr>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600">#847512653</a></td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Tailwick</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">Maritza Blanda</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200">$4,521</td>
                                    <td className="px-3.5 py-2.5 border-y border-slate-700 dark:border-zinc-500 text-slate-400 dark:text-zinc-200"><a href="#!" className="transition-all duration-150 ease-linear text-fecustom-500 hover:text-fecustom-600"><i className="ri-download-2-line"></i></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ColorsTable;