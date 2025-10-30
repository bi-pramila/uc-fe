import React from "react";

const SizesRounded = () => {
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Buttons Sizes</h6>
                    <div className="flex flex-wrap items-center gap-2">
                        <button type="button" className="py-1 text-xs px-1.5 text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Custom Button</button>
                        <button type="button" className="px-2 py-1.5 text-xs text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Custom Button</button>
                        <button type="button" className="px-2.5 py-2 text-xs text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Custom Button</button>
                        <button type="button" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Custom Button</button>
                        <button type="button" className="px-4 py-2.5 text-15 text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Custom Button</button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Rounded Buttons</h6>
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                        <div className="flex flex-wrap gap-2">
                            <button type="button" className="text-white rounded-full btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Custom Button</button>
                            <button type="button" className="rounded-full text-fecustom-500 btn bg-fecustom-100 hover:text-white hover:bg-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:ring active:ring-fecustom-100 dark:bg-fecustom-500/20 dark:text-fecustom-500 dark:hover:bg-fecustom-500 dark:hover:text-white dark:focus:bg-fecustom-500 dark:focus:text-white dark:active:bg-fecustom-500 dark:active:text-white dark:ring-fecustom-400/20">Soft Button</button>
                            <button type="button" className="bg-white border-dashed rounded-full text-fecustom-500 btn border-fecustom-500 hover:text-fecustom-500 hover:bg-fecustom-50 hover:border-fecustom-600 focus:text-fecustom-600 focus:bg-fecustom-50 focus:border-fecustom-600 active:text-fecustom-600 active:bg-fecustom-50 active:border-fecustom-600 dark:bg-zinc-700 dark:ring-fecustom-400/20 dark:hover:bg-fecustom-800/20 dark:focus:bg-fecustom-800/20 dark:active:bg-fecustom-800/20">Dashed Buttons</button>
                            <button type="button" className="bg-white rounded-full text-fecustom-500 btn border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:bg-zinc-700 dark:hover:bg-fecustom-500 dark:ring-fecustom-400/20 dark:focus:bg-fecustom-500">Outline Button</button>
                            <button type="button" className="bg-white rounded-full text-fecustom-500 btn hover:text-fecustom-500 hover:bg-fecustom-100 focus:text-fecustom-500 focus:bg-fecustom-100 active:text-fecustom-500 active:bg-fecustom-100 dark:bg-zinc-700 dark:hover:bg-fecustom-500/10 dark:focus:bg-fecustom-500/10 dark:active:bg-fecustom-500/10">Ghost Button</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button type="button" className="flex rounded-full items-center justify-center size-[37.5px] p-0 text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20"><i className="ri-download-2-line"></i></button>
                            <button type="button" className="flex rounded-full items-center justify-center size-[37.5px] p-0 text-green-500 bg-white border-green-500 btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:bg-zinc-700 dark:hover:bg-green-500 dark:ring-green-400/20 dark:focus:bg-green-500"><i className="ri-download-2-line"></i></button>
                            <button type="button" className="flex rounded-full items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 bg-white border-dashed text-yellow-500 btn border-yellow-500 hover:text-yellow-500 hover:bg-yellow-50 hover:border-yellow-600 focus:text-yellow-600 focus:bg-yellow-50 focus:border-yellow-600 active:text-yellow-600 active:bg-yellow-50 active:border-yellow-600 dark:bg-zinc-700 dark:ring-yellow-400/20 dark:hover:bg-yellow-800/20 dark:focus:bg-yellow-800/20 dark:active:bg-yellow-800/20"><i className="ri-download-2-line"></i></button>
                            <button type="button" className="flex rounded-full items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-sky-500 btn bg-sky-100 hover:text-white hover:bg-sky-600 focus:text-white focus:bg-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:ring active:ring-sky-100 dark:bg-sky-500/20 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white dark:focus:bg-sky-500 dark:focus:text-white dark:active:bg-sky-500 dark:active:text-white dark:ring-sky-400/20"><i className="ri-download-2-line"></i></button>
                            <button type="button" className="flex rounded-full items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zinc-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"><i className="ri-download-2-line"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SizesRounded;