import { Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { registerLocal } from '../api/api';
import { PROFILE } from '../router/routes';

export const Register = () => {
  const navigate = useNavigate();
  const { mutate, error, data, isLoading } = useMutation(
    'registerLocal',
    registerLocal,
    {
      onSuccess: () => {
        navigate(PROFILE);
      },
    },
  );

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          mutate({ email, password });
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <div className="flex flex-col items-center justify-center gap-2">
              <Field component={TextField} label="Email" name="email" />
              <Field component={TextField} label="Password" name="password" />
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
