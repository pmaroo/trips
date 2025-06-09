"use client";

import React, { useCallback, useState } from "react";

const useInput = (initValue) => {
  const [value, setvalue] = useState(initValue);

  const onChange = useCallback((e) => {
    setvalue(e.target.value);
  }, []);

  return { value, onChange, setvalue };
};

export default useInput;
