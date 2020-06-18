import React, { useState } from "react";
// import Firebase from '../../firebase';

const AddTeamMember = (props) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => setEmail(e.currentTarget.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    if (email === "") {
      setIsError(true);
      setErrorMessage("Please don't leave the field blank.");
    } else if (!email.includes("@") || !email.includes(".")) {
      setIsError(true);
      setErrorMessage("Please format the email address correctly.");
    } else {
      let hasEmail = await checkEmail(e);

      if (hasEmail === false) {
        setIsError(true);
        setErrorMessage("Email does not exist.");
      } else {
        console.log("Success.", email);
        // Firebase.submitEmail(email)
        //     .then(response => {
        //         props.history.push('/emailsent');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
      }
    }
  };

  async function checkEmail(e) {
    e.preventDefault();

    try {
      return await fetch("/api/checkuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          throw new Error(res.statusText);
        })
        .then((response) => {
          if (response === false) {
            setIsError(true);
            setErrorMessage("Email not found.");

            return response;
          } else {
            console.log(response);
            return response.email;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-container">
      <div className="addmember-container">
        <form
          className="form-check-in"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-row">
            <div className="form-input-text">
              <label htmlFor="email">Enter email address:</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email.toString()}
                onChange={(e) => handleInputChange(e)}
                aria-label="Email Address"
                autoComplete="none"
                required="required"
              />
            </div>
          </div>
        </form>

        <div className="addmember-warning">{isError ? errorMessage : null}</div>

        <div className="form-input-button">
          <button onClick={(e) => handleSubmit(e)} className="addmember-button">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMember;
