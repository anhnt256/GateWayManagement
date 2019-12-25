import antdVi from "antd/lib/locale-provider/vi_VN";
import appLocaleData from "react-intl/locale-data/vi";
import enMessages from "../locales/vi_VN.json";

const ViLang = {
  messages: {
    ...enMessages
  },
  antd: antdVi,
  locale: 'vi-VN',
  data: appLocaleData
};
export default ViLang;
