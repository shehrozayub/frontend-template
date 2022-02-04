export const getErrorDetailsforNotif = (response) => {
  if (response.detail) {
    return response.detail;
  } else {
    const breakdown = Object.entries(response);
    let stringtoreturn = "";

    breakdown.forEach((entry) => {
      stringtoreturn += entry[0] + ": " + entry[1];
      stringtoreturn += "\n\n";
    });

    return stringtoreturn;
  }
};
