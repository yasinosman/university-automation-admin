import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const courses = [
	"Bilgisayar Mimarisi",
	"Web Programlama",
	"Computer Network and Technologies",
	"Software Engineering",
	"Software Testing and Quality",
	"İş Hukuku",
];

const AnnouncementSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, "Başlık en az 2 karakter olmalıdır")
		.max(50, "Başlık en fazla 50 karakter olmalıdır")
		.required("Başlık boş bırakılamaz"),
	content: Yup.string()
		.min(2, "Açıklama en az 2 karakter olmalıdır")
		.max(200, "Açıklama en fazla 200 karakter olmalıdır")
		.required("Açıklama boş bırakılamaz"),
	course: Yup.string().oneOf(courses, "Ders seçimi yanlış").required("Ders boş bırakılamaz"),
});

const AddAnnouncementForm = () => {
	const formik = useFormik({
		initialValues: {
			title: "",
			content: "",
			course: "",
		},
		validationSchema: AnnouncementSchema,
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
					Duyuru Detayları
				</Typography>

				<FormControl>
					<InputLabel id="demo-simple-select-helper-label">Ders</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						label="Ders"
						value={formik.values.course}
						onChange={(e) => {
							formik.setFieldValue("course", e.target.value);
						}}
						error={formik.touched.course && Boolean(formik.errors.course)}
						helperText={formik.touched.course && formik.errors.course}
						sx={{ mb: 2 }}
					>
						{courses.map((course) => (
							<MenuItem value={course}>{course}</MenuItem>
						))}
					</Select>
					{formik.touched.course && formik.errors.course && (
						<FormHelperText sx={{ mb: 2, mt: -1.5 }} error>
							{formik.errors.course}
						</FormHelperText>
					)}
				</FormControl>
				<TextField
					id="title"
					name="title"
					label="Duyuru Başlığı"
					variant="outlined"
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
				/>
				<TextField
					id="content"
					name="content"
					label="Açıklama"
					variant="outlined"
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.content && Boolean(formik.errors.content)}
					helperText={formik.touched.content && formik.errors.content}
				/>

				<Button color="primary" variant="contained" type="submit">
					Duyuru Ekle
				</Button>
			</Box>
		</form>
	);
};

export default AddAnnouncementForm;
