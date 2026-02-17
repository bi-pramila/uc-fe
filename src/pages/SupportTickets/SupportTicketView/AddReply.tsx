// Icons
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import React, { useState, useEffect, useMemo } from 'react';
import Dropzone from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { addTicketReply, fetchSupportStatuses } from 'slices/supportTickets/thunk';
import { useSearchParams } from 'react-router-dom';

interface AddReplyProps {
    ticketId: string | number;
}

const AddReply: React.FC<AddReplyProps> = ({ ticketId }) => {
    const dispatch = useDispatch<any>();
    const [searchParams] = useSearchParams();

    const { submitting, error, statuses } = useSelector((state: any) => state.SupportTickets);

    const clientIdFromStore = useSelector((state: any) =>
        state?.SupportTickets?.ticket?.clientid ??
        state?.SupportTickets?.ticket?.clientId ??
        state?.SupportTickets?.selectedTicket?.clientid ??
        state?.SupportTickets?.selectedTicket?.clientId ??
        state?.Auth?.user?.clientId ??
        state?.auth?.user?.clientId ??
        state?.Profile?.user?.clientId ??
        state?.profile?.user?.clientId ??
        undefined
    );

    const clientId = useMemo(() => {
        const fromQuery = searchParams.get("clientId") || searchParams.get("clientid");
        return fromQuery || clientIdFromStore;
    }, [searchParams, clientIdFromStore]);

    const attachClientId = (payload: any) => {
        const base = { ...(payload || {}) };
        return clientId ? { ...base, clientid: clientId, clientId } : base;
    };

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [noEmail, setNoEmail] = useState(false);
    const [returnToList, setReturnToList] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<any>([]);

    useEffect(() => {
        dispatch(fetchSupportStatuses());
    }, [dispatch]);

    // Transform statuses for react-select
    const statusOptions = statuses?.map((status: any) => ({
        value: status.id || status.title,
        label: status.title || status.name
    })) || [];

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim()) return;

        try {
            const replyData: any = attachClientId({
                action: 'AddTicketReply',
                ticketid: parseInt(ticketId.toString()),
                message: message.trim(),
                ...(status && { status }),
                ...(noEmail && { noemail: true })
            });

            // If there are attachments, convert them to base64
            if (selectedFiles.length > 0) {
                const attachments = await Promise.all(
                    selectedFiles.map((file: File) => {
                        return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                const base64 = reader.result?.toString().split(',')[1];
                                resolve({
                                    filename: file.name,
                                    data: base64
                                });
                            };
                            reader.readAsDataURL(file);
                        });
                    })
                );
                replyData.attachments = attachments;
            }

            const result = await dispatch(addTicketReply(replyData)).unwrap();

            if (result.result === 'success') {
                // Reset form
                setMessage('');
                setStatus('');
                setNoEmail(false);
                setSelectedFiles([]);
                
                // Optionally redirect or show success message
                if (returnToList) {
                    window.location.href = '/support-tickets';
                } else {
                    // Refresh ticket details to show new reply
                    window.location.reload();
                }
            }
        } catch (err) {
            console.error('Error adding reply:', err);
        }
    };

    const handleReset = () => {
        setMessage('');
        setStatus('');
        setNoEmail(false);
        setSelectedFiles([]);
        setReturnToList(false);
    };

    return (
       <div>
        {/* {error && (
            <div className="px-4 py-3 mb-4 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50">
                {error}
            </div>
        )} */}
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 xl:grid-cols-12">
        <div className="col-span-1 md:col-span-6 xl:col-span-12">
        <label className="inline-block mb-2 text-base font-medium">Reply Message <span className="text-red-500">*</span></label>
        <Editor
          apiKey="fa6066jy8lf383vm46h917goj6s5vijgvfkopig8uzjym6y1"
          value={message}
          onEditorChange={(content) => setMessage(content)}
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
          }}
          />
          </div>
          <div className="col-span-1 md:col-span-6 xl:col-span-6">
            <label className="inline-block mb-2 text-base font-medium">Status (Optional)</label>
            <Select
                className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                options={statusOptions}
                isSearchable={false}
                name="status"
                id="status"
                value={statusOptions.find((opt: any) => opt.value === status)}
                onChange={(option: any) => setStatus(option?.value || '')}
                placeholder="Select Status (Optional)"
                isClearable
                isLoading={!statuses?.length}
            />
          </div>
          <div className="col-span-1 md:col-span-6 xl:col-span-6">
            <label className="inline-block mb-2 text-base font-medium">Email Notification</label>
            <div className="flex items-center h-10 px-3 border rounded-md border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700">
                <input
                    id="noEmailCheckbox"
                    className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zinc-600 dark:border-zinc-500 checked:bg-fecustom-500 checked:border-fecustom-500 dark:checked:bg-fecustom-500 dark:checked:border-fecustom-500"
                    type="checkbox"
                    checked={noEmail}
                    onChange={(e) => setNoEmail(e.target.checked)}
                />
                <label htmlFor="noEmailCheckbox" className="ml-2 cursor-pointer text-sm">
                    Don't send email notification
                </label>
            </div>
          </div>
          <div className="col-span-1 md:col-span-6 xl:col-span-12">
            <label className="inline-block mb-2 text-base font-medium">Attachments (Optional)</label>
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
                                                <button 
                                                    type="button"
                                                    data-dz-remove
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
                    checked={returnToList}
                    onChange={(e) => setReturnToList(e.target.checked)}
                />
                <label className="cursor-pointer text-sm">
                    Return to ticket list after reply
                </label>
            </div>
            <button 
                type="button" 
                onClick={handleReset}
                className="text-slate-500 btn bg-slate-200 border-slate-200 hover:text-slate-600 hover:bg-slate-300 hover:border-slate-300 focus:text-slate-600 focus:bg-slate-300 focus:border-slate-300 focus:ring focus:ring-slate-100 active:text-slate-600 active:bg-slate-300 active:border-slate-300 active:ring active:ring-slate-100 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-200 dark:ring-zinc-400/50"
                disabled={submitting}
            >
                Clear
            </button>
            <button 
                type="submit" 
                className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20"
                disabled={submitting || !message.trim()}
            >
                {submitting ? 'Sending Reply...' : 'Reply'}
            </button>
          </div>
          </form>
       </div>    
    );
};

export default AddReply;
