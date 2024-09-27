import { useState, useEffect, useCallback } from 'react';

const useRecaptchaV3 = (siteKey: string | undefined) => {
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  useEffect(() => {
    if ((window as any).grecaptcha) {
      setIsRecaptchaReady(true);
    } else {
      // console.log("siteKey", siteKey);
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => setIsRecaptchaReady(true);
    }
  }, [siteKey]);

  const executeRecaptcha = useCallback(
    async (action: any) => {
      if (isRecaptchaReady && (window as any).grecaptcha) {
        return await (window as any).grecaptcha.execute(siteKey, { action });
      }
      return null;
    },
    [isRecaptchaReady, siteKey]
  );

  return executeRecaptcha;
};

export default useRecaptchaV3;
