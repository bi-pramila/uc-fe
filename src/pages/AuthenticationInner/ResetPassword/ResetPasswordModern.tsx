import React from "react";
import ModernImage from "../ModernImage";
import Modern from "../Modern";
import { Link } from "react-router-dom";

const ResetPasswordModern = () => {

    document.title = "Reset Password | Tailwick - React Admin & Dashboard Template";

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
                    <div>
                        <div className="text-center">
                            <h4 className="mb-2 text-fecustom-500 dark:text-fecustom-500">Forgot Password?</h4>
                            <p className="mb-8 text-slate-500 dark:text-zinc-200">Reset your Tailwick password</p>
                        </div>

                        <div className="px-4 py-3 mb-6 text-sm text-yellow-500 border border-transparent rounded-md bg-yellow-50 dark:bg-yellow-400/20">
                            Provide your email address, and instructions will be sent to you
                        </div>

                        <form autoComplete="off" action="/">
                            <div>
                                <label htmlFor="emailInput" className="inline-block mb-2 text-base font-medium">Email</label>
                                <input type="text" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="Enter email" id="emailInput" />
                            </div>
                            <div className="mt-8">
                                <button type="submit" className="w-full text-white transition-all duration-200 ease-linear btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Send Reset Link</button>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="mb-0">Wait, I remember my password... <Link to="/auth-login-modern" className="underline fw-medium text-fecustom-500"> Click here </Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
                <Modern />
            </div>
        </React.Fragment>
    );
}

export default ResetPasswordModern;