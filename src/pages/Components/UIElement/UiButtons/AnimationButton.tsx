import React from "react";
import { Loader2 } from "lucide-react";

const AnimationButton = () => {
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Animation Buttons</h6>
                    <div className="flex flex-wrap gap-3">
                        <button type="button" className="flex items-center justify-center size-[37.5px] p-0 text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">
                            <Loader2 className="size-4 animate-spin" />
                        </button>
                        <button type="button" className="flex items-center text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">
                            <Loader2 className="size-4 ltr:mr-2 rtl:ml-2 animate-spin" />
                            Processing...
                        </button>
                        <button type="button" className="relative bg-white border-dashed text-fecustom-500 btn border-fecustom-500 hover:text-fecustom-500 hover:bg-fecustom-50 hover:border-fecustom-600 focus:text-fecustom-600 focus:bg-fecustom-50 focus:border-fecustom-600 active:text-fecustom-600 active:bg-fecustom-50 active:border-fecustom-600 dark:bg-zinc-700 dark:ring-fecustom-400/20 dark:hover:bg-fecustom-800/20 dark:focus:bg-fecustom-800/20 dark:active:bg-fecustom-800/20">
                            <span className="absolute flex size-2 -top-1 ltr:-right-1 rtl:-left-1">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
                                <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
                            </span>
                            Dashed Buttons
                        </button>
                        <button type="button" className="flex animate-bounce items-center justify-center size-[37.5px] rounded-full p-0 text-green-500 bg-white border-green-500 btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:bg-zinc-700 dark:hover:bg-green-500 dark:ring-green-400/20 dark:focus:bg-green-500"><i className="ri-download-2-line"></i></button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AnimationButton;