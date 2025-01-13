import { dayjs } from "element-plus";

export const dateFormat = (time) => dayjs(time).format("YYYY年-MM月-DD日");
