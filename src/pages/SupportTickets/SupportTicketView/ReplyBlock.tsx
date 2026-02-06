import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

interface ReplyBlockProps {
    name: string;
    email?: string;
    requestor_type: string;
    date: string;
    message: string;
    admin?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ReplyBlock: React.FC<ReplyBlockProps> = ({
    name,
    email,
    requestor_type,
    date,
    message,
    admin,
    onEdit,
    onDelete
}) => {
    // Format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    };

    const displayName = admin || name;
    const displayEmail = email;

    return (
        <div className="card mt-5">
            <div className="card-body">
                <div className="flex items-start gap-6">

                    {/* Left User Section */}
                    <div className="min-w-[220px] border-r pr-4">
                        <h6 className="text-15">{displayName}</h6>

                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-200 rounded uppercase">
                            {requestor_type}
                        </span>

                        {displayEmail && (
                            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-200">
                                {displayEmail}
                            </p>
                        )}

                        <div className="flex gap-2 mt-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md edit-item-btn bg-slate-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500"
                                    onClick={onEdit}
                                >
                                    <Pencil className="size-4" />
                                </button>

                                <button
                                    type="button"
                                    className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md remove-item-btn bg-red-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500"
                                    onClick={onDelete}
                                >
                                    <Trash2 className="size-4" />
                                </button>
                        </div>
                    </div>

                    {/* Right Content Section */}
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 mb-2">
                            Posted on {formatDate(date)}
                        </p>

                        <p className="text-sm">{message}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReplyBlock;
