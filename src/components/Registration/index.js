import React from "react";
import axios from "axios";
import st from "./Registration.module.scss";

function Registration({ onClose, goToLogin }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [message, setMessage] = React.useState("");

  const newUser = {
    name: name,
    email: email,
    password: password,
  };

  const onRegistration = async (e, obj) => {
    e.preventDefault();
    try {
      if (password === password2) {
        console.log(obj);
        const answer = await axios.post(
          "http://localhost:8088/registration",
          obj
        );

        if (answer.data) {
          goToLogin();
        } else {
          setMessage("Данный email занят!");
        }
      } else {
        setMessage("Пароли не совпадают! Попробуйте снова!");
        setPassword("");
        setPassword2("");
      }
    } catch (error) {
      alert("Не удалось зарегистрироваться");
    }
  };

  return (
    <div className={st.overlay}>
      <div className={st.registration}>
        <div className={st.head}>
          <h1>Регистрация</h1>
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </div>
        <>
          <form onSubmit={(e)=>onRegistration(e, newUser)}>
            <div className={st.inputFields}>
              <h4>Введите имя</h4>
              <input
                required
                onChange={(obj) => setName(obj.target.value)}
                value={newUser.name}
                placeholder="Иван"
              />
              <h4>Введите Email</h4>
              <input
                required
                onChange={(obj) => setEmail(obj.target.value)}
                value={newUser.email}
                type="email"
                placeholder="Ivanov@mail.ru"
              />
              <h4>Придумайте пароль</h4>
              <input
                minLength={6}
                required
                onChange={(obj) => setPassword(obj.target.value)}
                value={newUser.password}
                type="password"
                placeholder="Your password"
              />
              <h4>Повторите пароль</h4>
              <input
                minLength={6}
                required
                onChange={(obj) => setPassword2(obj.target.value)}
                value={password2}
                type="password"
                placeholder="Repeate your password"
              />
            </div>
            {message && <h6> {message} </h6>}
            <button className={st.registrationButton}>
              Зарегистрироваться
            </button>
          </form>
        </>
      </div>
    </div>
  );
}

export default Registration;
