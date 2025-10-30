import { useState, useCallback } from 'react';

const useCopyToClipboard = (timeout = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
    } catch (err) {
      setIsCopied(false);
      console.error('Failed to copy text:', err);
    }
  }, [timeout]);

  return { isCopied, copy };
};

export default useCopyToClipboard;
