import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("userName"));
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [belongs, setBelongs] = useState("");
  const [duty, setDuty] = useState("");
  const [client_type, setClient_type] = useState("INSPECTOR");

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const belongsHandler = (e) => {
    setBelongs(e.target.value);
  };
  const dutyHandler = (e) => {
    setDuty(e.target.value);
  };
  const client_typeHandler = (e) => {
    setClient_type(e.target.value);
  };

  const jobSelectList = [
    { id: 0, type: "INSPECTOR", name: "검사관" },
    { id: 1, type: "MANUFACTURER", name: "제조업체" },
  ];

  const checkSignUp = (e) => {
    e.preventDefault();
    fetch("http://34.64.185.37:8080/v2/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        name: name,
        email: email,
        belongs: belongs,
        duty: duty,
        clientType: client_type,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        navigate("/usermain/vessellookup");
        localStorage.setItem("status", result);
        if (result.status === "OK") {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userName");
        }
      });
  };

  return (
    <div className="SignUp">
      <div className="signup_wrapper">
        <div className="signup_text">회원 가입</div>
        <form name="formsignup" action="/usermain">
          이름{" "}
          <input
            type={"text"}
            placeholder={"홍길동"}
            name="name"
            onChange={nameHandler}
          />
          <br />
          이메일{" "}
          <input
            type={"email"}
            placeholder="hong@naver.com"
            name="email"
            onChange={emailHandler}
          />
          <br />
          소속{" "}
          <input
            type={"text"}
            placeholder="행복선박"
            name="belongs"
            onChange={belongsHandler}
          />
          <br />
          직책{" "}
          <input
            type={"text"}
            placeholder="XX검사원"
            name="duty"
            onChange={dutyHandler}
          />
          <br />
          직업 <br />
          <select onChange={client_typeHandler} value={client_type} name="type">
            {jobSelectList.map((item) => (
              <option value={item.type} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <br />
          <button type="submit" onClick={checkSignUp}>
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
