export default function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getUTCMonth() + 1}`;
  let day = `${d.getUTCDate()}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [day, month].join('/');
}
