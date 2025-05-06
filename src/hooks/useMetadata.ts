import { useEffect } from "react";

const useMetadata = (title: string): void => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `گجت لند - ${title}`;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

export default useMetadata;
