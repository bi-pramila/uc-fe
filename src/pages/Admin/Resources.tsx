import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Flatpickr from "react-flatpickr";
import moment from "moment";

// Icons
import { Search, Plus, Trash2, Eye, Pencil, ImagePlus } from 'lucide-react';
import TableContainer from 'Common/TableContainer';
import { Link } from 'react-router-dom';

import DeleteModal from 'Common/DeleteModal';
import Modal from 'Common/Components/Modal';

import Select from 'react-select';

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
    deleteEmployee as onDeleteEmployee
} from 'slices/thunk';
import { ToastContainer } from 'react-toastify';

interface Option {
    readonly label: string;
    readonly value?: string;
    readonly options?: Option[];
    readonly isDisabled?: boolean
}


const Resources = () => {

    const dispatch = useDispatch<any>();

    const selectDataList = createSelector(
        (state: any) => state.HRManagment,
        (state) => ({
            dataList: state.employeelist
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<any>([]);
    const [eventData, setEventData] = useState<any>();

    const [show, setShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const RemoveMultipleOptions: Option[] = [
        { label: "Choice 1", value: "Choice 1" },
        { label: "Choice 2", value: "Choice 2" },
        { label: "Choice 3", value: "Choice 3" },
        { label: "Choice 4", value: "Choice 4" },
        { label: "Choice 5", value: "Choice 5" },
        { label: "Choice 6", value: "Choice 6" },
        { label: "Choice 7", value: "Choice 7" },
        { label: "Choice 8", value: "Choice 8" },
        { label: "Choice 9", value: "Choice 9" },
        { label: "Choice 10", value: "Choice 10" },
        { label: "Choice 11", value: "Choice 11" },
        { label: "Choice 12", value: "Choice 12" }
    ];

    // Image
    const [selectedImage, setSelectedImage] = useState<any>();

    const handleImageChange = (event: any) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                validation.setFieldValue('profile_image_path', e.target.result);
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Get Data
    useEffect(() => {
        dispatch(onGetEmployee());
    }, [dispatch]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

    // Delete Modal
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    // Delete Data
    const onClickDelete = (cell: any) => {
        setDeleteModal(true);
        if (cell.id) {
            setEventData(cell);
        }
    };

    const handleDelete = () => {
        if (eventData) {
            dispatch(onDeleteEmployee(eventData.id));
            setDeleteModal(false);
        }
    };

    // Update Data
    const handleUpdateDataClick = (ele: any) => {
        setEventData({ ...ele });
        setIsEdit(true);
        setShow(true);
    };

    // validation
    const validation: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            id: (eventData && eventData.id) || '',
            name: (eventData && eventData.name) || '',
            email: (eventData && eventData.email) || '',
            role_id: (eventData && eventData.role_id) || '',
            created_at: (eventData && eventData.created_at) || '',
            is_active: (eventData && (eventData.is_active === true || eventData.is_active === "true")) || false,
            is_verified: (eventData && (eventData.is_verified === true || eventData.is_verified === "true")) || false,
            last_login_at: (eventData && eventData.last_login_at) || '',
            profile_image_path: (eventData && eventData.profile_image_path) || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            email: Yup.string().email("Invalid email").required("Please Enter Email"),
            role_id: Yup.string().required("Please select Role"),
            // profile_image_path optional but keeping check if you want required: .required("Please Add Image")
        }),

        onSubmit: (values) => {
            if (isEdit) {
                const updateData = {
                    id: values.id || (eventData ? eventData.id : 0),
                    ...values,
                };
                // update user
                dispatch(onUpdateEmployee(updateData));
            } else {
                const newData = {
                    ...values,
                    id: (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString(),
                    created_at: values.created_at || moment().toISOString(),
                    last_login_at: values.last_login_at || null
                };
                // save new user
                dispatch(onAddEmployee(newData));
            }
            toggle();
        },
    });

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setEventData("");
            setIsEdit(false);
            setSelectedImage("");
        } else {
            setShow(true);
            setEventData("");
            setSelectedImage("");
            validation.resetForm();
        }
    }, [show, validation]);

    // columns
    const columns = useMemo(() => [
        {
            header: "Resources Name",
            accessorKey: "resource_name",
            enableColumnFilter: false,
            cell: (cell: any) => (
                    <h6 className="grow">{cell.getValue()}</h6>
            ),
        },
        {
            header: "Resource Group",
            accessorKey: "resource_group",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-purple-100 border-transparent text-purple-500 dark:bg-purple-500/20 dark:border-transparent">Resource 1</span>
                  <span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-purple-100 border-transparent text-purple-500 dark:bg-purple-500/20 dark:border-transparent">Resource 2</span>
                  <span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-purple-100 border-transparent text-purple-500 dark:bg-purple-500/20 dark:border-transparent">Resource 3</span>
                </div>
            ),
        },
        {
            header: "Resource Key",
            accessorKey: "resource_key",
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
                    <Link className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-fecustom-500 hover:bg-fecustom-100 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-fecustom-500/20 dark:hover:text-fecustom-500" to="/pages-account">
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
    ], []);

    return (
        <React.Fragment>
            <BreadCrumb title='Resources' pageTitle='Admin' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="card" id="userTable">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-4">
                        <h6 className="text-15 grow">Resources (<b className="total-Resourcess">{data.length}</b>)</h6>
                        <div className="shrink-0">
                            <Link to="#!" data-modal-target="addResourcesModal" type="button" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20 add-user" onClick={toggle}>
                                <Plus className="inline-block size-4" /> <span className="align-middle">Add Resources</span>
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
                                <p className="mb-0 text-slate-500 dark:text-zinc-200">We've searched more than 299+ Resourcess. We did not find any user for your search.</p>
                            </div>
                        </div>)}
                </div>
            </div>

            {/* Resources Modal */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-4/4"
                dialogClassName="w-screen md:w-[45rem] bg-white shadow rounded-md dark:bg-zinc-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zinc-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!isEdit ? "Edit Resources" : "Add Resources"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen'))] h-[30rem] p-4 overflow-y-auto">
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
                            <div className="xl:col-span-12">
                                <label htmlFor="nameInput" className="inline-block mb-2 text-base font-medium">Resource name</label>
                                <input type="text" id="nameInput" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="resource_name"
                                    onChange={validation.handleChange}
                                    value={validation.values.name || ""}
                                    placeholder="Resource name"
                                />
                                {validation.touched.name && validation.errors.name ? (
                                    <p className="text-red-400">{validation.errors.name}</p>
                                ) : null}
                            </div>
                            <div className="xl:col-span-12">
                                <label htmlFor="nameInput" className="inline-block mb-2 text-base font-medium">Resource Description</label>
                                <input type="text" id="nameInput" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500"
                                    name="resource_description"
                                    onChange={validation.handleChange}
                                    value={validation.values.name || ""}
                                    placeholder="Resource Description"
                                />
                                {validation.touched.name && validation.errors.name ? (
                                    <p className="text-red-400">{validation.errors.name}</p>
                                ) : null}
                            </div>
                            <div className="xl:col-span-12">
                                <h6 className="mb-1 text-15">Resource Groups</h6>
                                <Select
                                    className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" id="choices-multiple-remove-button"
                                    name="choices-multiple-remove-button"
                                    defaultValue={[RemoveMultipleOptions[0]]}
                                    isClearable
                                    isMulti
                                    options={RemoveMultipleOptions}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" id="close-modal" data-modal-close="addResourcesModal" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100" onClick={toggle}>Cancel</button>
                            <button type="submit" id="addNew" className="text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600">
                                {!!isEdit ? "Update Resource" : "Add Resource"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </React.Fragment>
    );
};

export default Resources;
