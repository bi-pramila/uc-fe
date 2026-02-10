import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketLogs } from "slices/supportTickets/thunk";

interface TicketLog {
  id: number;
  date: string;
  tid: number;
  action: string;
}

const ActivityLogs = () => {
  const dispatch = useDispatch<any>();
  const { ticketDetails, ticketLogs, ticketLogsLoading, error } = useSelector(
    (state: any) => state.SupportTickets
  );

  useEffect(() => {
    if (ticketDetails?.id) {
      dispatch(fetchTicketLogs({ 
        ticketId: ticketDetails.id,
        limit: 50,
        sortOrder: 'DESC'
      }));
    }
  }, [dispatch, ticketDetails?.id]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', '');
    } catch {
      return dateString;
    }
  };

  return (
    <React.Fragment>
      {ticketLogsLoading && (
        <div className="px-3.5 py-6 text-center text-slate-500 dark:text-zinc-400">
          Loading ticket logs...
        </div>
      )}

      {error && !ticketLogsLoading && (
        <div className="px-3.5 py-6 text-center text-red-500">
          {error}
        </div>
      )}

      {!ticketLogsLoading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="bg-slate-100">
                <th className="w-[220px] px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zinc-500">
                  Date
                </th>
                <th className="text-left px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zinc-500">
                  Requested Action
                </th>
              </tr>
            </thead>

            <tbody>
              {ticketLogs.map((log: TicketLog) => (
                <tr key={log.id}>
                  <td className="w-[220px] px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500 whitespace-nowrap">
                    {formatDate(log.date)}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500">
                    {log.action}
                  </td>
                </tr>
              ))}

              {ticketLogs.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
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

export default ActivityLogs;
