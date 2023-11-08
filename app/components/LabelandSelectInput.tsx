'use client';

import { useEffect, useState } from 'react';

export default function LabelAndSelectComponent(props: any) {
  const [optionlistValue, setOptionlistValue] = useState([]);

  useEffect(() => {
    async function getOptionList() {
      const response = await props.optionlist;
      setOptionlistValue(response);
    }
    getOptionList().catch((error) => {
      console.log(error);
    });
  }, [props.optionlist]);

  const optionlist: Array<any> = props.optionarray;
  return (
    <div className={`sm:col-span-${props.colSpan}`}>
      <label htmlFor={props.inputName} className="label-custom-primary">
        {props.labeltext}{' '}
        {props.required === true ? <span id="required">*</span> : ''}
      </label>
      <div className="mt-2">
        <select
          name={props.inputName}
          required={props.required}
          onChange={(event) =>
            props.onChangeFunction(event.currentTarget.value)
          }
          className="input-select-custom-primary"
        >
          {props.children}
        </select>
      </div>
    </div>
  );
}
