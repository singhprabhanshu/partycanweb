import * as yup from 'yup';
import { setIn } from 'final-form';

var schema = yup.object().shape({
    zipcode: yup.string('Must be a number.')
        .test('len', 'Must be exactly 5 digit', val => val ? val.toString().length === 5 : false)
        .typeError('Zipcode must be a number.')
        .required('Zipcode is required.'),
    overAge: yup.bool().required()
        .oneOf([true], "OverAge")
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