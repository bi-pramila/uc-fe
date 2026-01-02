import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from 'Common/BreadCrumb';
import moment from "moment";

// Icons
import { ChevronLeft } from 'lucide-react';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import {
    fetchUserRoles,
    fetchRoleGroups,
    updateUserRole,
    addUserRole,
    fetchPermissionsGrouped,
    bulkAssignPermissions
} from 'slices/thunk';
import { ToastContainer } from 'react-toastify';

const RoleEdit = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const selectRoleGroupData = createSelector(
        (state: any) => state.RoleGroup,
        (roleGroup) => ({
            groups: roleGroup.groups,
            meta: roleGroup.meta,
            loading: roleGroup.loading
        })
    );

    const { groups } = useSelector(selectRoleGroupData);

    const selectUserRoleData = createSelector(
        (state: any) => state.UserRoles,
        (userRoles) => ({
            roles: userRoles.roles,
            permissions: userRoles.permissions,
            meta: userRoles.meta,
            loading: userRoles.loading
        })
    );

    const { roles, permissions } = useSelector(selectUserRoleData);

    const [groupData, setGroupData] = useState<any>([]);
    const [roleData, setRoleData] = useState<any>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (groups.length === 0) {
            dispatch(fetchRoleGroups({ page: 1, limit: 10 }));
        }
        if (permissions.length === 0) {
            dispatch(fetchPermissionsGrouped());
        }
        dispatch(fetchUserRoles({ page: 1, limit: 10 }));
    }, [dispatch]);

    useEffect(() => {
        setGroupData(groups || []);
    }, [groups]);

    // Determine mode and fetch role data from Redux
    useEffect(() => {
        if (id === "new") {
            setRoleData({});
            setSelectedPermissions([]);
            setIsEditMode(false);
            setIsLoading(false);
        } else if (id && roles && roles.length > 0) {
            const foundRole = roles.find((r: any) => r.id === parseInt(id));
            if (foundRole) {
                setRoleData(foundRole);
                setSelectedPermissions(foundRole.permissions || []);
                setIsEditMode(true);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
    }, [id, roles]);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: roleData?.id || "",
            role_name: roleData?.role_name || "",
            role_description: roleData?.role_description || "",
            role_group_id: roleData?.role_group_id || "",
            role_key: roleData?.role_key || "",
        },

        validationSchema: Yup.object({
            role_name: Yup.string().required("Role Name is required"),
            role_description: Yup.string().required("Role Description is required"),
            role_group_id: Yup.string().required("Select a group"),
            role_key: Yup.string().required("Role Key is required"),
        }),

        onSubmit: (values) => {
            if (isEditMode) {
                // For edit mode: update role details first
                const body = {
                    role_name: values.role_name,
                    role_description: values.role_description,
                    role_group_id: values.role_group_id,
                    role_key: values.role_key,
                };

                dispatch(updateUserRole({ id: values.id, body }))
                    .then(() => {
                        // Then bulk assign permissions
                        dispatch(bulkAssignPermissions({ 
                            roleId: values.id, 
                            permissionIds: selectedPermissions 
                        }))
                        .then(() => {
                            dispatch(fetchUserRoles({ page: 1, limit: 10 }));
                            navigate('/admin/roles');
                        });
                    });
            } else {
                // For add mode: create role first
                const body = {
                    role_name: values.role_name,
                    role_description: values.role_description,
                    role_group_id: values.role_group_id,
                    role_key: values.role_key,
                };

                dispatch(addUserRole(body))
                    .then((response: any) => {
                        // Then bulk assign permissions to the newly created role
                        const newRoleId = response.payload?.data?.id;
                        dispatch(bulkAssignPermissions({ 
                            roleId: newRoleId, 
                            permissionIds: selectedPermissions 
                        }))
                        .then(() => {
                            dispatch(fetchUserRoles({ page: 1, limit: 10 }));
                            navigate('/admin/roles');
                        });
                    });
            }
        },
    });

    const handlePermissionChange = (permissionId: number) => {
        setSelectedPermissions((prev) =>
            prev.includes(permissionId)
                ? prev.filter((id) => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    if (isLoading) {
        return (
            <React.Fragment>
                <BreadCrumb title={isEditMode ? 'Edit Role' : 'Add Role'} pageTitle='HR Management' />
                <div className="text-center py-12">
                    <p>Loading...</p>
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <BreadCrumb title={isEditMode ? 'Edit Role' : 'Add Role'} pageTitle='HR Management' />
            <ToastContainer closeButton={false} limit={1} />

            <div className="card">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/roles')}
                            className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500"
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        <h6 className="text-16">{isEditMode ? 'Edit Role' : 'Add Role'}</h6>
                    </div>

                    <form
                        className="create-form"
                        id="role-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                        }}
                    >
                        {isEditMode && <input type="hidden" name="id" id="id" value={validation.values.id || ""} />}

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            {/* Role Name */}
                            <div className="xl:col-span-6">
                                <label htmlFor="roleNameInput" className="inline-block mb-2 text-base font-medium">Role Name</label>
                                <input
                                    type="text"
                                    id="roleNameInput"
                                    className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="role_name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.role_name || ""}
                                    placeholder="Role name"
                                />
                                {validation.touched.role_name && validation.errors.role_name ? (
                                    <p className="text-red-400 text-sm mt-1">{validation.errors.role_name}</p>
                                ) : null}
                            </div>

                            {/* Role Key */}
                            <div className="xl:col-span-6">
                                <label htmlFor="roleKeyInput" className="inline-block mb-2 text-base font-medium">Role Key</label>
                                <input
                                    type="text"
                                    id="roleKeyInput"
                                    className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="role_key"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.role_key || ""}
                                    placeholder="Role key"
                                />
                                {validation.touched.role_key && validation.errors.role_key ? (
                                    <p className="text-red-400 text-sm mt-1">{validation.errors.role_key}</p>
                                ) : null}
                            </div>

                            {/* Role Group */}
                            <div className="xl:col-span-6">
                                <label htmlFor="roleGroupSelect" className="inline-block mb-2 text-base font-medium">Role Group</label>
                                <select
                                    id="roleGroupSelect"
                                    name="role_group_id"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.role_group_id || ""}
                                    className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                >
                                    <option value="">Select a group</option>
                                    {groupData.map((group: any) => (
                                        <option key={group.group_key} value={group.id}>{group.group_name}</option>
                                    ))}
                                </select>
                                {validation.touched.role_group_id && validation.errors.role_group_id ? (
                                    <p className="text-red-400 text-sm mt-1">{validation.errors.role_group_id}</p>
                                ) : null}
                            </div>

                            {/* Role Description */}
                            <div className="xl:col-span-12">
                                <label htmlFor="roleDescInput" className="inline-block mb-2 text-base font-medium">Role Description</label>
                                <textarea
                                    id="roleDescInput"
                                    className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="role_description"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.role_description || ""}
                                    placeholder="Role Description"
                                    rows={3}
                                />
                                {validation.touched.role_description && validation.errors.role_description ? (
                                    <p className="text-red-400 text-sm mt-1">{validation.errors.role_description}</p>
                                ) : null}
                            </div>

                            {/* Permissions Grouped by Resource */}
                            <div className="xl:col-span-12">
                                <h6 className="text-16 font-semibold mb-4">Permissions</h6>
                                <div className="space-y-6">
                                    {permissions.map((resource: any) => (
                                        <div key={resource.id} className="border border-slate-200 dark:border-zinc-500 rounded-lg p-4">
                                            <h5 className="text-base font-semibold mb-3 text-slate-700 dark:text-slate-300">
                                                {resource.resource_name}
                                            </h5>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                                {resource.actions.map((action: any) => (
                                                    <div key={`${resource.id}-${action.permission_id}`} className="flex items-center gap-2">
                                                        <input
                                                            id={`permission-${action.permission_id}`}
                                                            className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zinc-600 dark:border-zinc-500 checked:bg-fecustom-500 checked:border-fecustom-500 dark:checked:bg-fecustom-500 dark:checked:border-fecustom-500"
                                                            type="checkbox"
                                                            value={action.permission_id}
                                                            checked={selectedPermissions.includes(action.permission_id)}
                                                            onChange={() => handlePermissionChange(action.permission_id)}
                                                        />
                                                        <label htmlFor={`permission-${action.permission_id}`} className="cursor-pointer text-sm">
                                                            {action.action_name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Created At Info - only for edit mode */}
                            {isEditMode && roleData?.created_at && (
                                <div className="xl:col-span-12">
                                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                                        Created on: {moment(roleData.created_at).format("DD MMM, YYYY HH:mm:ss")}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/roles')}
                                className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600"
                            >
                                {isEditMode ? 'Update Role' : 'Add Role'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RoleEdit;
