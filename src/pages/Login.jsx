import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Link,
    Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { AccountCircle } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../firebase";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

const schema = yup.object({
    email: yup.string().email("Email formatı uygun değil").required("Email gereklidir"),
    password: yup.string().min(6).required("Şifre gereklidir"),
});

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            setProgress(true);

            const user = await loginUser(data);

            if (user) {
                dispatch(login(user));
                toast.success("Giriş başarılı");
                navigate("/");
            }
            setProgress(false);
        } catch (error) {
            setProgress(false);
            toast.error("error:", error.message);
        }
    };

    const EndAdorment = ({ visible, setVisible }) => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisible(!visible)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {visible ? <VisibilityIcon color="secondary" /> : <VisibilityOffIcon />}
                </IconButton>
            </InputAdornment>
        );
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
                    Giriş Formu
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="email"
                        name="email"
                        label="Email Adresi"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        color="secondary"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle color="secondary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="password"
                        name="password"
                        label="Şifre"
                        type={visible ? "text" : "password"}
                        autoComplete="current-password"
                        color="secondary"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        InputProps={{
                            endAdornment: <EndAdorment visible={visible} setVisible={setVisible} />,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HttpsIcon color="secondary" />
                                </InputAdornment>
                            ),
                        }}
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
                        Giriş Yap
                    </Button>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Link href="/register" variant="body2">
                            {"Hesap Oluştur"}
                        </Link>

                        <Link href="/addStudent" variant="body2">
                            {"Yeni Öğrenci Kayıt"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;

Register.propTypes = {
    visible: propTypes.bool,
    setVisible: propTypes.func,
};
