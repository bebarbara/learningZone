// Ref: https://gist.github.com/muZk/e11931b3df6aab7c7dd6dd53058c3e41
export const redirectToMercadoPago = (preferenceId) => {
  const loadScript = (url, callback) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  const handleScriptLoad = () => {
    const mp = new window.MercadoPago('TEST-7daa23ec-f158-4325-a967-1fa621263bad', {
      locale: 'es-AR'
    });
    mp.checkout({
      preference: {
        id: preferenceId
      },
      autoOpen: true
    });
  };

  loadScript('https://sdk.mercadopago.com/js/v2', handleScriptLoad);
};
