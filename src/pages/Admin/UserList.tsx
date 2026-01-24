import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Flatpickr from "react-flatpickr";
import moment from "moment";

// Icons
import { Search, Plus, Trash2, Eye, Pencil, ImagePlus } from 'lucide-react';

import dummyImg from "assets/images/users/user-dummy-img.jpg";

import TableContainer from 'Common/TableContainer';
import { Link } from 'react-router-dom';

import DeleteModal from 'Common/DeleteModal';
import Modal from 'Common/Components/Modal';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import {
    getEmployee as onGetEmployee,
    addEmployee as onAddEmployee,
    updateEmployee as onUpdateEmployee,
    deleteEmployee as onDeleteEmployee,
    fetchRoleGroups,
    fetchUserRoles
} from 'slices/thunk';
import { ToastContainer } from 'react-toastify';
import { fetchUserList, onAddUser, onDeleteUser, onUpdateUser } from 'slices/userList/thunk';

const UserList = () => {

    const dispatch = useDispatch<any>();

     const selectUserRoleData = createSelector(
                 (state: any) => state.UserRoles,
                 (userRoles) => ({
                     roles: userRoles.roles,
                     meta: userRoles.meta,
                     loading: userRoles.loading
                 })
         );
        
            
    const { roles } = useSelector(selectUserRoleData);


   // ⭐ UPDATED SELECTOR FOR USER LIST
       const selectUserData = createSelector(
           (state: any) => state.UserList,
           (userList) => ({
               users: userList.users,
               meta: userList.meta,
               loading: userList.loading
           })
       );


    const { users, meta, loading } = useSelector(selectUserData);

    useEffect(() => {
        if(roles.length === 0) {
            dispatch(fetchUserRoles({ page: 1, limit: 10 }));
        }
        // ✅ Only dispatch fetchUserList once here
        dispatch(fetchUserList({ page: 1, limit: 10 }));
    }, []); // ✅ Add dispatch to dependency array

    const [eventData, setEventData] = useState<any>();

    const [show, setShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Delete Modal
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    const onClickDelete = (cell: any) => {
        setDeleteModal(true);
        if (cell.id) {
            setEventData(cell);
        }
    };

    // 🟢 DELETE → Now Refreshes After Request
    const handleDelete = () => {
        if (!eventData?.id) return;
        dispatch(onDeleteUser(eventData.id))
            .then(() => dispatch(fetchUserList({ page: 1, limit: 10 })));
        setDeleteModal(false);
    };

    // 🟢 EDIT
    const handleUpdateDataClick = (ele: any) => {
        setEventData({ ...ele });
        setIsEdit(true);
        setShow(true);
    };

    // 🟢 Formik Validation
    const validation: any = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: eventData?.id || '',
            name: eventData?.name || '',
            email: eventData?.email || '',
            role_id: eventData?.role_id ?? roles?.[0]?.id ?? '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            email: Yup.string().email("Invalid email").required("Please Enter Email"),
            role_id: Yup.string().required("Please select Role"),
        }),

        // 🟢 ADD + UPDATE + REFRESH LIST
        onSubmit: (values) => {
            const body = {
                name: values.name,
                email: values.email,
                role_id: values.role_id,
            };

            if (isEdit) {
                dispatch(onUpdateUser({ id: values.id, body }))
                    .then(() => dispatch(fetchUserList({ page: 1, limit: 10 })));
            } else {
                dispatch(onAddUser(body))
                    .then(() => dispatch(fetchUserList({ page: 1, limit: 10 })));
            }

            toggle();
        },
    });

    // 🟢 Modal Toggle Cleanup (Fixed)
    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setEventData(null);
            setIsEdit(false);
            validation.resetForm();
        } else {
            setShow(true);
            setEventData(null);
            validation.resetForm();
        }
    }, [show, validation]);

    // columns
    const columns = useMemo(() => [
        {
            header: "Name",
            accessorKey: "name",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <Link to="#!" className="flex items-center gap-3">
                    <div className="size-6 rounded-full shrink-0 bg-slate-100">
                        <img
                            src={cell.row.original.profile_image_path || dummyImg}
                            alt={cell.getValue() || "user"}
                            className="h-6 rounded-full object-cover"
                        />
                    </div>
                    <h6 className="grow">{cell.getValue()}</h6>
                </Link>
            ),
        },
        {
            header: "Email",
            accessorKey: "email",
            enableColumnFilter: false,
            cell: (cell: any) => <span className="text-sm">{cell.getValue()}</span>,
        },
        {
            header: "Role",
            accessorKey: "role_id",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <span className="inline-block text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-zinc-700">
                    {roles.find((role: any) => role.id === cell.getValue())?.role_name ?? "—"}
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
            header: "Last Login",
            accessorKey: "last_login_at",
            enableColumnFilter: false,
            cell: (cell: any) => {
                const v = cell.getValue();
                return <span>{v ? moment(v).format("DD MMM, YYYY HH:mm") : "Never"}</span>;
            },
        },
        {
            header: "Active",
            accessorKey: "is_active",
            enableColumnFilter: false,
            cell: (cell: any) => {
                const val = cell.getValue();
                return (
                    <span className={`text-xs px-2 py-1 rounded-full ${val ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {val ? "Active" : "Inactive"}
                    </span>
                );
            },
        },
        {
            header: "Verified",
            accessorKey: "is_verified",
            enableColumnFilter: false,
            cell: (cell: any) => {
                const val = cell.getValue();
               
                return (
                    <span className={`text-xs px-2 py-1 rounded-full ${val ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {val ? "Verified" : "Unverified"}
                    </span>
                );
            },
        },
        {
            header: "Action",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cell: any) => (
                <div className="flex gap-3">
                    <Link className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500" to={`/pages-account/${cell.row.original.id}`}>
                        <Eye className="inline-block size-3" />
                    </Link>

                    <button
                        type="button"
                        className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md edit-item-btn bg-slate-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500"
                        onClick={() => {
                            const data = cell.row.original;
                            handleUpdateDataClick(data);
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
    ], [roles, users]);

    return (
        <React.Fragment>
            <BreadCrumb title='Users List' pageTitle='HR Management' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="card" id="userTable">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-4">
                        <h6 className="text-15 grow">Users (<b className="total-Users">{users.length}</b>)</h6>
                        <div className="shrink-0">
                            <Link to="#!" data-modal-target="addUserModal" type="button" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20 add-user" onClick={toggle}>
                                <Plus className="inline-block size-4" /> <span className="align-middle">Add User</span>
                            </Link>
                        </div>
                    </div>
                    {users && users.length > 0 ?
                        <TableContainer
                            isPagination={true}
                            columns={(columns || [])}
                            data={(users || [])}
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

            {/* User Modal */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-4/4"
                dialogClassName="w-screen md:w-[50rem]  bg-white shadow rounded-md dark:bg-zinc-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zinc-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!isEdit ? "Edit User" : "Add User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen'))] p-4 overflow-y-auto">
                    <form className="create-form" id="create-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                    >
                        <input type="hidden" name="id" id="id" value={validation.values.id || ""} />
                        <div id="alert-error-msg" className="hidden px-4 py-3 text-sm text-red-500 border border-transparent rounded-md bg-red-50 dark:bg-red-500/20"></div>
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                          
                            <div className="xl:col-span-6">
                                <label htmlFor="roleSelect" className="inline-block mb-2 text-base font-medium">Role Group</label>
                                <select id="roleSelect" name="role_id" onChange={validation.handleChange} value={validation.values.role_id || ""} className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500">
                                    {roles.map((role: any) => (
                                        <option key={role.role_key} value={role.id}>{role.role_name}</option>
                                    ))}
                                </select>
                                {validation.touched.role_id && validation.errors.role_id ? (
                                    <p className="text-red-400">{validation.errors.role_id}</p>
                                ) : null}
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="nameInput" className="inline-block mb-2 text-base font-medium">Name</label>
                                <input type="text" id="nameInput" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="name"
                                    onChange={validation.handleChange}
                                    value={validation.values.name || ""}
                                    placeholder="User name"
                                />
                                {validation.touched.name && validation.errors.name ? (
                                    <p className="text-red-400">{validation.errors.name}</p>
                                ) : null}
                            </div>


                            <div className="xl:col-span-9">
                                <label htmlFor="emailInput" className="inline-block mb-2 text-base font-medium">Email</label>
                                <input type="email" id="emailInput" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="email"
                                    onChange={validation.handleChange}
                                    value={validation.values.email || ""}
                                    placeholder="example@domain.com"
                                />
                                {validation.touched.email && validation.errors.email ? (
                                    <p className="text-red-400">{validation.errors.email}</p>
                                ) : null}
                            </div>


                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" id="close-modal" data-modal-close="addUserModal" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100" onClick={toggle}>Cancel</button>
                            <button type="submit" id="addNew" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600">
                                {!!isEdit ? "Update User" : "Add User"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </React.Fragment>
    );
};

export default UserList;
