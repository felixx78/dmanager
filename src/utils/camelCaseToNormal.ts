function camelCaseToNormal(string: string) {
  let newString = "";
  for (const char of string) {
    if (char === char.toUpperCase()) newString += " ";
    newString += char;
  }
  return newString.trimStart();
}

export default camelCaseToNormal;
