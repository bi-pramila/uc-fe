
// Icons
import Select from 'react-select';

import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import Dropzone from "react-dropzone"
import { UploadCloud } from "lucide-react";


const AddNote = () => {
    const options = [
        { value: 'Open', label: 'Open' },
        { value: 'Closed', label: 'Closed' },
        { value: 'Answered', label: 'Answered' },
        { value: 'onHold', label: 'On Hold' },
    ];

        const [selectedFiles, setSelectedFiles] = React.useState<any>([])
    

const handleAcceptedFiles = (files: any) => {
        files.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setSelectedFiles(files)
    }
    const formatBytes = (bytes: any, decimals = 2) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    const Status = ({ item }: any) => {
        switch (item) {
            case "Open":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-yellow-100 border-transparent text-yellow-500 dark:bg-yellow-500/20 dark:border-transparent">{item}</span>);
            case "Answered":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">{item}</span>);
            case "Customer-Reply":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-blue-100 border-transparent text-blue-500 dark:bg-blue-500/20 dark:border-transparent">{item}</span>);
            case "Closed":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-blue-100 border-transparent text-blue-500 dark:bg-blue-500/20 dark:border-transparent">{item}</span>);
            default:
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-slate-100 border-transparent text-slate-500 dark:bg-slate-500/20 dark:border-transparent">{item}</span>);
        }
    };

    return (
       <div>
        <form action="#!">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 xl:grid-cols-12">
        <div className="col-span-1 md:col-span-6 xl:col-span-12">
        <Editor
          apiKey="fa6066jy8lf383vm46h917goj6s5vijgvfkopig8uzjym6y1"
          init={{
              height: 300,
              menubar: false,
              plugins: [
              "advlist", "autolink", "lists", "link", "image",
              "charmap", "preview", "anchor", "searchreplace",
              "visualblocks", "code", "fullscreen",
              "insertdatetime", "media", "table", "help", "wordcount"
              ],
              toolbar:
              "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | image | removeformat | help",
              // automatic_uploads: true,
              // images_upload_handler: (blobInfo) =>
              // new Promise((resolve) => {
              //     const base64 = blobInfo.base64()
              //     resolve(`data:${blobInfo.blob().type};base64,${base64}`)
              // })
          }}
          />
          </div>
          <div className="col-span-1 md:col-span-3 xl:col-span-3">
            <Select
                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                options={options}
                isSearchable={false} // If you want to disable search
                name="employeeName"
                id="employeeName"
            />
          </div>
          <div className="col-span-1 md:col-span-3 xl:col-span-3">
            <Select
                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                options={options}
                isSearchable={false} // If you want to disable search
                name="employeeName"
                id="employeeName"
            />
          </div>
          <div className="col-span-1 md:col-span-3 xl:col-span-3">
            <Select
                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                options={options}
                isSearchable={false} // If you want to disable search
                name="employeeName"
                id="employeeName"
            />
          </div>
          <div className="col-span-1 md:col-span-3 xl:col-span-3">
            <Select
                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                options={options}
                isSearchable={false} // If you want to disable search
                name="employeeName"
                id="employeeName"
            />
          </div>
          <div className="col-span-1 md:col-span-6 xl:col-span-12">
            <div>
                    <div className="flex items-center justify-center bg-white border border-dashed rounded-md cursor-pointer dropzone border-slate-300 dropzone2 dark:bg-zinc-700 dark:border-zinc-500 md:min-h-[50px]">
                    <Dropzone
                        onDrop={(acceptedFiles: any) => {
                            handleAcceptedFiles(acceptedFiles)
                        }}
                    >
                        {({ getRootProps, getInputProps }: any) => (
                            <div
                                className="w-full py-5 text-lg text-center dz-message needsclick"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                    <UploadCloud className="block size-12 mx-auto text-slate-500 fill-slate-200 dark:text-zinc-200 dark:fill-zinc-500"></UploadCloud>
                                </div>

                                <h5 className="mb-0 font-normal text-slate-500 text-15">Drag and drop your files or <a href="#!">browse</a> your files</h5>
                            </div>
                        )}
                    </Dropzone>
                </div>

                <ul className="flex flex-wrap mb-0 gap-x-5" id="dropzone-preview2">
                    {
                        (selectedFiles || [])?.map((f: any, i: any) => {
                            return (
                                <li className="mt-2" id="dropzone-preview-list" key={i + "-file"}>
                                    <div className="border rounded border-slate-200 dark:border-zinc-500">
                                        <div className="flex p-2">
                                            <div className="shrink-0 me-3">
                                                <div className="p-2 rounded-md size-14 bg-slate-100 dark:bg-zinc-600">
                                                    <img data-dz-thumbnail className="block w-full h-full rounded-md" src={f.preview} alt={f.name} />
                                                </div>
                                            </div>
                                            <div className="grow">
                                                <div className="pt-1">
                                                    <h5 className="mb-1 text-15" data-dz-name>{f.name}</h5>
                                                    <p className="mb-0 text-slate-500 dark:text-zinc-200" data-dz-size>{f.formattedSize}</p>
                                                </div>
                                            </div>
                                            <div className="shrink-0 ms-3">
                                                <button data-dz-remove
                                                    className="px-2 py-1.5 text-xs text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-fecustom-400/20"
                                                    onClick={() => {
                                                        const newImages = [...selectedFiles];
                                                        newImages.splice(i, 1);
                                                        setSelectedFiles(newImages);
                                                    }}
                                                >Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                </div>
          </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <div key={`return`} className="flex items-center gap-2">
                <input
                    id={`return`}
                    className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zinc-600 dark:border-zinc-500 checked:bg-fecustom-500 checked:border-fecustom-500 dark:checked:bg-fecustom-500 dark:checked:border-fecustom-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="checkbox"
                    onChange={() => {}}
                />
                <label className="cursor-pointer text-sm">
                    Return to ticket list
                </label>
            </div>
            <button type="submit" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Add Note</button>
          </div>
          </form>
       </div>    
    );
};

export default AddNote;
