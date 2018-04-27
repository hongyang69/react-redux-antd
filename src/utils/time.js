import moment from "moment";

export const dateTimeFormat = "HH:mm DD/MM/YYYY";

export const instanceToDate = instance => {
  if (instance && instance.epochSecond) {
    return moment.unix(instance.epochSecond).format(dateTimeFormat);
  }
  return "";
};

export const utcToFormatDate = str => {
  if (str) {
    return moment.utc(str).format(dateTimeFormat);
  }
  return "";
};