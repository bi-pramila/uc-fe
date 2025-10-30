import React from "react";

// Image
import logoLight from "assets/images/logo-light.png";
import logoDark from "assets/images/logo-dark.png";
import { Link } from "react-router-dom";


const ResetPasswordCover = () => {

    document.title = "Reset Password | Tailwick - React Admin & Dashboard Template";

    React.useEffect(() => {
        const bodyElement = document.body;

        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'bg-cover', 'bg-auth-pattern', 'dark:bg-auth-pattern-dark', 'dark:text-zinc-100', 'font-public');

        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'bg-cover', 'bg-auth-pattern', 'dark:bg-auth-pattern-dark', 'dark:text-zinc-100', 'font-public');
        }
    }, []);

    return (
        <React.Fragment>
            <div className="mb-0 border-none lg:w-[500px] card bg-white/70 shadow-none dark:bg-zinc-500/70">
                <div className="!px-10 !py-12 card-body">
                    <Link to="/">
                        <img src={logoLight} alt="" className="hidden h-6 mx-auto dark:block" />
                        <img src={logoDark} alt="" className="block h-6 mx-auto dark:hidden" />
                    </Link>

                    <div className="mt-8 text-center">
                        <h4 className="mb-2 text-fecustom-500 dark:text-fecustom-500">Forgot Password?</h4>
                        <p className="mb-8 text-slate-500 dark:text-zinc-200">Reset your Tailwick password</p>
                    </div>

                    <div className="px-4 py-3 mb-6 text-sm text-yellow-500 border border-transparent rounded-md bg-yellow-50 dark:bg-yellow-400/20">
                        Provide your email address, and instructions will be sent to you
                    </div>

                    <form autoComplete="off" action="/">
                        <div>
                            <label htmlFor="emailInput" className="inline-block mb-2 text-base font-medium">Email</label>
                            <input type="text" className="form-input dark:bg-zinc-600/50 border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="Enter email" id="emailInput" />
                        </div>
                        <div className="mt-8">
                            <button type="submit" className="w-full text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Send Reset Link</button>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="mb-0">Wait, I remember my password... <Link to="/auth-login-cover" className="underline fw-medium text-fecustom-500"> Click here </Link> </p>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ResetPasswordCover;