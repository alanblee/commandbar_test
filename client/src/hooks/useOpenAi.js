import { useCallback, useState } from "react";
import { httpPostPrompt } from "./requests";

const useOpenAi = () => {
  const [generatingImg, setGeneratingImg] = useState(false);

  const submitPrompt = useCallback(async (formPrompt) => {
    setGeneratingImg(true);

    try {
      return await httpPostPrompt(formPrompt);
    } catch (err) {
      alert(err);
    } finally {
      setGeneratingImg(false);
    }
  }, []);

  return {
    generatingImg,
    submitPrompt,
  };
};

export default useOpenAi;
