import React, {useState} from "react";

interface FormType<T> {
  values: T,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setValues: React.Dispatch<React.SetStateAction<T>>
}

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setValues(prevValues => ({...prevValues, [name]: value}));
  };

  return {values, handleChange, setValues} as FormType<T>;
}
