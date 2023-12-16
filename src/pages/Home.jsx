import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import { logoutUser } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    // console.log(user);
    const handleClose = async () => {
        const loguot = await logoutUser();
        if (loguot) {
            navigate("/login");
        }
    };
    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        {user?.email}
                    </Typography>
                    <Button
                        color="inherit"
                        sx={{
                            marginLeft: "auto",
                        }}
                        onClick={handleClose}
                    >
                        Çıkış Yap
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Home;
