import { useEffect } from "react";

const useRemoveWebuzo = () => {
  useEffect(() => {
    const removeWebuzoImages = () => {
      document.querySelectorAll('img[src*="softaculous.com/images/webuzo.gif"]').forEach(img => img.remove());
      document.querySelectorAll('a[href*="webuzo.com"]').forEach(a => {
        if (a.querySelector('img[src*="softaculous.com/images/webuzo.gif"]')) {
          a.remove();
        }
      });
    };

    removeWebuzoImages();

    const interval = setInterval(removeWebuzoImages, 500);

    return () => clearInterval(interval); 
  }, []);
};

export default useRemoveWebuzo;
