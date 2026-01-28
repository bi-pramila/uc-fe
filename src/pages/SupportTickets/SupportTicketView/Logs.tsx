import React from "react";

const logs = [
  { date: "26/01/2026 21:17", action: "Added Tag LKML;K;L (by Tinu S)" },
  { date: "26/01/2026 21:01", action: "New Ticket Response (by Tinu S)" },
  { date: "26/01/2026 21:00", action: "New Support Ticket Opened (by Tinu S)" },
];

const ActivityLogs = () => {
  return (
    <React.Fragment>
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
            {logs.map((log, idx) => (
              <tr key={`${log.date}-${idx}`}>
                <td className="w-[220px] px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500 whitespace-nowrap">
                  {log.date}
                </td>
                <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500">
                  {log.action}
                </td>
              </tr>
            ))}

            {logs.length === 0 && (
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
    </React.Fragment>
  );
};

export default ActivityLogs;
