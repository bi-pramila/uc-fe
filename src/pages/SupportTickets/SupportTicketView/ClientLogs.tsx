import React from "react";

const logs = [
  {
    date: "13/06/2025 10:41",
    description:
      "Email Sent to Pramila ([Ticket ID: 504197] test from external) - Client ID: 161",
    username: "tinusimonsd",
    ip: "49.206.6.221",
  },
  {
    date: "10/05/2025 07:26",
    description:
      "Email Sent to Pramila ([Ticket ID: 330850] Server slow) - Client ID: 161",
    username: "bevyinsight",
    ip: "152.58.231.144",
  },
  {
    date: "05/05/2025 04:37",
    description:
      "Email Sent to Pramila ([Ticket ID: 786367] Testing) - Client ID: 161",
    username: "bevyinsight",
    ip: "14.139.155.34",
  },
  {
    date: "03/05/2025 13:45",
    description:
      "Email Sent to Pramila ([Ticket ID: 926687] website) - Client ID: 161",
    username: "bevyinsight",
    ip: "152.57.102.146",
  },
  {
    date: "03/05/2025 12:55",
    description:
      "Email Sent to Pramila ([Ticket ID: 504197] test from external) - Client ID: 161",
    username: "bevyinsight",
    ip: "152.57.102.146",
  },
  {
    date: "24/04/2025 15:05",
    description:
      "Email Sent to Pramila ([Ticket ID: 225617] Server slow) - Client ID: 161",
    username: "tinusimonsd",
    ip: "152.57.136.104",
  },
  {
    date: "23/04/2025 17:08",
    description:
      "Email Sent to Pramila ([Ticket ID: 427019] Your Account Login Info) - Client ID: 161",
    username: "arun@hoarc.com",
    ip: "103.178.204.228",
  },
  {
    date: "23/04/2025 17:02",
    description:
      "Client Profile Modified - Last Name: 'p' to '' - Client ID: 161",
    username: "arun@hoarc.com",
    ip: "103.178.204.228",
  },
  {
    date: "23/04/2025 17:01",
    description: "Email Sent to Pramila p (Welcome) - Client ID: 161",
    username: "arun@hoarc.com",
    ip: "103.178.204.228",
  },
  {
    date: "23/04/2025 17:01",
    description: "Opted Out from Marketing Emails - Client ID: 161",
    username: "arun@hoarc.com",
    ip: "103.178.204.228",
  },
];

const ClientLogs = () => {
  const handleDownload = (row) => {
    // TODO: replace with your actual download logic
    // Example: download JSON / call API / export row etc.
    console.log("Download clicked:", row);
  };

  return (
    <React.Fragment>
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
            {logs.map((log, idx) => (
              <tr key={`${log.date}-${log.ip}-${idx}`}>
                <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500 whitespace-nowrap">
                  {log.date}
                </td>

                <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500">
                  {log.description}
                </td>

                <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500 whitespace-nowrap">
                  {log.username}
                </td>

                <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zinc-500 whitespace-nowrap">
                  {log.ip}
                </td>

                
              </tr>
            ))}

            {logs.length === 0 && (
              <tr>
                <td
                  colSpan={5}
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

export default ClientLogs;
