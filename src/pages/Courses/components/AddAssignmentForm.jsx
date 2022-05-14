import { Box, Button, FormHelperText, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const AssignmentSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, "Başlık en az 2 karakter olmalıdır")
		.max(50, "Başlık en fazla 50 karakter olmalıdır")
		.required("Başlık boş bırakılamaz"),
	description: Yup.string()
		.min(2, "Açıklama en az 2 karakter olmalıdır")
		.max(200, "Açıklama en fazla 200 karakter olmalıdır")
		.required("Açıklama boş bırakılamaz"),
	deadline: Yup.date("Deneme").min(new Date(), "Teslim tarihi en erken bugün olabilir"),
	points: Yup.number()
		.min(1, "Puan en az 1 olmalıdır")
		.max(100, "Puan en fazla 100 olmalıdır")
		.required("Puan boş bırakılamaz"),
});

const AddAssignmentForm = () => {
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			deadline: new Date(),
			points: "",
		},
		validationSchema: AssignmentSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					"& .MuiTextField-root": { marginBottom: 2 },
				}}
			>
				<Typography variant="overline" display="block" gutterBottom>
					Ödev Detayları
				</Typography>

				<TextField
					id="title"
					name="title"
					label="Ödev Başlığı"
					variant="outlined"
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
				/>
				<TextField
					id="description"
					name="description"
					label="Açıklama"
					variant="outlined"
					value={formik.values.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.description && Boolean(formik.errors.description)}
					helperText={formik.touched.description && formik.errors.description}
				/>
				<TextField
					id="points"
					name="points"
					label="Puan"
					type="number"
					variant="outlined"
					value={formik.values.points}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.points && Boolean(formik.errors.points)}
					helperText={formik.touched.points && formik.errors.points}
				/>
				<DateTimePicker
					label="Teslim Tarihi"
					renderInput={(params) => <TextField {...params} />}
					value={formik.values.deadline}
					onChange={(value) => {
						formik.setFieldValue("deadline", new Date(value));
					}}
				/>
				{formik.touched.deadline && formik.errors.deadline && (
					<FormHelperText sx={{ mt: -2, ml: 2, mb: 2 }} error>
						{formik.errors.deadline}
					</FormHelperText>
				)}
				<Button color="primary" variant="contained" type="submit">
					Bilgileri Güncelle
				</Button>
			</Box>
		</form>
	);
};

export default AddAssignmentForm;
