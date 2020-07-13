import  { useEffect } from 'react';

const AddScript = customScript => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = customScript;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }

  }, [customScript]);
};

export default AddScript;
