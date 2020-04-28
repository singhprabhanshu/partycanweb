import * as yup from 'yup';
import { setIn } from 'final-form';

var schema = yup.object().shape({
	// name: yup.string().required('Name is required.'),
	name: yup.string().required('name is required.'),
    address: yup.string().required('Address is required.'),
    city: yup.string().required('City is required.'),
    zip: yup.string().required('Zip code is required.'),
    state: yup.string().required('State is required.'),
    addressNickname: yup.string().required('Address nickname is required.'),
    phone: yup.string().required('Phone is required.'),
    email:yup.string().required("email is required").email("Email must be in email format.")
    
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