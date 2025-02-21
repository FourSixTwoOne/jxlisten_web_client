import { dayjs } from "element-plus";

export const dateFormat = (time) => dayjs(time).format("YYYY.MM.DD");

export const timeFormat = (time) => dayjs(time).format("YYYY.MM.DD. HH:mm:ss");
