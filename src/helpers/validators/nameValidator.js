export function nameValidator(name) {
  if (!name) return "Name can't be empty.";
  if (name.length <= 2) return "Min 2 Chars";
  return "";
}
