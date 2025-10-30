import React from "react";
import ModernImage from "../ModernImage";
import Modern from "../Modern";
import { Link } from "react-router-dom";

const CreatePasswordModern = () => {

    document.title = "Create Password | Tailwick - React Admin & Dashboard Template";

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
                <div className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] lg:w-[40rem] shrink-0 px-10 py-14 flex items-center justify-center m-4 bg-white rounded z-10 relative dark:bg-zinc-700 dark:text-zinc-100 md:mx-auto xl:mx-4">
                    <div>
                        <div className="text-center">
                            <h4 className="mb-2 text-fecustom-500 dark:text-fecustom-500">Set a New Password</h4>
                            <p className="mb-8 text-slate-500 dark:text-zinc-200">Your new password should be distinct from any of your prior passwords</p>
                        </div>

                        <form autoComplete="off" action="/">
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="inline-block mb-2 text-base font-medium">Password</label>
                                <input type="password" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="Password" id="passwordInput" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordConfirmInput" className="inline-block mb-2 text-base font-medium">Confirm Password</label>
                                <input type="password" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="Confirm password" id="passwordConfirmInput" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input id="checkboxDefault1" className="size-4 border rounded-sm appearance-none bg-slate-100 border-slate-200 dark:bg-zinc-600 dark:border-zinc-500 checked:bg-fecustom-500 checked:border-fecustom-500 dark:checked:bg-fecustom-500 dark:checked:border-fecustom-500 checked:disabled:bg-fecustom-400 checked:disabled:border-fecustom-400" type="checkbox" value="" />
                                <label htmlFor="checkboxDefault1" className="inline-block text-base font-medium align-middle cursor-pointer">Remember me</label>
                            </div>
                            <div className="mt-8">
                                <button type="submit" className="w-full text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Reset Password</button>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="mb-0">Hold on, I've got my password... <Link to="/auth-login-basic" className="underline fw-medium text-fecustom-500"> Click here </Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
                <Modern />
            </div>
        </React.Fragment>
    );
}

export default CreatePasswordModern;