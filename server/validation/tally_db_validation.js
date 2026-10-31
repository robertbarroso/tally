/*
id Validation

Param:              id (Integer);
Obj:
To ensure that the value coming in is a valid integer number.
Since we cannot know how many the user will make, we just have to make sure it is greater than -1
*/
function idValidation(id) {
  return Number.isInteger(id) && id > 0;
}

export default idValidation;
