import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context";

function Login() {
  const { user, setUser, setCartItems } = React.useContext(AppContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const Navigate = useNavigate();

  const onLogIn = async (obj) => {
    try {
      axios.post("http://localhost:8088/login", obj).then(
        (res) => {
            if(res.data==="")
            {
                setMessage("Invalid login or password");
            }
            else{
                if(!res.data.active){
                  setMessage("Ваша учётная запись заблокирована. Чтобы узнать причину, свяжитесь с администратором.")
                  onLogOut();
                }
                else{
                  setUser(res.data);
                  console.log("Всё гуд", res.data);
                  localStorage.setItem("user", JSON.stringify(res.data));
                  setMessage("Вы успешно вошли");
                  Navigate("/");
                }
            }
        },
        () => {
          console.log("Норм распознало ошибку");
          setMessage("Invalid login or password");
        }
      );
    } catch (error) {
      alert("Не удалось войти");
    }
  };

  const onLogOut = () => {
    setUser({ id: 0, email: "", name: "", role: "USER_ROLE", active: true });
    //setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 0,
        email: "",
        name: "",
        role: "USER_ROLE",
        active: true,
      })
    );
  };

  return (
    <div className="content p-40">
      <h1>
        {user.id} {user.email} {user.role}
      </h1>
      {JSON.parse(localStorage.getItem("user")).id ? (
        <h1 className="cu-p" onClick={onLogOut}>
          Выйти
        </h1>
      ) : (
        <>
        <form onSubmit={() => onLogIn({ email, password })}>
          <h1> Войдите в аккаунт</h1>
          <div>
            <input
              required
              onChange={(obj) => setEmail(obj.target.value)}
              value={email}
              type="email"
              placeholder="Ivanov@mail.ru"
            />
            <p></p>
            <input
              minLength={6}
              required
              onChange={(obj) => setPassword(obj.target.value)}
              value={password}
              type="password"
              placeholder="Your password"
            />
          </div>
          <p></p>
          <input type="submit" value="Войти"/>
          <h1>{message && message}</h1>
        </form>
        <h5>Ещё не зарегистрированы?</h5>
         <Link to="/registration">
         <h3> Зарегистрироваться</h3>
       </Link>
       </>
      )}
    </div>
  );
}

export default Login;
