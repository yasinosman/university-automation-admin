import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AlertPopup from "../../../components/AlertPopup";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/Authentication";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Lütfen geçerli bir e-posta adresi giriniz").required("E-posta adresi boş bırakılamaz"),
	password: Yup.string()
		.min(6, "Şifre en az 6 karakter olmalıdır")
		.max(32, "Şifre en fazla 50 karakter olmalıdır")
		.required("Şifre boş bırakılamaz"),
});

const LoginForm = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const auth = useAuth();

	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			setLoading(true);

			auth.login({ email: values.email, password: values.password })
				.then(() => {
					// Send them back to the page they tried to visit when they were
					// redirected to the login page. Use { replace: true } so we don't create
					// another entry in the history stack for the login page.  This means that
					// when they get to the protected page and click the back button, they
					// won't end up back on the login page, which is also really nice for the
					// user experience.
					navigate(from, { replace: true });
				})
				.catch(setError)
				.finally(() => setLoading(false));
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit(e);
			}}
		>
			<Box sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					fullWidth
					id="email"
					label="E-Posta Adresi"
					name="email"
					autoComplete="email"
					autoFocus
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<TextField
					margin="normal"
					fullWidth
					name="password"
					label="Şifre"
					type="password"
					id="password"
					autoComplete="current-password"
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					Giriş Yap
				</Button>
			</Box>
			<Loading loading={loading} />

			<AlertPopup error={error} handleClose={() => setError(null)} />
		</form>
	);
};

export default LoginForm;
