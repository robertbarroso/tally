/*
userInputField

Obj:
    Take in user input from the text field and validate it. Return it to
    caller with following message:

    {
    status: true,
    message: <input>
    }

    Otherwise,
    {
    status: false
    message: <error_message>
    }

*/

function userTextFieldValidation(raw_text) {
  if (typeof raw_text !== "string") {
    return { status: false, message: "Input must be text" };
  }

  raw_text = raw_text.replace(/\s+$/, "");

  // If raw_text is empty
  if (raw_text === "") {
    return { status: false, message: "Input cannot be empty" };
  }

  // If raw_text is more than 32 characters
  if (raw_text.length > 32) {
    return { status: false, message: "Input must be 32 characters or fewer" };
  }

  // If raw_text is less than 3 characters
  if (raw_text.length < 3) {
    return { status: false, message: "Input must be at least 3 characters" };
  }

  // if raw_text is only numbers
  if (/^\d+$/.test(raw_text)) {
    return { status: false, message: "Input cannot contain only numbers" };
  }

  // if raw_text is special characters or control characters
  if (/^[^\p{L}\p{N}\s]+$/u.test(raw_text) || /\p{Cc}/u.test(raw_text)) {
    return {
      status: false,
      message:
        "Input cannot contain only special characters or control characters",
    };
  }

  // if raw_text is only blanks
  if (/^\s+$/.test(raw_text)) {
    return { status: false, message: "Input cannot contain only blanks" };
  }

  // if raw_text starts and ends with blanks
  if (raw_text !== raw_text.trim()) {
    return {
      status: false,
      message: "Input cannot start or end with blank spaces",
    };
  }

  return { status: true, message: raw_text };
}

export default userTextFieldValidation;
