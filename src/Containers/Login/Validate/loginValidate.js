import * as yup from 'yup';
import { setIn } from 'final-form';

var schema = yup.object().shape({
    email: yup.string().required('Email is required.')
        .email('Email must be in email format.'),
    password: yup.string().min(8, 'Password must be at least 8 characters.')
        .required('Password is required.') 
//   .matches(/[a-zA-Z]/, 'Password can only contain alphabetic characters.')
  
})


// To be passed to React Final Form
const validate = async ( values ) => {
	try {
		await schema.validate( values, { abortEarly: false } );
	} catch ( err ) {
		const errors = err.inner.reduce( ( formError, innerError ) => {
			return setIn( formError, innerError.path, innerError.message );
		}, {} );

		return errors;
	}
};

export default validate;