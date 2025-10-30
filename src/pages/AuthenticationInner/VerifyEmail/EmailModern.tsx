import React from "react";
import ModernImage from "../ModernImage";
import Modern from "../Modern";
import AuthDropdown from "../AuthDropdown";

// Image
import authEmail from "assets/images/auth-email.png";

const EmailModern = () => {

    document.title = "Verify Email | Tailwick - React Admin & Dashboard Template";

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
                                <h4 className="mb-1 text-fecustom-500 dark:text-fecustom-500">Verify Email</h4>
                                <p className="mb-4 text-slate-500 dark:text-zinc-200">Did you not receive an email? Please <a href="#!" className="text-fecustom-500">try again</a></p>
                                <button type="button" className="px-2 py-1.5 text-xs text-white transition-all duration-200 ease-linear btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Skip Now</button>
                            </div>

                            <div className="pt-12 text-center">
                                <img src={authEmail} alt="" className="block w-2/4 mx-auto" />
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="mb-0 text-center text-15 text-slate-500 dark:text-zinc-200">© {new Date().getFullYear()} Tailwick. Crafted with <i className="text-red-500 ri-heart-fill"></i> by <a href="http://themesdesign.in" className="underline transition-all duration-200 ease-linear text-slate-800 dark:text-zinc-50 hover:text-fecustom-500 dark:hover:text-fecustom-500">Themesdesign</a>
                            </p>
                        </div>
                    </div>
                </div>
                <Modern />
            </div>
        </React.Fragment>
    );
}

export default EmailModern;