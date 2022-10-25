import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [belongs, setBelongs] = useState("");
  const [duty, setDuty] = useState("");
  const [client_type, setClient_type] = useState("");

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

  const checkSignUp = (e) => {
    fetch("http://34.64.185.37:8080/v1/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        name: name,
        email: email,
        belongs: belongs,
        duty: duty,
        client_type: client_type,
      }),
      // });
    }).then(navigate("/usermain"));
  };

  return (
    <div className="SignUp">
      <div className="signup_wrapper">
        <h2>회원 가입</h2>
        <form name="formsignup" action="/usermain">
          이름{" "}
          <input
            type={"text"}
            placeholder="홍길동"
            name="name"
            onChange={nameHandler}
          />
          <br />
          이메일{" "}
          <input
            type={"email"}
            placeholder="홍길동@XXX.COM"
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
          직업{" "}
          <input
            type={"text"}
            placeholder="INSPECTOR or MANUFURER"
            name="client_type"
            onChange={client_typeHandler}
          />
          <br />
          <button type="" onClick={checkSignUp}>
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
