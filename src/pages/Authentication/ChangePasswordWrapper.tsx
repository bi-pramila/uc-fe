import React, { useState } from "react";
import ChangePassword from "./ChangePassword";

const ChangePasswordWrapper = () => {


    document.title = "Change Password | Ucartz";

    React.useEffect(() => {
        const bodyElement = document.body;

        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zinc-800', 'dark:text-zinc-100', 'font-public');

        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zinc-800', 'dark:text-zinc-100', 'font-public');
        }
    }, []);

   

    return (
        <React.Fragment>
           <ChangePassword/>
        </React.Fragment>
    );
}

export default ChangePasswordWrapper;
