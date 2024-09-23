import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import CookieConsentBanner from "./consent-cookie-banner";

export function ConsentForm({ color }: { color: string }) {
  const [decisionMade, setDecisionMade] = useState(true);
  const cookies = useMemo(() => new Cookies(), []);

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  const sendConsent = useCallback((consent) => {
    gtag("consent", "default", consent);
  }, []);

  useEffect(() => {
    if (cookies.get("cookies_consent") !== undefined) {
      setDecisionMade(true);
    } else {
      setDecisionMade(false);
    }
  }, [cookies, setDecisionMade, sendConsent]);

  const handleDecision = (outcome) => {
    const consent = {
      "ad_storage": outcome,
      "analytics_storage": outcome,
      "ad_user_data": outcome,
      "ad_personalization": outcome,
    };

    cookies.set("COOKIE_NAME", consent, {
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      path: "/",
      domain: ".mannuelferreira.com",
    });

    sendConsent(consent);
    setDecisionMade(true);
  };

  return (
    decisionMade ? <></> : (
      <CookieConsentBanner
        color={color}
        header="Consent Header"
        message="Consent message"
        acceptText="Yes"
        denyText="No"
        onAccept={() => {
          handleDecision("granted");
        }}
        onDeny={() => {
          handleDecision("denied");
        }}
      />
    )
  );
}
