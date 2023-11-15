'use client';

export default function LabelAndSelectComponent(props: any) {
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
