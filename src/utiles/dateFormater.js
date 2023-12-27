const dateFormater = () => {
  const currentDateTime = new Date();
  const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(currentDateTime);
  return formattedDateTime;
};

export default dateFormater;
