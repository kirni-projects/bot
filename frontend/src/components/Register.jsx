import React, { useState, useEffect } from "react";
import axios from "axios";
import { publicIpv4 } from "public-ip";
import ScriptCheck from "./ScriptCheck.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    city: "",
    domainURL: "",
    ipAddress: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [embedScript, setEmbedScript] = useState("");
  const [eid, setEid] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const ip = await publicIpv4();
        setFormData((prevData) => ({ ...prevData, ipAddress: ip }));
      } catch (error) {
        console.error("Failed to fetch IP address", error);
      }
    };
    fetchIpAddress();
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.mobile) tempErrors.mobile = "Mobile number is required";
    if (!formData.companyName)
      tempErrors.companyName = "Company name is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.domainURL) tempErrors.domainURL = "Domain URL is required";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("/api/register", formData);
        setEmbedScript(response.data.script);
        setEid(response.data.eid);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div>
          <label>Name</label>
          <input
            className="input input-bordered input-success pl-4 w-full max-w-xs"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            className="input input-bordered input-success pl-4 w-full max-w-xs"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Mobile</label>
          <input
            className="input input-bordered input-success pl-4 w-full max-w-xs"
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p>{errors.mobile}</p>}
        </div>
        <div>
          <label>Company Name</label>
          <input
            className="input input-bordered input-success pl-4 w-full max-w-xs"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          {errors.companyName && <p>{errors.companyName}</p>}
        </div>
        <div>
          <label>City</label>
          <input
            className="input input-bordered input-success pl-4 w-full max-w-xs"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p>{errors.city}</p>}
        </div>
        <div>
          <label>Domain URL</label>
          <input
            className="input input-bordered input-success pl-4 w-full max-w-xs"
            type="text"
            name="domainURL"
            autoComplete="url"
            value={formData.domainURL}
            onChange={handleChange}
          />
          {errors.domainURL && <p>{errors.domainURL}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            className="input input-bordered input-success pl-4 w-full max-w-xs"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className="btn btn-warning btn-wide mt-6" type="submit">Register</button>
      </form>
      {embedScript && (
        <textarea readOnly value={embedScript} rows={10} cols={50} />
      )}
      {eid && <ScriptCheck eid={eid} />}
    </>
  );
};

export default Register;
