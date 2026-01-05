import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

interface DeviceItem {
  id: number;
  user_id: number;
  device_name: string;
  browser: string;
  os: string;
  device_token: string | null;
  device_fingerprint: string;
  last_ip_address: string;
  first_used: string;
  last_used: string;
  is_verified: number;
}

const Devices = () => {
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const userId = useSelector((state: any) => state.Login?.user?.id) || 8;
  const API_BASE = process.env.PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    let mounted = true;
    const fetchDevices = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/user-devices/user/${userId}`, {
          withCredentials: true,
        });
        const data = res.data || [];
        if (mounted) setDevices(data);
      } catch (err) {
        console.error("Failed to fetch user devices:", err);
        if (mounted) setDevices([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (userId) fetchDevices();
    return () => {
      mounted = false;
    };
  }, [userId, API_BASE]);

  const totalPages = Math.ceil(devices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDevices = devices.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <React.Fragment>
      <div className="flex items-center gap-3 mb-4">
        <h5 className="underline grow">User Devices</h5>
      </div>

      {loading ? (
        <div className="py-6 text-center">
          <p className="text-slate-500">Loading devices...</p>
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
                      className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zinc-700 dark:border-zinc-500 rounded-sm appearance-none"
                      type="checkbox"
                      defaultValue=""
                    />
                  </div>
                </th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Device Name</th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Browser</th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">OS</th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Device Fingerprint</th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">IP Address</th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">First Used</th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Last Used</th>
                <th className="px-3.5 py-2.5 font-semibold border-b border-transparent">Verified</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDevices.map((device: DeviceItem) => (
                <tr key={device.id} className="bg-white dark:bg-zinc-700">
                  <td className="px-3.5 py-2.5 border-y border-transparent">
                    <div className="flex items-center h-full">
                      <input
                        id={`Checkbox${device.id}`}
                        className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zinc-700 dark:border-zinc-500 rounded-sm appearance-none"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-transparent">{device.device_name}</td>
                  <td className="px-3.5 py-2.5 border-y border-transparent">{device.browser}</td>
                  <td className="px-3.5 py-2.5 border-y border-transparent">{device.os}</td>
                  <td className="px-3.5 py-2.5 border-y border-transparent">
                    <code className="text-xs break-all text-slate-600 dark:text-slate-400">
                      {device.device_fingerprint.substring(0, 20)}...
                    </code>
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-transparent">{device.last_ip_address}</td>
                  <td className="px-3.5 py-2.5 border-y border-transparent">
                    {moment(device.first_used).format("DD MMM, YYYY HH:mm:ss")}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-transparent">
                    {moment(device.last_used).format("DD MMM, YYYY HH:mm:ss")}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-transparent">
                    <span
                      className={
                        device.is_verified
                          ? "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent"
                          : "px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-yellow-100 border-transparent text-yellow-500 dark:bg-yellow-500/20 dark:border-transparent"
                      }
                    >
                      {device.is_verified ? "Verified" : "Unverified"}
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
            Showing <b>{Math.min(itemsPerPage, paginatedDevices.length)}</b> of{" "}
            <b>{devices.length}</b> Results
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
};

export default Devices;
