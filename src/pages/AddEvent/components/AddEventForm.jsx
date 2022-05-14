import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import DataCard from "../../Home/components/DataCard";

const EventSchema = Yup.object().shape({
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

const AddEventForm = () => {
	const dateStr = new Date().toLocaleDateString("tr-TR");

	const formik = useFormik({
		initialValues: {
			title: "",
			subtitle: "",
			imgURL: "",
			imgAlt: "",
		},
		validationSchema: EventSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Grid container spacing={5}>
			<Grid item xs={12} md={8}>
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
							Etkinlik Detayları
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
						title={formik.values.title === "" ? "Etkinlik Başlığı" : formik.values.title}
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

export default AddEventForm;
