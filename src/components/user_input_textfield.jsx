import userTextFieldValidation from "../services/userTextfieldValidation";

function userTextfield() {
  function initTextfield(event) {
    event.preventDefault();

    // Send text to be validated.
    const curr_text = document.getElementById("initUserText");
    const raw_text = curr_text.value;

    const raw_text_state = userTextFieldValidation(raw_text);

    console.log(raw_text_state);
    if (raw_text_state.status == true) {
      alert("Success");
      return raw_text_state.message;
    } else if (raw_text_state.status == false) {
      alert("Error");
    }

    console.log(raw_text);
  }
  return (
    <>
      <form onSubmit={initTextfield}>
        <input type="text" id="initUserText"></input>
        <button type="submit">Create new</button>
      </form>
    </>
  );
}

export default userTextfield;
