import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/form/Form";
import app from "../../../firebase";

const SignIn = () => {
    const navigate = useNavigate();
    const [firebaseError, setFirebaseError] = useState("");

    const auth = getAuth(app);
    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
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
