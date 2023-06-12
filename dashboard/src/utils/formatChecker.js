// do not use for the [id] routes until solution is found.
const formatChecker = (input) => {
  const regex = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  );
  const checked = regex.test(input);
  return checked;
};

export default formatChecker;
