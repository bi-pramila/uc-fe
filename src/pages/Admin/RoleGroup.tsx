import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import moment from "moment";
import Select from 'react-select';

interface Option {
    readonly label: string;
    readonly value?: string;
    readonly options?: Option[];
    readonly isDisabled?: boolean
}

// Icons
import { Search, Plus, Trash2, Eye, Pencil, ImagePlus } from 'lucide-react';

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
    fetchRoleGroups,
    addRoleGroup,
    updateRoleGroup,
    deleteRoleGroup
} from 'slices/thunk';
import { ToastContainer } from 'react-toastify';

const RoleGroup = () => {

      const dispatch = useDispatch<any>();

    // ⭐ UPDATED SELECTOR FOR ROLE GROUPS
    const selectRoleGroupData = createSelector(
        (state: any) => state.RoleGroup,
        (roleGroup) => ({
            groups: roleGroup.groups,
            meta: roleGroup.meta,
            loading: roleGroup.loading
        })
    );

    

    const { groups, meta, loading } = useSelector(selectRoleGroupData);


    useEffect(() => {
        dispatch(fetchRoleGroups({ page: 1, limit: 10 })); // calling backend with limit=10
    }, [dispatch]);

    const [data, setData] = useState<any>([]);
    const [eventData, setEventData] = useState<any>();

    const [show, setShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const RemoveMultipleOptions: Option[] = [
        { label: "Choice 1", value: "Choice 1" },
        { label: "Choice 2", value: "Choice 2" },
        { label: "Choice 3", value: "Choice 3" },
        { label: "Choice 4", value: "Choice 4" }
    ];

    

    useEffect(() => {
        setData(groups);
    }, [groups]);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    const onClickDelete = (cell: any) => {
        setDeleteModal(true);
        if (cell.id) setEventData(cell);
    };

    const handleDelete = () => {
        if (!eventData?.id) return;
        dispatch(deleteRoleGroup(eventData.id)).then(() => {
            dispatch(fetchRoleGroups({ page: 1, limit: 10 }));
        });
        setDeleteModal(false);
    };

    // Validation (UPDATED)
    const validation: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            id: eventData?.id || '',
            group_name: eventData?.group_name || '',
            group_key: eventData?.group_key || '',
            group_description: eventData?.group_description || '',
        },

        validationSchema: Yup.object({
            group_name: Yup.string().required("Group Name is required"),
            group_key: Yup.string().required("Group Key is required"),
            group_description: Yup.string().required("Group Description is required"),
        }),

        onSubmit: (values) => {
            const body = {
                group_name: values.group_name,
                group_key: values.group_key,
                group_description: values.group_description,
            };

            if (isEdit) {
                dispatch(updateRoleGroup({ id: values.id, body }))
                    .then(() => dispatch(fetchRoleGroups({ page: 1, limit: 10 })));
            } else {
                dispatch(addRoleGroup(body))
                    .then(() => dispatch(fetchRoleGroups({ page: 1, limit: 10 })));
            }

            toggle();
        },
    });

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setEventData("");
            setIsEdit(false);
        } else {
            setShow(true);
            setEventData("");
            validation.resetForm();
        }
    }, [show, validation]);

    const handleUpdateDataClick = (ele: any) => {
        setEventData({ ...ele });
        setIsEdit(true);
        setShow(true);
    };

    // columns
    const columns = useMemo(() => [
        {
            header: "Group",
            accessorKey: "group_name",
            enableColumnFilter: false,
            cell: (cell: any) => (
                    <h6 className="grow">{cell.getValue()}</h6>
            ),
        },
        {
            header: "Group Description",
            accessorKey: "group_description",
            enableColumnFilter: false,
            cell: (cell: any) => (
                    
                    <p className="grow">{cell.getValue()}</p>
            ),
        },
        {
            header: "Group Key",
            accessorKey: "group_key",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <span className="inline-block text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-zinc-700">
                    {cell.getValue() ?? "—"}
                </span>
            ),
        },
        {
            header: "Roles Assigned",
            accessorKey: "roles",
            enableColumnFilter: false,
            cell: (cell: any) => {
                const v = cell.getValue();
                console.log(v, "roles assigned");
                return (<div className="flex flex-wrap items-center gap-2">
                    {
  v?.map((role: any, index: number) => (
    <span
      key={role.id ?? index}
      className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-sky-100 border-transparent text-sky-500 dark:bg-sky-500/20 dark:border-transparent"
    >
      {role.role_name}
    </span>
  ))
}
                        </div>
                );
            },
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
    ], []);

    return (
        <React.Fragment>
            <BreadCrumb title='Role Groups' pageTitle='Admin' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="card" id="userTable">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-4">
                        <h6 className="text-15 grow">Role Groups (<b className="total-Users">{data.length}</b>)</h6>
                        <div className="shrink-0">
                            <Link to="#!" data-modal-target="addUserModal" type="button" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20 add-user" onClick={toggle}>
                                <Plus className="inline-block size-4" /> <span className="align-middle">Add Role Group</span>
                            </Link>
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

            {/* Modal (only field names changed) */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[45rem] bg-white shadow rounded-md dark:bg-zinc-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zinc-500">
                    <Modal.Title className="text-16">{!!isEdit ? "Edit Role Group" : "Add Role Group"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 overflow-y-auto">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                    >
                        <input type="hidden" name="id" value={validation.values.id || ""} />

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">

                            {/* Name */}
                            <div className="xl:col-span-12">
                                <label className="inline-block mb-2 text-base font-medium">Role Group Name</label>
                                <input
                                    type="text"
                                    className="form-input border-slate-200 dark:border-zinc-500"
                                    name="group_name"
                                    onChange={validation.handleChange}
                                    value={validation.values.group_name}
                                    placeholder="Role Group name"
                                />
                            </div>

                            {/* Key */}
                            <div className="xl:col-span-12">
                                <label className="inline-block mb-2 text-base font-medium">Role Group Key</label>
                                <input
                                    type="text"
                                    className="form-input border-slate-200 dark:border-zinc-500"
                                    name="group_key"
                                    onChange={validation.handleChange}
                                    value={validation.values.group_key}
                                    placeholder="Role Group Key"
                                />
                            </div>

                            {/* Description */}
                            <div className="xl:col-span-12">
                                <label className="inline-block mb-2 text-base font-medium">Role Group Description</label>
                                <input
                                    type="text"
                                    className="form-input border-slate-200 dark:border-zinc-500"
                                    name="group_description"
                                    onChange={validation.handleChange}
                                    value={validation.values.group_description}
                                    placeholder="Role Group Description"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" className="text-red-500 bg-white btn" onClick={toggle}>Cancel</button>
                            <button type="submit" className="text-white btn bg-fecustom-500 border-fecustom-500">
                                {!!isEdit ? "Update Role" : "Add Role"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </React.Fragment>
    );
};

export default RoleGroup;
