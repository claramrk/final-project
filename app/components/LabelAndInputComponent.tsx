'use client';

export default function LabelAndInputComponent(props: any) {
  return (
    <div className={`sm:col-span-${props.colSpan}`}>
      <label htmlFor={props.inputName} className="label-custom-primary">
        {props.labeltext}{' '}
        {props.required === true ? <span id="required">*</span> : ''}
      </label>
      <div className="mt-2">
        <div className="input-text-frame-custom-primary">
          <input
            type={props.type}
            name={props.inputName}
            required={props.required}
            defaultValue={props.defaultValue}
            min={props.min}
            placeholder={props.placeholder}
            onChange={(event) =>
              props.onChangeFunction(event.currentTarget.value)
            }
            className="input-text-custom-primary"
          />
        </div>
      </div>
    </div>
  );
}
