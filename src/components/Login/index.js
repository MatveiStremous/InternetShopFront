import React from "react";
import axios from "axios";
import AppContext from "../../context";
import st from "./Login.module.scss";

function Login({ onClose, onRegistration }) {
  const {user, setUser } = React.useContext(AppContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onLogIn = async (e, obj) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8088/login", obj).then(
        (res) => {
          if (res.data === "") {
            setMessage("Неверно введён логин или пароль.");
          } else {
            if (!res.data.active) {
              setMessage(
                "Ваша учётная запись заблокирована. Свяжитесь с администратором, чтобы узнать причину."
              );
              onLogOut();
            } else {
              setUser(res.data);
              localStorage.setItem("user", JSON.stringify(res.data));
              onClose();
              window.location.reload();
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
    onClose();
    window.location.reload();
  };

  return (
    <div className={st.overlay}>
      <div className={st.login}>
        {JSON.parse(localStorage.getItem("user")).id ? (
          <>
            <div className={st.head2}>
              <h1>Личный кабинет</h1>
              <img
                onClick={onClose}
                className="removeBtn cu-p"
                src="/img/btn-remove.svg"
                alt="Close"
              />
            </div>
            <div className={st.userInfo}>
              <h4>Имя</h4>
              <h5>{user.name}</h5>
            </div>
            <div className={st.userInfo}>
              <h4>Email</h4>
              <h5>{user.email}</h5>
            </div>
            <div className={st.userInfo}>
              <h4>Роль</h4>
              <h5>{user.role}</h5>
            </div>
            <button className={st.logoutButton} onClick={onLogOut}>Выйти из аккаунта</button>
          </>
        ) : (
          <>
            <div className={st.head}>
              <h1>Вход</h1>
              <img
                onClick={onClose}
                className="removeBtn cu-p"
                src="/img/btn-remove.svg"
                alt="Close"
              />
            </div>
            <form onSubmit={(e) => onLogIn(e, { email, password })}>
              <div className={st.inputFields}>
                <h4>Введите Email</h4>
                <input
                  required
                  onChange={(obj) => setEmail(obj.target.value)}
                  value={email}
                  type="email"
                  placeholder="Ivanov@mail.ru"
                />
                <h4>Введите пароль</h4>
                <input
                  minLength={6}
                  required
                  onChange={(obj) => setPassword(obj.target.value)}
                  value={password}
                  type="password"
                  placeholder="Your password"
                />
              </div>
              {message && <h6> {message} </h6>}
              <button className={st.loginButton}>Войти в аккаунт</button>
            </form>

            <h5>Ещё не зарегистрированы?</h5>

            <button className={st.registrationButton} onClick={onRegistration}>
              Зарегистрироваться
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
