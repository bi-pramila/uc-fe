import { useState } from "react";
import axios from "axios";

const API_BASE = process.env.PUBLIC_API_BASE_URL;

export const useRolePermissions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRolePermissions = async (roleId: string | number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${API_BASE}/roles-permissions/role/${roleId}`
            );
            // Extract permission_id from each object in the data array
            const permissionIds = (response.data || []).map((item: any) => item.permission_id);
            setLoading(false);
            return permissionIds;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to fetch role permissions";
            setError(errorMessage);
            setLoading(false);
            throw err;
        }
    };

    const bulkAssignPermissions = async (roleId: string | number, permissionIds: number[]) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `${API_BASE}/roles-permissions/bulk-assign`,
                {
                    roleId,
                    permissionIds,
                }
            );
            setLoading(false);
            return response.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to assign permissions";
            setError(errorMessage);
            setLoading(false);
            throw err;
        }
    };

    return {
        fetchRolePermissions,
        bulkAssignPermissions,
        loading,
        error,
        setError,
    };
};
