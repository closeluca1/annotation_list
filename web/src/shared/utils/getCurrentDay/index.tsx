export const getCurrentDateWithOffset = (): string => {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000; // Offset em milissegundos
  const localDate = new Date(today.getTime() - timezoneOffset);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const currentDate = getCurrentDateWithOffset();

export const formatedDate = (() => {
  const [year, month, day] = getCurrentDateWithOffset().split("-");
  return `${day}/${month}/${year}`;
})();
