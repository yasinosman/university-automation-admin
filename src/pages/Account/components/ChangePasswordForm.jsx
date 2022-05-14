import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
	currentPassword: Yup.string()
		.min(6, "Mevcut şifre en az 6 karakter olmalıdır")
		.max(32, "Mevcut şifre en fazla 50 karakter olmalıdır")
		.required("şifre boş bırakılamaz"),
	newPassword: Yup.string()
		.min(6, "Yeni şifre en az 6 karakter olmalıdır.")
		.max(32, "Yeni şifre en fazla 50 karakter olmalıdır")
		.required("Yeni şifre boş bırakılamaz"),
	confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Şifrelar eşleşmiyor"),
});

const ChangePasswordForm = () => {
	const formik = useFormik({
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
		validationSchema: PasswordSchema,
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
					Şifre Güncelleme
				</Typography>

				<TextField
					id="currentPassword"
					name="currentPassword"
					label="Mevcut Şifre"
					variant="outlined"
					type="password"
					value={formik.values.currentPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
					helperText={formik.touched.currentPassword && formik.errors.currentPassword}
				/>
				<TextField
					id="newPassword"
					name="newPassword"
					label="Yeni Şifre"
					type="password"
					variant="outlined"
					value={formik.values.newPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
					helperText={formik.touched.newPassword && formik.errors.newPassword}
				/>
				<TextField
					id="confirmNewPassword"
					name="confirmNewPassword"
					label="Yeni Şifre Onayı"
					type="password"
					variant="outlined"
					value={formik.values.confirmNewPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
					helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
				/>
				<Button color="primary" variant="contained" type="submit">
					Şifreyi Güncelle
				</Button>
			</Box>
		</form>
	);
};

export default ChangePasswordForm;
