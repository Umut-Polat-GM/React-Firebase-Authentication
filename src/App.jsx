import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

const App = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/" element={user === null ? <Login /> : <Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
