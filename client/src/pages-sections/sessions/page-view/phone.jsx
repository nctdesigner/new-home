"use client";

import Button from "@mui/material/Button";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"; // LOCAL CUSTOM COMPONENTS

import EyeToggleButton from "../components/eye-toggle-button"; // LOCAL CUSTOM HOOK

import usePasswordVisible from "../use-password-visible"; // GLOBAL CUSTOM COMPONENTS

import BazaarTextField from "components/BazaarTextField"; // ==============================================================

// ==============================================================
const PhonePageView = ({ closeDialog }) => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible(); // LOGIN FORM FIELDS INITIAL VALUES

  const initialValues = {
    name: "",
    number: "",
    edge: "",
  }; // LOGIN FORM FIELD VALIDATION SCHEMA

  const validationSchema = yup.object().shape({
    edge: yup.string().required("Edge is required"),
    number: yup.string().required("Number is required"),
    name: yup.string().required("Name is required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        closeDialog?.();
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <BazaarTextField
        mb={1.5}
        fullWidth
        name="number"
        size="small"
        type="text"
        variant="outlined"
        onBlur={handleBlur}
        value={values.number}
        onChange={handleChange}
        label="Name"
        placeholder="Ralph Lauren"
        error={!!touched.name && !!errors.name}
        helperText={touched.name && errors.name}
      />
      <BazaarTextField
        mb={1.5}
        fullWidth
        name="number"
        size="small"
        type="text"
        variant="outlined"
        onBlur={handleBlur}
        value={values.number}
        onChange={handleChange}
        label="Number"
        placeholder="99850000XX"
        error={!!touched.number && !!errors.number}
        helperText={touched.number && errors.number}
      />

      {
        false ? <BazaarTextField
        mb={2}
        fullWidth
        size="small"
        id="edge"
        name="edge"
        label="OTP"
        autoComplete="off"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.edge}
        placeholder="******"
        type="text"
        error={!!touched.edge && !!errors.edge}
        helperText={touched.edge && errors.edge}
        InputProps={{
          endAdornment: (
            <EyeToggleButton
              show={visiblePassword}
              click={togglePasswordVisible}
            />
          ),
        }}
      /> : ""
      }

      <Button
        type="submit"
        fullWidth
        color="primary"
        variant="contained"
        size="large"
      >
        Login
      </Button>
    </form>
  );
};

export default PhonePageView;
