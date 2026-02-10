import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityLogs } from "slices/supportTickets/thunk";

interface ActivityLog {
  date: string;
  description: string;
  user?: string;
  userid?: string;
  ipaddr?: string;
}

const ClientLogs = () => {
  const dispatch = useDispatch<any>();
  const { ticketDetails, activityLogs, logsLoading, error } = useSelector((state: any) => state.SupportTickets);

  useEffect(() => {
    if (ticketDetails?.userid) {
      dispatch(fetchActivityLogs({ 
        userid: ticketDetails.userid, 
        limitnum: 50 
      }));
    }
  }, [dispatch, ticketDetails?.userid]);

  const handleDownload = (row: ActivityLog) => {
    // TODO: replace with your actual download logic
    // Example: download JSON / call API / export row etc.
    console.log("Download clicked:", row);
  };

  return (
    <React.Fragment>
      {logsLoading && (
        <div className="px-3.5 py-6 text-center text-slate-500 dark:text-zinc-400">
          Loading activity logs...
        </div>
      )}
      
      {error && !logsLoading && (
        <div className="px-3.5 py-6 text-center text-red-500">
          {error}
        </div>
      )}

      {!logsLoading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="bg-slate-100">
                <th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zinc-500">
                  Date
                </th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zinc-500">
                  Description
                </th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zinc-500">
                  Username
                </th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zinc-500">
                  IP Address
                </th>
              </tr>
            </thead>

            <tbody>
              {activityLogs.map((log: ActivityLog, idx: number) => (
                <tr key={`${log.date}-${log.ipaddr}-${idx}`}>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500 whitespace-nowrap">
                    {log.date}
                  </td>

                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500">
                    {log.description}
                  </td>

                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500 whitespace-nowrap">
                    {log.user || log.userid || '-'}
                  </td>

                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500 whitespace-nowrap">
                    {log.ipaddr || '-'}
                  </td>
                </tr>
              ))}

              {activityLogs.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3.5 py-6 text-center text-slate-500 dark:text-zinc-400"
                  >
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default ClientLogs;
