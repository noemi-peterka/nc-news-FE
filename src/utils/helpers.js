// create a date handler
// new Date(date).toLocaleDateString("en-GB")
// and then 24/06/2020
// will be 24th of June 2020
export default function normalizeSlug(input) {
  return input.trim().toLowerCase().replace(/\s+/g, "-");
}
