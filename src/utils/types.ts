import React from "react";

export interface FormType<T> {
  values: T,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setValues: React.Dispatch<React.SetStateAction<T>>
}
