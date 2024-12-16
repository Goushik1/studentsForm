import { useRef, useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
function App() {
  const formRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [error, setError] = useState({ email: "", phNo: "" });
  const [details, setDetails] = useState({
    name: "",
    dob: "",
    email: "",
    phNo: "",
    gender: "",
  });
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const numPattern = /^[0-9]{10}$/;

  const handleDetails = (e) => {
    const { name, value } = e.target;
    if (name == "email" && value.length > 0) {
      if (!emailPattern.test(value)) {
        setError({ ...error, email: "Enter a valid email" });
      } else {
        setError({ ...error, email: "" });
      }
    }
    if (name == "phNo" && value.length > 0) {
      if (!numPattern.test(value)) {
        setError({ ...error, phNo: "Enter a valid number" });
      } else {
        setError({ ...error, phNo: "" });
      }
    }
    setDetails({ ...details, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      if (!res.ok) {
        const err = await res.json();
        setError({ ...error, email: err.errorEmail });
        console.log(err.error);
        return;
      }
      setDetails({
        name: "",
        dob: "",
        email: "",
        phNo: "",
        gender: "",
      });
      if (formRef.current.checkValidity()) {
        navigate("/submit");
      } else {
        formRef.current.reportValidity();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = (e) => {
    setDetails({
      name: "",
      dob: "",
      email: "",
      phNo: "",
      gender: "",
    });
    formRef.current.reset();
  };

  return (
    <div className="container">
      <div className="whiteBox">
        <h2>Student details</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            placeholder="Enter Name"
            type="text"
            name="name"
            value={details.name}
            onChange={handleDetails}
            required
          />
          <label htmlFor="dob">DOB</label>
          <input
            type="date"
            name="dob"
            onChange={handleDetails}
            max={today}
            required
          />
          <label>ID</label>
          <input name="empID" type="text" maxLength={10} />
          <label>Email</label>
          <input
            placeholder="email"
            name="email"
            value={details.email}
            onChange={handleDetails}
            required
          />

          <p
            style={{
              textAlign: "left",
              margin: 0,
              font: "caption",
              fontSize: 10,
            }}
          >
            {error.email}
          </p>
          <label>Ph No</label>
          <input
            placeholder="phone no"
            type="tel"
            pattern="[0-9]{10}"
            name="phNo"
            value={details.phNo}
            onChange={handleDetails}
            required
          />
          <p
            style={{
              textAlign: "left",
              margin: 0,
              font: "caption",
              fontSize: 10,
            }}
          >
            {error.phNo}
          </p>
          <label>Gender</label>
          <select onChange={handleDetails} name="gender" required>
            <option value="" disabled>
              --select an option--
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <nav>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </nav>
        </form>
      </div>
    </div>
  );
}

export default App;
