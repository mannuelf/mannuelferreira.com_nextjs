import { CMS_NAME, EMAIL } from "@shared/constants";
import LogRocket from "logrocket";

LogRocket.identify(`${process.env.NEXT_PUBLIC_LOG_ROCKET_ID}/mannuelferreiracom`, {
  name: `${CMS_NAME}`,
  email: `${EMAIL}`,
  subscriptionType: "free",
});
