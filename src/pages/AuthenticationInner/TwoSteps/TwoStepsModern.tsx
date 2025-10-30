import React from "react";
import ModernImage from "../ModernImage";
import Modern from "../Modern";
import AuthDropdown from "../AuthDropdown";

const TwoStepsModern = () => {

    document.title = "Two Steps | Tailwick - React Admin & Dashboard Template";

    React.useEffect(() => {
        const bodyElement = document.body;

        bodyElement.classList.add('font-public');

        return () => {
            bodyElement.classList.remove('font-public');
        }
    }, []);

    return (
        <React.Fragment>
            <div className="relative flex flex-col w-full overflow-hidden xl:flex-row to-fecustom-800 bg-gradient-to-r from-fecustom-900 dark:to-fecustom-900 dark:from-fecustom-950">
                <ModernImage />
                <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3 lg:w-[40rem] shrink-0 px-10 py-14 flex items-center justify-center m-4 bg-white rounded z-10 relative dark:bg-zinc-700 dark:text-zinc-100 md:mx-auto xl:mx-4">
                    <div className="flex flex-col w-full h-full">
                        <AuthDropdown />
                        <div className="my-auto">
                            <div className="mt-8 text-center">
                                <h4 className="mb-2 text-fecustom-500 dark:text-fecustom-500">Verify Email</h4>
                                <p className="mb-8 text-slate-500 dark:text-zinc-200">Please enter the <b className="font-medium">4</b> digit code sent to <b className="font-medium">tailwick@themesdesign.com</b></p>
                            </div>

                            <form autoComplete="off" action="/">
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                    <div>
                                        <label htmlFor="digit1-input" className="hidden">Digit 1</label>
                                        <input type="text" className="text-lg text-center form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="0"
                                            // onkeyup="moveToNext(1, event)" maxlength="1" 
                                            id="digit1-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="digit2-input" className="hidden">Digit 2</label>
                                        <input type="text" className="text-lg text-center form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="0"
                                            // onkeyup="moveToNext(2, event)" maxlength="1" 
                                            id="digit2-input" />
                                    </div>

                                    <div>
                                        <label htmlFor="digit3-input" className="hidden">Digit 3</label>
                                        <input type="text" className="text-lg text-center form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="0"
                                            // onkeyup="moveToNext(3, event)" maxlength="1" 
                                            id="digit3-input" />
                                    </div>

                                    <div>
                                        <label htmlFor="digit4-input" className="hidden">Digit 4</label>
                                        <input type="text" className="text-lg text-center form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="0"
                                            // onkeyup="moveToNext(4, event)" maxlength="1" 
                                            id="digit4-input" />
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button type="submit" className="w-full text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Confirm</button>
                                </div>
                            </form>
                        </div>
                        <div className="mt-5">
                            <p className="mb-0 text-center text-15 text-slate-500 dark:text-zinc-200">©
                                {new Date().getFullYear()} Tailwick. Crafted with <i className="text-red-500 ri-heart-fill"></i> by <a href="http://themesdesign.in" className="underline transition-all duration-200 ease-linear text-slate-800 dark:text-zinc-50 hover:text-fecustom-500 dark:hover:text-fecustom-500">Themesdesign</a>
                            </p>
                        </div>
                    </div>
                </div>
                <Modern />
            </div>
        </React.Fragment>
    );
}

export default TwoStepsModern;