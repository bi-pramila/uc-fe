import React from "react";
import BreadCrumb from "Common/BreadCrumb";
import { ClipboardList, Scissors } from "lucide-react";
import useCopyToClipboard from "hooks/useCopyToClipboard";

const FormClipboard = () => {
  const [values, setValue] = React.useState<string>("Welcome to Tailwick😊");
  const [clipboard1, setClipboard1] = React.useState<string>("Welcome to Tailwick😊");
  const { isCopied, copy } = useCopyToClipboard();

  const [cut, setCut] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cut === true) {
      if (clipboard1 !== "") {
        alert("Copied text: " + clipboard1);
        setClipboard1("");
      } else {
        alert("Copy/Cut failed");
        setClipboard1("");
      }
      setCut(false);
    }
  }, [cut, clipboard1]);

  return (
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="Clipboard" pageTitle="Forms" />

        <div className="card">
          <div className="card-body">
            <h6 className="mb-4 text-15">Basic Clipboard Copy</h6>
            <div className="flex">
              <input
                type="text"
                id="clipboard"
                value={values}
                className="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                placeholder=""
                onChange={({ target: { value } }) => setValue(value)}
              />
              <button
                className="flex items-center justify-center w-[39px] h-[39px] ltr:rounded-l-none rtl:rounded-r-none p-0 text-slate-500 btn bg-slate-200 border-slate-200 hover:text-slate-600 hover:bg-slate-300 hover:border-slate-300 focus:text-slate-600 focus:bg-slate-300 focus:border-slate-300 focus:ring focus:ring-slate-100 active:text-slate-600 active:bg-slate-300 active:border-slate-300 active:ring active:ring-slate-100 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-200 dark:ring-zinc-400/50"
                onClick={() => copy(values)}
              >
                <ClipboardList className="inline-block size-4" />
              </button>
              {isCopied && <span className="ml-2 text-green-500">Copied!</span>}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h6 className="mb-4 text-15">Basic Clipboard Cut</h6>
            <div className="flex">
              <input
                type="text"
                id="clipboard1"
                value={clipboard1}
                onChange={({ target: { value } }) => setClipboard1(value)}
                className="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                placeholder=""
              />
              <button
                type="button"
                id="cutButton"
                onClick={() => {
                  copy(clipboard1);
                  setCut(true);
                }}
                className="flex items-center justify-center w-[39px] h-[39px] ltr:rounded-l-none rtl:rounded-r-none p-0 text-slate-500 btn bg-slate-200 border-slate-200 hover:text-slate-600 hover:bg-slate-300 hover:border-slate-300 focus:text-slate-600 focus:bg-slate-300 focus:border-slate-300 focus:ring focus:ring-slate-100 active:text-slate-600 active:bg-slate-300 active:border-slate-300 active:ring active:ring-slate-100 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-200 dark:ring-zinc-400/50"
              >
                <Scissors className="inline-block size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FormClipboard;


// import React from "react";
// import BreadCrumb from "Common/BreadCrumb";
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { ClipboardList, Scissors } from "lucide-react";

// const FormClipboard = () => {

//     const CopyToClipboardAny = CopyToClipboard as any;


//     const [values, setValue] = React.useState<string>("Welcome to Tailwick😊");
//     const [clipboard1, setClipboard1] = React.useState<string>("Welcome to Tailwick😊");

//     const [copied, setCopied] = React.useState<boolean>(false);
//     const [cut, setCut] = React.useState<boolean>(false);

//     React.useEffect(() => {
//         if (copied === true) {
//             if (values !== "") {
//                 alert("Copied text: " + values)
//             } else {
//                 alert("Copy/Cut failed");
//             }
//         }
//         setCopied(false)
//     }, [copied, values]);

//     React.useEffect(() => {
//         if (cut === true) {
//             if (clipboard1 !== "") {
//                 alert("Copied text: " + clipboard1);
//                 setClipboard1('');
//             } else {
//                 alert("Copy/Cut failed");
//                 setClipboard1('');
//             }
//         }
//         setCut(false)
//     }, [cut, clipboard1]);

//     return (
//         <React.Fragment>
//             <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
//                 <BreadCrumb title="Clipboard" pageTitle="Forms" />

//                 <div className="card">
//                     <div className="card-body">
//                         <h6 className="mb-4 text-15">Basic Clipboard Copy</h6>
//                         <div className="flex">
//                             <input
//                                 type="text"
//                                 id="clipboard"
//                                 defaultValue={values}
//                                 className="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
//                                 placeholder=""
//                                 onChange={({ target: { value } }) => { setValue(value); setCopied(false) }}
//                             />
//                             <button className="flex items-center justify-center w-[39px] h-[39px] ltr:rounded-l-none rtl:rounded-r-none p-0 text-slate-500 btn bg-slate-200 border-slate-200 hover:text-slate-600 hover:bg-slate-300 hover:border-slate-300 focus:text-slate-600 focus:bg-slate-300 focus:border-slate-300 focus:ring focus:ring-slate-100 active:text-slate-600 active:bg-slate-300 active:border-slate-300 active:ring active:ring-slate-100 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-200 dark:ring-zinc-400/50">
//                                 <CopyToClipboardAny
//                                     text={values}
//                                     onCopy={() => setCopied(true)}
//                                 >
//                                     <ClipboardList className="inline-block size-4"></ClipboardList>
//                                 </CopyToClipboardAny>
//                             </button>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="card">
//                     <div className="card-body">
//                         <h6 className="mb-4 text-15">Basic Clipboard Cut</h6>
//                         <div className="flex">
//                             <input type="text" id="clipboard1" value={clipboard1}
//                                 onChange={({ target: { value } }) => { setClipboard1(value); setCut(false) }}
//                                 className="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" placeholder="" />
//                             <button type="button" id="cutButton"
//                                 onClick={() => setCut(true)}
//                                 className="flex items-center justify-center w-[39px] h-[39px] ltr:rounded-l-none rtl:rounded-r-none p-0 text-slate-500 btn bg-slate-200 border-slate-200 hover:text-slate-600 hover:bg-slate-300 hover:border-slate-300 focus:text-slate-600 focus:bg-slate-300 focus:border-slate-300 focus:ring focus:ring-slate-100 active:text-slate-600 active:bg-slate-300 active:border-slate-300 active:ring active:ring-slate-100 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-200 dark:ring-zinc-400/50">
//                                 <Scissors className="inline-block size-4"></Scissors>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </React.Fragment>
//     );
// }

// export default FormClipboard;