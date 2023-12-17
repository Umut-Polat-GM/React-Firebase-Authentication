import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Paper,
    Link,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import propTypes from "prop-types";
import { addNewStudent } from "../firebase";
import toast from "react-hot-toast";
import { uid } from "uid";

const schema = yup.object({
    tc: yup.number().required("TC Kimlik Numarası gereklidir"),
    name: yup.string().required("Ad gereklidir"),
    surname: yup.string().required("Soyad gereklidir"),
    fatherName: yup.string().required("Baba Adı gereklidir"),
});

const AddStudent = () => {
    const [progress, setProgress] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            setProgress(true);

            await addNewStudent({ ...data, id: uid() });

            setProgress(false);
            reset();

            toast.success("Yeni Kayıt Başarılı");
        } catch (error) {
            setProgress(false);
            toast.error("error:", error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px",
                }}
                elevation={6}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Öğrenci Ön Kayıt
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="tc"
                        name="tc"
                        label="TC Kimlik Numarası"
                        type="number"
                        autoComplete="tc"
                        autoFocus
                        color="secondary"
                        {...register("tc")}
                        error={!!errors.tc}
                        helperText={errors?.tc?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="name"
                        name="name"
                        label="Ad"
                        type="text"
                        autoComplete="name"
                        color="secondary"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="surname"
                        name="surname"
                        label="Soyad"
                        type="text"
                        autoComplete="surname"
                        color="secondary"
                        {...register("surname")}
                        error={!!errors.surname}
                        helperText={errors?.surname?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="fatherName"
                        name="fatherName"
                        label="Baba Adı"
                        type="text"
                        autoComplete="fatherName"
                        color="secondary"
                        {...register("fatherName")}
                        error={!!errors.fatherName}
                        helperText={errors?.fatherName?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="secondary"
                        startIcon={
                            progress ? (
                                <CircularProgress color="inherit" size={"16px"} />
                            ) : (
                                <LoginIcon />
                            )
                        }
                    >
                        Yeni Kayıt
                    </Button>
                    <Link href="/login" variant="body2">
                        {"Giriş Sayfasına Dön"}
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddStudent;

AddStudent.propTypes = {
    visible: propTypes.bool,
    setVisible: propTypes.func,
};
