import React, { useEffect, useState } from "react";
import { ArrowDownToLine, ChevronLeft, ChevronRight, Eye, FileEdit, Trash2 } from "lucide-react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

interface FileItem { id: number; type: string; name: string; size: string; date: string; uploadedBy: string; status: string; text: string }
interface SessionItem {
  id: number;
  user_id: number;
  session_token: string;
  ip_address: string;
  user_agent: string;
  device_info: string;
  login_time: string;
  logout_time: string | null;
  is_active: number;
}

const fileItems: FileItem[] = [
    {
        id: 1,
        type: "Docs",
        name: "Tailwick Docs File",
        size: "2.5MB",
        date: "15 Feb, 2023",
        uploadedBy: "Admin",
        status: "Successful",
        text: "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent"
    },
    {
        id: 2,
        type: "PSD",
        name: "Tailwick Design Kit.psd",
        size: "234.87 MB",
        date: "29 Jan, 2023",
        uploadedBy: "Themesdesign",
        status: "Successful",
        text: "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent"
    },
    {
        id: 3,
        type: "SVG",
        name: "home Pattern Wave.svg",
        size: "3.87 MB",
        date: "24 Sept, 2023",
        uploadedBy: "Admin",
        status: "Error",
        text: "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent"
    },
    {
        id: 4,
        type: "SCSS",
        name: "tailwind.scss",
        size: "0.100 KB",
        date: "03 April, 2023",
        uploadedBy: "Paula",
        status: "Successful",
        text: "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent"
    },
    {
        id: 5,
        type: "MP4",
        name: "Tailwick Guide Video.mp4",
        size: "149.33 MB",
        date: "12 Nov, 2023",
        uploadedBy: "Themesdesign",
        status: "Pending",
        text: "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-yellow-100 border-transparent text-yellow-500 dark:bg-yellow-500/20 dark:border-transparent"
    },
];

const Documents = () => {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const userId = useSelector((state: any) => state.Login?.user?.id) || 8;
  const API_BASE = import.meta.env.PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    let mounted = true;
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/user-sessions/user/${userId}`, {
          withCredentials: true,
        });
        const data = res.data || [];
        if (mounted) setSessions(data);
      } catch (err) {
        console.error("Failed to fetch user sessions:", err);
        if (mounted) setSessions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (userId) fetchSessions();
    return () => {
      mounted = false;
    };
  }, [userId, API_BASE]);

  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = sessions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

    return (
        <React.Fragment>
            <div className="flex items-center gap-3 mb-4">
                <h5 className="underline grow">Active Sessions</h5>
            </div>

            {loading ? (
                <div className="py-6 text-center">
                    <p className="text-slate-500">Loading sessions...</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full align-middle border-separate whitespace-nowrap border-spacing-y-1">
                        <thead className="text-left bg-white dark:bg-zinc-700">
                            <tr>
                                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">
                                    <div className="flex items-center h-full">
                                        <input
                                            id="Checkbox1"
                                            className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zinc-700 dark:border-zinc-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-fecustom-500 checked:border-fecustom-500 dark:after:text-fecustom-500 dark:checked:border-fecustom-800"
                                            type="checkbox"
                                            defaultValue=""
                                        />
                                    </div>
                                </th>
                                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Device</th>
                                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Session Token</th>
                                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">IP Address</th>
                                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Login Time</th>
                                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Logout Time</th>
                                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                          {paginatedSessions.map((session: SessionItem) => (
                            <tr key={session.id} className="bg-white dark:bg-zinc-700">
                              <td className="px-3.5 py-2.5 border-y border-transparent">
                                <div className="flex items-center h-full">
                                  <input
                                    id={`Checkbox${session.id}`}
                                    className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zinc-700 dark:border-zinc-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-fecustom-500 checked:border-fecustom-500 dark:after:text-fecustom-500 dark:checked:border-fecustom-800"
                                    type="checkbox"
                                    value=""
                                  />
                                </div>
                              </td>
                              <td className="px-3.5 py-2.5 border-y border-transparent">
                                <span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-slate-100 border-transparent text-slate-500 dark:bg-slate-500/20 dark:text-zinc-200 dark:border-transparent">
                                  {session.device_info || "Unknown"}
                                </span>
                              </td>
                              <td className="px-3.5 py-2.5 border-y border-transparent">
                                <code className="text-xs break-all text-slate-600 dark:text-slate-400">
                                  {session.session_token.substring(0, 20)}...
                                </code>
                              </td>
                              <td className="px-3.5 py-2.5 border-y border-transparent">{session.ip_address}</td>
                              <td className="px-3.5 py-2.5 border-y border-transparent">
                                {moment(session.login_time).format("DD MMM, YYYY HH:mm:ss")}
                              </td>
                              <td className="px-3.5 py-2.5 border-y border-transparent">
                                {session.logout_time
                                  ? moment(session.logout_time).format("DD MMM, YYYY HH:mm:ss")
                                  : "—"}
                              </td>
                              <td className="px-3.5 py-2.5 border-y border-transparent">
                                <span
                                  className={
                                    session.is_active
                                      ? "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent"
                                      : "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent"
                                  }
                                >
                                  {session.is_active ? "Active" : "Inactive"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Pagination */}
                  <div className="flex flex-col items-center gap-4 mt-4 mb-4 md:flex-row">
                    <div className="grow">
                      <p className="text-slate-500 dark:text-zinc-200">
                        Showing <b>{Math.min(itemsPerPage, paginatedSessions.length)}</b> of{" "}
                        <b>{sessions.length}</b> Results
                      </p>
                    </div>
                    <ul className="flex flex-wrap items-center gap-2 shrink-0">
                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="inline-flex items-center justify-center bg-white dark:bg-zinc-700 size-8 transition-all duration-150 ease-linear border border-slate-200 dark:border-zinc-500 rounded text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-50 dark:hover:bg-fecustom-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="size-4 rtl:rotate-180"></ChevronLeft>
                        </button>
                      </li>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page}>
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`inline-flex items-center justify-center bg-white dark:bg-zinc-700 size-8 transition-all duration-150 ease-linear border border-slate-200 dark:border-zinc-500 rounded text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-50 dark:hover:bg-fecustom-500/10 ${
                              currentPage === page
                                ? "text-fecustom-50 dark:text-fecustom-50 bg-fecustom-500 dark:bg-fecustom-500 border-fecustom-500 dark:border-fecustom-500"
                                : ""
                            }`}
                          >
                            {page}
                          </button>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center justify-center bg-white dark:bg-zinc-700 size-8 transition-all duration-150 ease-linear border border-slate-200 dark:border-zinc-500 rounded text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500 hover:bg-fecustom-50 dark:hover:bg-fecustom-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="size-4 rtl:rotate-180"></ChevronRight>
                        </button>
                      </li>
                    </ul>
                  </div>
        </React.Fragment>
    );
}

export default Documents;