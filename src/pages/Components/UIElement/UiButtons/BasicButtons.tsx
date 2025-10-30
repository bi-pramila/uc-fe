import React from "react";

const BasicButtons = () => {
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Basic Buttons</h6>
                    <div className="flex flex-wrap gap-2">
                        <button type="button" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Custom Button</button>
                        <button type="button" className="text-fecustom-500 btn bg-fecustom-100 hover:text-white hover:bg-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:ring active:ring-fecustom-100 dark:bg-fecustom-500/20 dark:text-fecustom-500 dark:hover:bg-fecustom-500 dark:hover:text-white dark:focus:bg-fecustom-500 dark:focus:text-white dark:active:bg-fecustom-500 dark:active:text-white dark:ring-fecustom-400/20">Soft Button</button>
                        <button type="button" className="bg-white border-dashed text-fecustom-500 btn border-fecustom-500 hover:text-fecustom-500 hover:bg-fecustom-50 hover:border-fecustom-600 focus:text-fecustom-600 focus:bg-fecustom-50 focus:border-fecustom-600 active:text-fecustom-600 active:bg-fecustom-50 active:border-fecustom-600 dark:bg-zinc-700 dark:ring-fecustom-400/20 dark:hover:bg-fecustom-800/20 dark:focus:bg-fecustom-800/20 dark:active:bg-fecustom-800/20">Dashed Buttons</button>
                        <button type="button" className="bg-white text-fecustom-500 btn border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:bg-zinc-700 dark:hover:bg-fecustom-500 dark:ring-fecustom-400/20 dark:focus:bg-fecustom-500">Outline Button</button>
                        <button type="button" className="bg-white text-fecustom-500 btn hover:text-fecustom-500 hover:bg-fecustom-100 focus:text-fecustom-500 focus:bg-fecustom-100 active:text-fecustom-500 active:bg-fecustom-100 dark:bg-zinc-700 dark:hover:bg-fecustom-500/10 dark:focus:bg-fecustom-500/10 dark:active:bg-fecustom-500/10">Ghost Button</button>
                        <a href="#!" className="bg-white border-white text-fecustom-500 btn hover:text-fecustom-700 focus:text-fecustom-700 active:text-fecustom-700 dark:bg-zinc-700 dark:border-zinc-700">Btn Link</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Basic Buttons</h6>
                    <div className="flex flex-wrap gap-2">
                        <button type="button" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Custom</button>
                        <button type="button" className="text-white bg-green-500 border-green-500 btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/10">Green</button>
                        <button type="button" className="text-white bg-orange-500 border-orange-500 btn hover:text-white hover:bg-orange-600 hover:border-orange-600 focus:text-white focus:bg-orange-600 focus:border-orange-600 focus:ring focus:ring-orange-100 active:text-white active:bg-orange-600 active:border-orange-600 active:ring active:ring-orange-100 dark:ring-orange-400/10">Orange</button>
                        <button type="button" className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20">Sky</button>
                        <button type="button" className="text-white bg-yellow-500 border-yellow-500 btn hover:text-white hover:bg-yellow-600 hover:border-yellow-600 focus:text-white focus:bg-yellow-600 focus:border-yellow-600 focus:ring focus:ring-yellow-100 active:text-white active:bg-yellow-600 active:border-yellow-600 active:ring active:ring-yellow-100 dark:ring-yellow-400/10">Yellow</button>
                        <button type="button" className="text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-fecustom-400/20">Red</button>
                        <button type="button" className="text-white bg-purple-500 border-purple-500 btn hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:text-white focus:bg-purple-600 focus:border-purple-600 focus:ring focus:ring-purple-100 active:text-white active:bg-purple-600 active:border-purple-600 active:ring active:ring-purple-100 dark:ring-purple-400/10">Purple</button>
                        <button type="button" className="text-white btn bg-slate-500 border-slate-500 hover:text-white hover:bg-slate-600 hover:border-slate-600 focus:text-white focus:bg-slate-600 focus:border-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:border-slate-600 active:ring active:ring-slate-100 dark:ring-slate-400/10">Slate</button>
                        <button type="button" className="text-slate-500 btn bg-slate-200 border-slate-200 hover:text-slate-600 hover:bg-slate-300 hover:border-slate-300 focus:text-slate-600 focus:bg-slate-300 focus:border-slate-300 focus:ring focus:ring-slate-100 active:text-slate-600 active:bg-slate-300 active:border-slate-300 active:ring active:ring-slate-100 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-200 dark:ring-zinc-400/50">Light</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BasicButtons;