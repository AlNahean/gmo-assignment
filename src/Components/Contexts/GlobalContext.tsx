import React, { useContext, useState, useEffect } from "react";
type userInfoProps = {
  name: String;
  email: String;
  phoneNumber: Number | String;
};

type globalContextType = {
  test: String | null;
  setTest: (value: string) => void;
  userInfo: userInfoProps;
  setUserInfo: (value: userInfoProps) => void;
  isInfoCollected: Boolean | null;
  setIsInfoCollected: (value: boolean) => void;
};

type GlobalContextProviderPropTypes = {
  children: React.ReactNode;
};

const GlobalCoontext = React.createContext<globalContextType>(
  {} as globalContextType
);

const GlobalContextProvider = ({
  children,
}: GlobalContextProviderPropTypes) => {
  const [test, setTest] = useState<String>("Test Text Text");
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [isInfoCollected, setIsInfoCollected] = useState<boolean | null>(null);
  const getLocalStorageData = async () => {
    let cachedDataString = localStorage.getItem("userdata");

    if (Boolean(cachedDataString)) {
      let parsedCachedData = JSON.parse(
        cachedDataString ? cachedDataString : ""
      );

      console.log(parsedCachedData, "aaa");
      setUserInfo({ ...parsedCachedData });

      setIsInfoCollected(true);
      // alert("Test Text Text");
    } else {
      setIsInfoCollected(false);
    }
  };
  useEffect(() => {
    getLocalStorageData();
    return () => {};
  }, []);

  return (
    <GlobalCoontext.Provider
      value={{
        test,
        setTest,
        userInfo,
        setUserInfo,
        isInfoCollected,
        setIsInfoCollected,
      }}
    >
      {children}
    </GlobalCoontext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(GlobalCoontext);
};
export { useGlobalContext, GlobalContextProvider };
