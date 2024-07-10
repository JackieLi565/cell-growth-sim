import { useEffect, useState } from "react";

/**
 * A React hook for accessing URL query parameters
 * @returns - A React hook based on the URL query parameters
 */
export const useUrlParams = () => {
  const [params, setParams] = useState(
    new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    const handleUrlChange = () => {
      setParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handleUrlChange);
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleUrlChange();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      handleUrlChange();
    };

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(key, value);
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    setParams(newParams);
  };

  return { params, setParam };
};
