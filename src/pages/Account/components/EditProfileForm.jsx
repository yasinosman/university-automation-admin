import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const USER_DATA = {
	firstName: "Yasin",
	lastName: "Osman",
	email: "yasinosman10@gmail.com",
};

const ProfileSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, "İsim en az 2 karakter olmalıdır")
		.max(50, "İsim en fazla 50 karakter olmalıdır")
		.required("İsim boş bırakılamaz"),
	lastName: Yup.string()
		.min(2, "Soyisim en az 2 karakter olmalıdır.")
		.max(50, "Soyisim en fazla 50 karakter olmalıdır")
		.required("Soyisim boş bırakılamaz"),
	email: Yup.string().email("Lütfen geçerli bir e-posta adresi giriniz").required("E-posta adresi boş bırakılamaz"),
});

const EditProfileForm = () => {
	const formik = useFormik({
		initialValues: USER_DATA,
		validationSchema: ProfileSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	const areAllFieldsUnchanged = React.useMemo(() => {
		return (
			USER_DATA.firstName === formik.values.firstName &&
			USER_DATA.lastName === formik.values.lastName &&
			USER_DATA.email === formik.values.email
		);
	}, [formik.values]);

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
					Profil Güncelleme
				</Typography>

				<TextField
					id="firstName"
					name="firstName"
					label="Ad"
					variant="outlined"
					value={formik.values.firstName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.firstName && Boolean(formik.errors.firstName)}
					helperText={formik.touched.firstName && formik.errors.firstName}
				/>
				<TextField
					id="lastName"
					name="lastName"
					label="Soyad"
					variant="outlined"
					value={formik.values.lastName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.lastName && Boolean(formik.errors.lastName)}
					helperText={formik.touched.lastName && formik.errors.lastName}
				/>
				<TextField
					id="email"
					name="email"
					label="E-Posta Adresi"
					variant="outlined"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<Button color="primary" variant="contained" type="submit" disabled={areAllFieldsUnchanged}>
					Bilgileri Güncelle
				</Button>
			</Box>
		</form>
	);
};

export default EditProfileForm;
