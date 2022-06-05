import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import AlertPopup from "../../../components/AlertPopup";
import Loading from "../../../components/Loading";
import DataCard from "../../Home/components/DataCard";

const NewsItemSchema = Yup.object().shape({
	title: Yup.string()
		.min(6, "Başlık en az 6 karakter olmalıdır")
		.max(32, "Başlık en fazla 50 karakter olmalıdır")
		.required("Başlık boş bırakılamaz"),
	subtitle: Yup.string()
		.min(6, "Alt başlık en az 6 karakter olmalıdır")
		.max(32, "Alt başlık en fazla 50 karakter olmalıdır")
		.required("Alt başlık boş bırakılamaz"),
	imgURL: Yup.string().url("Lütfen geçerli bir URL giriniz"),
	imgAlt: Yup.string()
		.min(6, "Resim açıklaması en az 6 karakter olmalıdır")
		.max(32, "Resim açıklaması en fazla 50 karakter olmalıdır")
		.required("Resim açıklaması boş bırakılamaz"),
});

const AddNewsForm = () => {
	const dateStr = new Date().toLocaleDateString("tr-TR");

	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const formik = useFormik({
		initialValues: {
			title: "",
			subtitle: "",
			imgURL: "",
			imgAlt: "",
		},
		validationSchema: NewsItemSchema,
		onSubmit: async (values) => {
			setLoading(true);

			try {
				const res = await fetch(`${process.env.REACT_APP_API_URL}/announcements`, {
					method: "post",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
					},
					body: JSON.stringify({
						title: values.title,
						subtitle: values.subtitle,
						content: "Demo içerik",
						imgURL: values.imgURL,
						imgAlt: values.imgAlt,
					}),
				});

				if (!res.ok) {
					setLoading(false);
					setError("Haber eklenirken bir hata oluştu, lütfen daha sonra tekrar deneyin.");
					return;
				}

				formik.resetForm();
			} catch (error) {
				console.log({ error });
				setError("Haber eklenirken bir hata oluştu, lütfen daha sonra tekrar deneyin.");
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<Grid container spacing={5}>
			<Grid item xs={12} md={8}>
				<form onSubmit={formik.handleSubmit}>
					{error && <AlertPopup error={error} handleClose={() => setError(null)} />}
					<Loading loading={loading} />

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							"& .MuiTextField-root": { marginBottom: 2 },
						}}
					>
						<Typography variant="overline" display="block" gutterBottom>
							Haber Detayları
						</Typography>

						<TextField
							id="title"
							name="title"
							label="Başlık"
							variant="outlined"
							type="text"
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
						/>
						<TextField
							id="subtitle"
							name="subtitle"
							label="Alt Başlık"
							variant="outlined"
							type="text"
							value={formik.values.subtitle}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
							helperText={formik.touched.subtitle && formik.errors.subtitle}
						/>
						<TextField
							id="imgURL"
							name="imgURL"
							label="Resim Adresi"
							variant="outlined"
							type="text"
							value={formik.values.imgURL}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.imgURL && Boolean(formik.errors.imgURL)}
							helperText={formik.touched.imgURL && formik.errors.imgURL}
						/>
						<TextField
							id="imgAlt"
							name="imgAlt"
							label="Resim Açıklaması"
							variant="outlined"
							type="text"
							value={formik.values.imgAlt}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.imgAlt && Boolean(formik.errors.imgAlt)}
							helperText={formik.touched.imgAlt && formik.errors.imgAlt}
						/>
						<Button color="primary" variant="contained" type="submit">
							Haberi Kaydet
						</Button>
					</Box>
				</form>
			</Grid>
			<Grid item xs={12} md={4}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						"& .MuiTextField-root": { marginBottom: 2 },
					}}
				>
					<Typography variant="overline" display="block" gutterBottom>
						Önizleme
					</Typography>
					<DataCard
						title={formik.values.title === "" ? "Haber Başlığı" : formik.values.title}
						subtitle={formik.values.subtitle === "" ? "Alt Başlık" : formik.values.subtitle}
						imgAlt={formik.values.imgAlt}
						imgURL={formik.values.imgURL}
						date={dateStr}
					/>
				</Box>
			</Grid>
		</Grid>
	);
};

export default AddNewsForm;
