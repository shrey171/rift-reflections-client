import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation, useAppDispatch, setAccessToken } from "store";
import { useSpinner } from "./useSpinner";


interface props {
  type: "login" | "register";
  // setError: UseFormSetError<ILoginData | IRegisterData>;
}

export const useAuth = ({ type }: props) => {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const mutations = { login, register }
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { asyncWrapper } = useSpinner()
  const auth = async (input: any) => {
    const data = await mutations[type](input).unwrap();
    const { session, user } = data
    dispatch(setAccessToken(session.access_token));
    navigate("/", { replace: true });
    return user;
  }
  return asyncWrapper(auth)
};
