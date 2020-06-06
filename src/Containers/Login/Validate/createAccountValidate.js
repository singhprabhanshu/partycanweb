import * as yup from 'yup';
import { setIn } from 'final-form';

var schema = yup.object().shape({
    first_name: yup.string().required('First Name is required.'),
    last_name: yup.string().required('Last Name is required.'),
    email: yup.string().required('Email is required.')
        .email('must be in email format'),
    password: yup.string().required('Password is required.') 
        .min(8, 'Password is too short - should be 8 chars minimum.'),
        // .matches(/[a-zA-Z]/, 'Password can only contain alphabetic characters.'),
    confirm_password: yup.string().required('Password is required.')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    overAge: yup.bool().required('Please confirm you are over 21 to enter the site.')
        .oneOf([true], "Please confirm you are over 21 to enter the site."),
    captcha: yup.string().required('Please Verify Captcha')
});



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