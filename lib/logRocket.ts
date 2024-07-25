import LogRocket from "logrocket";
import { CMS_NAME, EMAIL } from "./constants";

LogRocket.identify(`${process.env.NEXT_PUBLIC_LOG_ROCKET_ID}/mannuelferreiracom`, {
  name: `${CMS_NAME}`,
  email: `${EMAIL}`,
  subscriptionType: "free",
});
