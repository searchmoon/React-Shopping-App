import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/form/Form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/user/user.slice";
import { setUserId } from "../../../store/cart/cart.slice";

const SignUp = () => {
    const navigate = useNavigate();
    const [firebaseError, setFirebaseError] = useState("");

    const dispatch = useDispatch();
    const auth = getAuth(app);

    const handleSignup = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(
                    setUser({
                        email: userCredential.user.email,
                        id: userCredential.user.uid,
                        token: userCredential.user.refreshToken,
                    }),
                );
                dispatch(setUserId(userCredential.user.uid));
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
