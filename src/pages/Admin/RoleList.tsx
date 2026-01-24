import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import moment from "moment";

// Icons
import { Search, Plus, Trash2, Eye, Pencil } from 'lucide-react';

import TableContainer from 'Common/TableContainer';
import { Link, useNavigate } from 'react-router-dom';

import DeleteModal from 'Common/DeleteModal';
import Modal from 'Common/Components/Modal';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import {
    fetchUserRoles,
    fetchRoleGroups,
    addUserRole,
    deleteUserRole,
} from 'slices/thunk';
import { ToastContainer } from 'react-toastify';
import { fetchActions } from 'slices/actions/thunk';

const RoleList = () => {

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

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
                meta: userRoles.meta,
                loading: userRoles.loading
            })
    );


    const selectActionsData = createSelector(
            (state: any) => state.Actions,
            (actions) => ({
                actions: actions.actions,
                meta: actions.meta,
                loading: actions.loading
            })
    );

    const { actions } = useSelector(selectActionsData);
    const { roles, meta, loading } = useSelector(selectUserRoleData);

    useEffect(() => {
        if(groups.length === 0) {
            dispatch(fetchRoleGroups({ page: 1, limit: 10 })); // calling backend with limit=10
        }
        if(actions.length === 0) {
            dispatch(fetchActions()); // calling backend with limit=10
        }
        dispatch(fetchUserRoles({ page: 1, limit: 10 })); // calling backend with limit=10
    }, [dispatch]);

    const [data, setData] = useState<any>([]);
    const [eventData, setEventData] = useState<any>();
    const [groupData, setGroupData] = useState<any>([]);

    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setData(roles || []);
    }, [roles]);

    useEffect(() => {
        setGroupData(groups || []);
    }, [groups]);

    // Delete Modal
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    const onClickDelete = (cell: any) => {
        setDeleteModal(true);
        if (cell.id) setEventData(cell);
    };

    const handleDelete = () => {
        if (!eventData?.id) return;
        dispatch(deleteUserRole(eventData.id)).then(() => {
            dispatch(fetchUserRoles({ page: 1, limit: 10 }));
        });
        setDeleteModal(false);
    };

    // 🟢 FORM HANDLING (ADD NEW ROLE)
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            role_name: "",
            role_description: "",
            role_group_id: "",
            role_key: "",
        },

        validationSchema: Yup.object({
            role_name: Yup.string().required("Role Name is required"),
            role_description: Yup.string().required("Role Description is required"),
            role_group_id: Yup.string().required("Select a group"),
            role_key: Yup.string().required("Role Key is required"),
        }),

        onSubmit: (values) => {
            const body = {
                role_name: values.role_name,
                role_description: values.role_description,
                role_group_id: values.role_group_id,
                role_key: values.role_key,
            };

            dispatch(addUserRole(body))
                .then(() => dispatch(fetchUserRoles({ page: 1, limit: 10 })));

            toggle();
        },
    });

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            validation.resetForm();
        } else {
            setShow(true);
        }
    }, [show, validation]);

    // columns
    const columns = useMemo(() => [
        {
            header: "Role Name",
            accessorKey: "role_name",
            enableColumnFilter: false,
            cell: (cell: any) => (
                    <h6 className="grow">{cell.getValue()}</h6>
            ),
        },
        {
            header: "Role Description",
            accessorKey: "role_description",
            enableColumnFilter: false,
            cell: (cell: any) => (
                    <p className="grow">{cell.getValue()}</p>
            ),
        },
        {
            header: "Role Key",
            accessorKey: "role_key",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <span className="inline-block text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-zinc-700">
                    {cell.getValue() ?? "—"}
                </span>
            ),
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            enableColumnFilter: false,
            cell: (cell: any) => {
                const v = cell.getValue();
                return <span>{v ? moment(v).format("DD MMM, YYYY") : "—"}</span>;
            },
        },
        {
            header: "Action",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cell: any) => (
                <div className="flex gap-3">
                    {/* <Link className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500" to="/pages-account">
                        <Eye className="inline-block size-3" />
                    </Link> */}

                    <button
                        type="button"
                        className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md edit-item-btn bg-slate-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500"
                        onClick={() => {
                            const data = cell.row.original;
                            navigate(`/admin/role-edit/${data.id}`);
                        }}
                    >
                        <Pencil className="size-4" />
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md remove-item-btn bg-slate-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500"
                        onClick={() => {
                            const data = cell.row.original;
                            onClickDelete(data);
                        }}
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            ),
        }
    ], [navigate]);

    return (
        <React.Fragment>
            <BreadCrumb title='User Roles List' pageTitle='HR Management' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="card" id="userTable">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-4">
                        <h6 className="text-15 grow">Roles(<b className="total-Users">{data.length}</b>)</h6>
                        <div className="shrink-0">
                            <button type="button" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20 add-user" onClick={toggle}>
                                <Plus className="inline-block size-4" /> <span className="align-middle">Add Role</span>
                            </button>
                        </div>
                    </div>
                    {data && data.length > 0 ?
                        <TableContainer
                            isPagination={true}
                            columns={(columns || [])}
                            data={(data || [])}
                            customPageSize={7}
                            divclassName="-mx-5 overflow-x-auto"
                            tableclassName="w-full whitespace-nowrap"
                            theadclassName="ltr:text-left rtl:text-right bg-slate-100 dark:bg-zinc-600"
                            thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-b border-slate-200 dark:border-zinc-500"
                            tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zinc-500"
                            PaginationClassName="flex flex-col items-center gap-4 px-4 mt-4 md:flex-row"
                        />
                        :
                        (<div className="noresult">
                            <div className="py-6 text-center">
                                <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                                <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                                <p className="mb-0 text-slate-500 dark:text-zinc-200">We've searched more than 299+ Users. We did not find any user for your search.</p>
                            </div>
                        </div>)}
                </div>
            </div>

            {/* Add Role Modal */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-4/4"
                dialogClassName="w-screen md:w-[75rem] bg-white shadow rounded-md dark:bg-zinc-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zinc-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Add Role</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen'))] p-4 overflow-y-auto">
                    <form className="create-form" id="create-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                    >
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <div className="xl:col-span-7">
                                <label htmlFor="nameInput" className="inline-block mb-2 text-base font-medium">Name</label>
                                <input type="text" id="nameInput" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="role_name"
                                    onChange={validation.handleChange}
                                    value={validation.values.role_name || ""}
                                    placeholder="Role name"
                                />
                                {validation.touched.role_name && validation.errors.role_name ? (
                                    <p className="text-red-400">{validation.errors.role_name}</p>
                                ) : null}
                            </div>

                            <div className="xl:col-span-7">
                                <label htmlFor="roleKeyInput" className="inline-block mb-2 text-base font-medium">Role Key</label>
                                <input type="text" id="roleKeyInput" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="role_key"
                                    onChange={validation.handleChange}
                                    value={validation.values.role_key || ""}
                                    placeholder="Role key"
                                />
                                {validation.touched.role_key && validation.errors.role_key ? (
                                    <p className="text-red-400">{validation.errors.role_key}</p>
                                ) : null}
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="roleSelect" className="inline-block mb-2 text-base font-medium">Role Group</label>
                                <select id="roleSelect" name="role_group_id" onChange={validation.handleChange} value={validation.values.role_group_id || ""} className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500">
                                    <option value="">Select a group</option>
                                    {groupData.map((group: any) => (
                                        <option key={group.group_key} value={group.id}>{group.group_name}</option>
                                    ))}
                                </select>
                                {validation.touched.role_group_id && validation.errors.role_group_id ? (
                                    <p className="text-red-400">{validation.errors.role_group_id}</p>
                                ) : null}
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="descInput" className="inline-block mb-2 text-base font-medium">Role Description</label>
                                <input type="text" id="descInput" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="role_description"
                                    onChange={validation.handleChange}
                                    value={validation.values.role_description || ""}
                                    placeholder="Role Description"
                                />
                                {validation.touched.role_description && validation.errors.role_description ? (
                                    <p className="text-red-400">{validation.errors.role_description}</p>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100" onClick={toggle}>Cancel</button>
                            <button type="submit" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600">
                                Add Role
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </React.Fragment>
    );
};

export default RoleList;
