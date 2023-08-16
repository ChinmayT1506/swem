import { Grid } from "@mui/material";
import React, { useState } from "react";
import CommonBreadcrumb from "../../../../components/breadcumb";
import Inputs from "../../../../components/Input";
import {
    onlyCharacters,
    onlyNumbers,
    userBasedNavigate,
} from "../../../../../utils/commonFunctions";
import CommonSelect from "../../../../components/select";
import CustomButton from "../../../../components/button/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import routeName from "../../../../../constants/routeConstants";
import ConstStrings from "../../../../../constants/ConstStrings";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postDepartment } from "../../../../redux/action/department/departmentAction";
import { useEffect } from "react";
import {
    getStateDataACtion,
    getStateDataAction,
} from "../../../../redux/action/masterApi/getStateDataAction";
import { getCityDataAction } from "../../../../redux/action/masterApi/getCityDataAction";

const {
    DEPARTMENT_NAME,
    STATE,
    CITY,
    POSTAL_CODE,
    complete_address,
    SEARCH,
    ENTER_POSTAL,
    ENTER_DEPART_NAME,
    ENTER_EMAIL,
    ENTER_PASSWORD,
} = ConstStrings.form;

const { ADD_DEPARTMENT, CANCEL } = ConstStrings.button;
const AddDepartment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const AddDepartmentSchema = yup.object().shape({
        department_name: yup
            .string("")
            .required(`*Department name is required`)
            .trim(),
        state: yup.string().required(`*State is required`).nullable(),
        city: yup.string().required(`*City is required`).nullable(),
        complete_address: yup.string().required(`*Address is required`).nullable(),
        zipcode: yup.string().required(`*Postal code is required`).nullable(),
        email: yup
            .string()
            .email("Please enter valid email")
            .required(`*Email is required`)
            .nullable(),
        password: yup.string().required(`*password is required`).nullable(),
    });

    const initialValues = {
        department_name: "",
        state: "",
        city: "",
        zipcode: "",
        email: "",
        password: "",
        complete_address: "",
    };
    const [state, setState] = useState({
        disableBtn: false,
    });
    const onSubmit = (values) => {
        setState({
            ...state,
            disableBtn: true,
        });
        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }
        dispatch(
            postDepartment(formData, (value) => {
                setState({
                    ...state,
                    disableBtn: true,
                });
                if (value?.status === 201) {
                    navigate(userBasedNavigate("/department-management"));
                }
            })
        );
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: AddDepartmentSchema,
    });
    const { handleChange, values, handleSubmit, errors, touched, setFieldValue } =
        formik;

    useEffect(() => {
        dispatch(getStateDataAction());
    }, [dispatch]);
    const stateOptions = useSelector(
        (store) => store.stateReducer?.stateData?.data?.states
    );

    const fetchDistricts = (stateId) => {
        dispatch(getCityDataAction(stateId));
        setFieldValue("state", stateId);
    };
    const cityOptions = useSelector((store) => store.cityReducer?.cityData?.data);
    return (
        <>
            <div className="breadcumb" style={{ marginBottom: "3rem" }}>
                <CommonBreadcrumb
                    routes={[
                        {
                            label: "Department list",
                            path: `${routeName.DEPART_MANAGEMENT}`,
                        },
                        {
                            label: "Add new Department",
                            // path: `${routeName.ADD_DEPARTMENT}`,
                        },
                    ]}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="formWrapper">
                    <div className="addForm">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Inputs
                                    value={values.department_name}
                                    name="department_name"
                                    onChange={handleChange}
                                    title={DEPARTMENT_NAME}
                                    labelClass="labelClass"
                                    istextField={true}
                                    main_input_wrapper="form_input_wrapper"
                                    placeholder={ENTER_DEPART_NAME}
                                    // onKeyPress={(event) => handleTextInput(event, 50)}
                                    onKeyDown={onlyCharacters}
                                />
                                {touched.department_name && errors.department_name && (
                                    <div className="error">{errors.department_name}</div>
                                )}
                            </Grid>
                            <Grid item xs={4}>
                                <CommonSelect
                                    id="adopt"
                                    name="state"
                                    title={STATE}
                                    selectedValue={values.state}
                                    handleChange={(e) => {
                                        const selectedStateId = e.target.value;
                                        fetchDistricts(selectedStateId);
                                    }}
                                    labelClass="labelClass"
                                    stateOptions={stateOptions}
                                    placeholder="Select Department"
                                    main_className="form_input_wrapper"
                                />
                                {touched.state && errors.state && (
                                    <div className="error">{errors.state}</div>
                                )}
                            </Grid>
                            <Grid item xs={4}>
                                <CommonSelect
                                    id="adopt"
                                    name="city"
                                    title={CITY}
                                    labelClass="labelClass"
                                    selectedValue={values.city}
                                    handleChange={handleChange}
                                    cityOptions={cityOptions}
                                    placeholder="Select Department"
                                    main_className="form_input_wrapper"
                                />
                                {touched.city && errors.city && (
                                    <div className="error">{errors.city}</div>
                                )}
                            </Grid>
                            <Grid item xs={4}>
                                <Inputs
                                    value={values.zipcode}
                                    name="zipcode"
                                    onChange={handleChange}
                                    title={POSTAL_CODE}
                                    labelClass="labelClass"
                                    istextField={true}
                                    main_input_wrapper="form_input_wrapper"
                                    placeholder={ENTER_POSTAL}
                                    // onKeyPress={(event) => handleTextInput(event, 50)}
                                    onKeyDown={onlyNumbers}
                                />
                                {touched.zipcode && errors.zipcode && (
                                    <div className="error">{errors.zipcode}</div>
                                )}
                            </Grid>

                            <Grid item xs={4}>
                                <Inputs
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                    title={"Email"}
                                    labelClass="labelClass"
                                    istextField={true}
                                    main_input_wrapper="form_input_wrapper"
                                    placeholder={ENTER_EMAIL}
                                // onKeyPress={(event) => handleTextInput(event, 50)}
                                // onKeyDown={onlyNumbers}
                                />
                                {touched.email && errors.email && (
                                    <div className="error">{errors.email}</div>
                                )}
                            </Grid>
                            <Grid item xs={4}>
                                <Inputs
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                    title={"Password"}
                                    labelClass="labelClass"
                                    istextField={true}
                                    main_input_wrapper="form_input_wrapper"
                                    placeholder={ENTER_PASSWORD}
                                // onKeyPress={(event) => handleTextInput(event, 50)}
                                // onKeyDown={onlyNumbers}
                                />
                                {touched.password && errors.password && (
                                    <div className="error">{errors.password}</div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Inputs
                                    value={values.complete_address}
                                    name="complete_address"
                                    onChange={handleChange}
                                    title={complete_address}
                                    labelClass="labelClass"
                                    istextArea={true}
                                    rows="3"
                                    main_input_wrapper="form_input_wrapper"
                                    placeholder={SEARCH}
                                    // onKeyPress={(event) => handleTextInput(event, 50)}
                                    onKeyDown={onlyCharacters}
                                />
                                {touched.complete_address && errors.complete_address && (
                                    <div className="error">{errors.complete_address}</div>
                                )}
                            </Grid>
                        </Grid>
                        <div className="formBtnBx">
                            <CustomButton
                                variant="contained"
                                buttonClassName="formButton cancel"
                                onClick={() => navigate("/admin/department-management")}
                            >
                                <span>{CANCEL}</span>
                            </CustomButton>
                            <CustomButton
                                variant="contained"
                                buttonClassName="formButton"
                                type="submit"
                                disabled={state.disableBtn}
                            >
                                <span>{ADD_DEPARTMENT}</span>
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddDepartment;