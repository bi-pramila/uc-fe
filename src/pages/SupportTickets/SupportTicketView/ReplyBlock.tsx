import { Pencil, Trash2, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface ReplyBlockProps {
    replyid?: string | number;
    noteid?: string | number;
    name: string;
    email?: string;
    requestor_type: string;
    date: string;
    message: string;
    admin?: string;
    isNote?: boolean;
    onUpdate?: (id: string | number, message: string) => Promise<void>;
    onDelete?: (id: string | number) => Promise<void>;
}

const ReplyBlock: React.FC<ReplyBlockProps> = ({
    replyid,
    noteid,
    name,
    email,
    requestor_type,
    date,
    message,
    admin,
    isNote = false,
    onUpdate,
    onDelete
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(message);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    const id = isNote ? noteid : replyid;

    const handleSave = async () => {
        if (!onUpdate || !id) return;
        
        setIsSubmitting(true);
        try {
            await onUpdate(id, editedMessage);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setEditedMessage(message);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!onDelete || !id) return;
        
        if (window.confirm(`Are you sure you want to delete this ${isNote ? 'note' : 'reply'}?`)) {
            try {
                await onDelete(id);
            } catch (error) {
                console.error('Error deleting:', error);
            }
        }
    };

    const canEdit = !isNote && replyid && replyid !== '0' && replyid !== 0;

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
                            {canEdit && !isEditing && (
                                <button
                                    type="button"
                                    className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md edit-item-btn bg-slate-100 text-slate-500 hover:text-blue-500 hover:bg-blue-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-blue-500/20 dark:hover:text-blue-500"
                                    onClick={() => setIsEditing(true)}
                                    title="Edit reply"
                                >
                                    <Pencil className="size-4" />
                                </button>
                            )}

                            {id && id !== '0' && id !== 0 && (
                                <button
                                    type="button"
                                    className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md remove-item-btn bg-red-100 text-red-500 hover:text-white hover:bg-red-500 dark:bg-zinc-600 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
                                    onClick={handleDelete}
                                    title={`Delete ${isNote ? 'note' : 'reply'}`}
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Content Section */}
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 mb-2">
                            Posted on {formatDate(date)}
                        </p>

                        {isEditing ? (
                            <div>
                                <Editor
                                    apiKey="fa6066jy8lf383vm46h917goj6s5vijgvfkopig8uzjym6y1"
                                    value={editedMessage}
                                    onEditorChange={(content) => setEditedMessage(content)}
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
                                <div className="flex gap-2 mt-3">
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={isSubmitting || !editedMessage.trim()}
                                        className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 border-green-500 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save className="size-4" />
                                        {isSubmitting ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-200 border-slate-200 rounded-md hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <X className="size-4" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm" dangerouslySetInnerHTML={{ __html: message }} />
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReplyBlock;
