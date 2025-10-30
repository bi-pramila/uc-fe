import React from "react";

// Image
import logoLight from "assets/images/logo-light.png"
import logoDark from "assets/images/logo-dark.png"
import { Link } from "react-router-dom";

const TwoStepsCover = () => {

    document.title = "Two Steps | Tailwick - React Admin & Dashboard Template";

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
                        <h4 className="mb-2 text-fecustom-500 dark:text-fecustom-500">Verify Email</h4>
                        <p className="mb-8 text-slate-500 dark:text-zinc-200">Please enter the <b className="font-medium">4</b> digit code sent to <b className="font-medium">tailwick@themesdesign.com</b></p>
                    </div>

                    <form autoComplete="off" action="/">
                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-4">
                            <div>
                                <label htmlFor="digit1-input" className="hidden">Digit 1</label>
                                <input type="text" className="text-lg text-center form-input dark:bg-zinc-600/50 border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="0"
                                    // onkeyup="moveToNext(1, event)" maxlength="1"
                                    id="digit1-input" />
                            </div>
                            <div>
                                <label htmlFor="digit2-input" className="hidden">Digit 2</label>
                                <input type="text" className="text-lg text-center form-input dark:bg-zinc-600/50 border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="0"
                                    // onkeyup="moveToNext(2, event)" maxlength="1"
                                    id="digit2-input" />
                            </div>

                            <div>
                                <label htmlFor="digit3-input" className="hidden">Digit 3</label>
                                <input type="text" className="text-lg text-center form-input dark:bg-zinc-600/50 border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="0"
                                    // onkeyup="moveToNext(3, event)" maxlength="1"
                                    id="digit3-input" />
                            </div>

                            <div>
                                <label htmlFor="digit4-input" className="hidden">Digit 4</label>
                                <input type="text" className="text-lg text-center form-input dark:bg-zinc-600/50 border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="0"
                                    // onkeyup="moveToNext(4, event)" maxlength="1"
                                    id="digit4-input" />
                            </div>
                        </div>
                        <div className="mt-10">
                            <button type="submit" className="w-full text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TwoStepsCover;