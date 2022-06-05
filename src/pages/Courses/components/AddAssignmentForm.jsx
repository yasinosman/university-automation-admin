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
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import AlertPopup from "../../../components/AlertPopup/AlertPopup";
import Loading from "../../../components/Loading";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const AssignmentSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, "Başlık en az 2 karakter olmalıdır")
		.max(50, "Başlık en fazla 50 karakter olmalıdır")
		.required("Başlık boş bırakılamaz"),
	description: Yup.string()
		.min(2, "Açıklama en az 2 karakter olmalıdır")
		.max(200, "Açıklama en fazla 200 karakter olmalıdır")
		.required("Açıklama boş bırakılamaz"),
	deadline: Yup.date("Deneme").min(tomorrow, "Teslim tarihi en erken yarın olabilir"),
	points: Yup.number()
		.min(1, "Puan en az 1 olmalıdır")
		.max(100, "Puan en fazla 100 olmalıdır")
		.required("Puan boş bırakılamaz"),
	course: Yup.string().required("Ders boş bırakılamaz"),
});

const AddAssignmentForm = ({ courses }) => {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			deadline: tomorrow,
			points: "",
			course: "",
		},
		validationSchema: AssignmentSchema,
		onSubmit: async (values) => {
			setLoading(true);

			try {
				const res = await fetch(`${process.env.REACT_APP_API_URL}/courses/${values.course}/assignments`, {
					method: "post",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
					},
					body: JSON.stringify({
						title: values.title,
						description: values.description,
						points: values.points,
						deadline: values.deadline,
					}),
				});

				if (!res.ok) {
					setLoading(false);
					setError("Ödev eklenirken bir hata oluştu, lütfen daha sonra tekrar deneyin.");
					return;
				}

				formik.resetForm();
			} catch (error) {
				console.log({ error });
				setError("Ödev eklenirken bir hata oluştu, lütfen daha sonra tekrar deneyin.");
			} finally {
				setLoading(false);
			}
		},
	});

	return (
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
					Ödev Detayları
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
							<MenuItem value={course.id}>{course.title}</MenuItem>
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
					Ödev Ekle
				</Button>
			</Box>
		</form>
	);
};

export default AddAssignmentForm;
