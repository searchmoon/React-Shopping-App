import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/form/Form";
import app from "../../../firebase";
import { setUser } from "../../../store/user/user.slice";

const SignIn = () => {
    const navigate = useNavigate();
    const [firebaseError, setFirebaseError] = useState("");
    const dispatch = useDispatch();

    const auth = getAuth(app);
    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(
                    setUser({
                        email: userCredential.user.email,
                        id: userCredential.user.uid,
                        token: userCredential.user.refreshToken,
                    }),
                );
                
                navigate("/");
            })
            .catch((error) => {
                return (
                    error &&
                    setFirebaseError(
                        "이메일 또는 비밀번호가 일치하지 않습니다.",
                    )
                );
            });
    };

    return (
        <Form
            title={"로그인"}
            getDataForm={handleLogin}
            firebaseError={firebaseError}
        />
    );
};

export default SignIn;
