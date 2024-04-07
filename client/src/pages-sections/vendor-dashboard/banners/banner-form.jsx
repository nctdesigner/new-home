import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS
import api from "../../../utils/__api__/banners"

import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; // STYLED COMPONENTS

import { UploadImageBox, StyledClear } from "../styles"; // FORM FIELDS VALIDATION SCHEMA

const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required!"),
  name: yup.string().required("Name is required!"),
  subtitle: yup.string().required("Subtitle is required!"),
  redirectText: yup.string().required("Redirect Text is required!"),
  redirectUrl: yup.string().required("Redirect Url is required!"),
}); // ================================================================

// ================================================================
const ProductForm = (props) => {
  const { initialValues, productId } = props;
  const [files, setFiles] = useState(initialValues.image); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE

  const handleFormSubmit = async values => {
    const image = files[0].base64 === undefined ? files[0] : files[0].base64.substring(files[0].base64.indexOf(",") + 1)
    if (initialValues.name !== "" && initialValues.title !== "" && initialValues.subtitle !== "" && initialValues.redirectText !== "" && initialValues.redirectUrl !== "") {  
      const response = await api.updateBanners(values.name, values.title, values.subtitle, values.redirectText, values.redirectUrl, image, productId);
      if (response.error) {
        alert(response.error)
      } else {
        alert(response.message)
      }
    } else {
      const response = await api.createBanner(values.name, values.title, values.subtitle, values.redirectText, values.redirectUrl, image);
      if (response.error) {
        alert(response.error)
      } else {
        alert(response.message)
      }
    }
  };

  const handleChangeDropZone = (newFiles) => {
    const updatedFiles = [...files, ...newFiles]; // Combine existing files with newly dropped files
    updatedFiles.forEach((file, index) => {
      // Assign preview URL for each file
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
  
      // Read file as base64 and store in the file object
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        updatedFiles[index] = { ...updatedFiles[index], base64: base64Data };
        setFiles([...updatedFiles]); // Update the files state with the combined array
      };
      reader.readAsDataURL(file);
    });
  };
  // HANDLE DELETE UPLOAD IMAGE

  const handleFileDelete = (file) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

  console.log({ files });

  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="id"
                  label="Id"
                  color="info"
                  size="medium"
                  placeholder="Id"
                  value={values.id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.id && !!errors.id}
                  helperText={touched.id && errors.id}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  color="info"
                  size="medium"
                  placeholder="Title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="subtitle"
                  label="Subtitle"
                  color="info"
                  size="medium"
                  placeholder="Subtitle"
                  value={values.subtitle}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.subtitle && !!errors.subtitle}
                  helperText={touched.subtitle && errors.subtitle}
                />
              </Grid>

          
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="redirectText"
                  label="Redirect Text"
                  color="info"
                  size="medium"
                  placeholder="Redirect Text"
                  value={values.redirectText}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.redirectText && !!errors.redirectText}
                  helperText={touched.redirectText && errors.redirectText}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="redirectUrl"
                  label="Redirect Url"
                  color="info"
                  size="medium"
                  placeholder="Redirect Url"
                  value={values.redirectUrl}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.redirectUrl && !!errors.redirectUrl}
                  helperText={touched.redirectUrl && errors.redirectUrl}
                />
              </Grid>



              <Grid item xs={12}>
                <DropZone onChange={(files) => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <Box component="img" src={file.preview === undefined ? `data:image/png;base64,${file}` : file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>


              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save Banner
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default ProductForm;
