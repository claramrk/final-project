'use client';

export default function LabelAndInputComponent(props: any) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <label htmlFor={props.inputName} className="label-custom-primary">
          {props.labeltext}{' '}
          {props.required === true ? <span id="required">*</span> : ''}
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type={props.type}
              name={props.inputName}
              required={props.required}
              placeholder={props.placeholder}
              onChange={(event) =>
                props.onChangeFunction(event.currentTarget.value)
              }
              className="input-text-custom-primary "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
