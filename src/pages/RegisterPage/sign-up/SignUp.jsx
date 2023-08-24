import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/form/Form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../firebase";

const SignUp = () => {
    const navigate = useNavigate();
    const [firebaseError, setFirebaseError] = useState("");

    const auth = getAuth(app);

    const handleSignup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                // 리덕스 스토어에 담는 로직

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
            title={"가입하기"}
            getDataForm={handleSignup}
            firebaseError={firebaseError}
        />
    );
};

export default SignUp;
