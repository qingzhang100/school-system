import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import styles from "../../components/Form/Form.module.css";
import Container from "../../ui/Layout/Container";

function NewUser({ type = "User", isEdit = true }) {
  const [inputData, setInputData] = useState({
    UserRole: "Select",
    UserName: "",
    Password: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    PhoneNumber: "",
    HomeAddress: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit() {}

  function handleCancel(e) {
    e.preventDefault();
    setInputData(() => ({
      UserRole: "Select",
      UserName: "",
      Password: "",
      FirstName: "",
      LastName: "",
      DateOfBirth: "",
      PhoneNumber: "",
      HomeAddress: "",
    }));
  }

  return (
    <Container title={`Create ${type}`} headingType="primaryHeading">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow} style={{ width: "10vw" }}>
          <div className={styles.formItem}>
            <label htmlFor="UserRole" className={styles.formLabel}>
              {type} Role
            </label>
            <select
              name="UserRole"
              value={inputData.UserRole}
              onChange={handleChange}
              className={styles.formInput}
              disabled={false}
              required
            >
              <option value="Select" disabled>
                Select
              </option>
              <option value="Admin">Admin</option>
              <option value="Advisor">Advisor</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="UserName" className={styles.formLabel}>
              User Name
            </label>
            <input
              type="text"
              name="UserName"
              value={inputData.UserName}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="Password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="text"
              name="Password"
              value={inputData.Password}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="FirstName" className={styles.formLabel}>
              FirstName
            </label>
            <input
              type="text"
              name="FirstName"
              value={inputData.FirstName}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="LastName" className={styles.formLabel}>
              Last Name
            </label>
            <input
              type="text"
              name="LastName"
              value={inputData.LastName}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="DateOfBirth" className={styles.formLabel}>
              Date Of Birth
            </label>
            <input
              type="date"
              name="DateOfBirth"
              value={inputData.DateOfBirth}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="PhoneNumber" className={styles.formLabel}>
              Phone Number
            </label>
            <input
              type="text"
              name="PhoneNumber"
              value={inputData.PhoneNumber}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="HomeAddress" className={styles.formLabel}>
              Home Address
            </label>
            <input
              type="text"
              name="HomeAddress"
              value={inputData.HomeAddress}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <Button classType="submit">Create</Button>
          <Button classType="cancel" onClickBtn={handleCancel}>
            Clear
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default NewUser;
