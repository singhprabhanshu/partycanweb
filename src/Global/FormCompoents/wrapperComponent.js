import React from 'react';
import { TextField, FormHelperText , Switch, InputLabel } from '@material-ui/core';

const TextInputField = (props) => {

    let { input, label, variant = 'standard', placeholder, autoFocus, type, disabled = false,
     meta: { touched, error, pristine }, custom } = props;
    return (
      <div className="position-relative pb-2">
             <TextField
                type={type}
                style={{width: '300px', color: 'white'}}
                label={label}
                disabled={disabled}
                placeholder={label || placeholder}
                error={touched && error ? true : false}
                autoFocus={autoFocus}
                {...input}
                {...custom}
                variant={variant}
                InputLabelProps={{ shrink: true }}
                className='w-100 text-white'
            />
      <div>{touched && error && <div className="text-input error" style={{display: 'inline-flex'}}><FormHelperText >
                {error}
            </FormHelperText></div>}
      </div>
      </div>
    )
}


const SwitchInputField = (props) => {
  let { input, label, variant = 'standard', placeholder, autoFocus, type, disabled = false,
     meta: { touched, error, pristine }, custom } = props;

  return(<React.Fragment>
    <InputLabel className="label-txt fs-11 mb-0" htmlFor={label}>{label}</InputLabel>
      <Switch
          color="primary"
          id={label}
          {...input}
          checked={input.value ? true : false}
          onChange={(event, value) => input.onChange(value)}
          className="custom-switch"
          
      />
      {touched && error && <React.Fragment>
          <div className="text-input error" style={{display: 'inline-flex', marginTop: '10px',
                  marginLeft: '13px'}}><FormHelperText>
                {error}
            </FormHelperText>
          </div>
        </React.Fragment>
      }
  </React.Fragment>
  )
  
}

export {
    TextInputField,
    SwitchInputField
}