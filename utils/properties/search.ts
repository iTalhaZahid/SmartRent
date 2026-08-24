export function searchValue(input: string | string[] | undefined) {
  return typeof input === "string" ? input : "";
}

export function positiveSearchNumber(input: string | string[] | undefined) {
  const number = Number(searchValue(input));
  return Number.isFinite(number) && number > 0 ? number : 0;
}

export function searchDate(input: string | string[] | undefined) {
  const date = searchValue(input);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T00:00:00Z`)) ? date : "";
}
