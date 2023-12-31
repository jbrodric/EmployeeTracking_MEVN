import backend from "./backend";

export function formatDateUI(data) {
  let ret = new Date(data).toLocaleDateString("en-us", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return ret === "Invalid Date" ? "" : ret;
}

export function formatCurrencyUI(data) {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return data ? formatter.format(data) : "";
}

export function formatNumberUI(data) {
  return data ? data.toLocaleString("en-US") : "";
}

export function parseCurrencyUI(data) {
  const regex = /,|\$/gi;
  return data.replaceAll(regex, "");
}

export function parseUIData(data, metadata) {
  for (let section of metadata.sections) {
    for (let field of section.fields) {
      if (field.type === "currency")
        data[field.name] = parseCurrencyUI(data[field.name]);
      else if (field.type === "checkbox")
        data[field.name] = data[field.name] === "on" ? true : false;
      else if (field.type === "number")
        data[field.name] = parseCurrencyUI(data[field.name]);
    }
  }
  return data;
}

export function getCurrency(data) {
  return backend.RecordAPI.getCurrency(data);
}
