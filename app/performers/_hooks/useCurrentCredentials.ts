import { Auth } from "aws-amplify";
import { ICredentials } from "@aws-amplify/core";
import { useEffect, useState } from "react";

const useCurrentCredentials = () => {
  // State
  const [currentCredentials, setCurrentCredentials] = useState<ICredentials>();

  // Hook on component mount
  useEffect(() => {
    Auth.currentCredentials().then((credentials) => {
      // Set current cedentials
      setCurrentCredentials(credentials);
    });
  }, []);

  return currentCredentials;
};

export default useCurrentCredentials;
