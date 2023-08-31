import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styles from "./Form.module.scss";

type FormProps = {
    title: string;
    getDataForm: (email: string, password: string) => void;
    firebaseError: string;
};
//getDataForm 함수가 return 하는게 없어서 => void 해주었다.

type Inputs = {
    email: string;
    password: string;
};

const Form: FC<FormProps> = ({ title, getDataForm, firebaseError }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        mode: "onChange",
    });

    const onSubmitForm: SubmitHandler<FieldValues> = ({ email, password }) => {
        getDataForm(email, password);
        reset();
    };
    //onSubmitForm 에 react-hook-form 에서 제공해주는 SubmitHandler를 사용해주고, FieldValues를 사용해준다.

    const userEmail = {
        required: "필수 필드입니다.",
    };

    const userPassword = {
        required: "필수 필드입니다.",
        minLength: {
            value: 6,
            message: "최소 6자입니다.",
        },
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
            <div>
                <input
                    type="email"
                    placeholder="E-mail"
                    {...register("email", userEmail)}
                />
                {errors?.email && (
                    <div>
                        <span className={styles.form_error}>
                            {errors.email.message}
                        </span>
                    </div>
                )}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", userPassword)}
                />
                {errors?.password && (
                    <div>
                        <span className={styles.form_error}>
                            {errors.password.message}
                        </span>
                    </div>
                )}
            </div>
            <button type="submit">{title}</button>
            {firebaseError && (
                <span className={styles.form_error}>{firebaseError}</span>
            )}
        </form>
    );
};

export default Form;
