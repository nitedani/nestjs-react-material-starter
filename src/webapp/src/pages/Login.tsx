import { Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { loginLocal } from '../api/api';

const Login = () => {
  const [loginError, setLoginError] = useState<Error>();
  const { mutateAsync } = useMutation('loginLocal', loginLocal);
  const history = useHistory();

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          try {
            await mutateAsync({ email, password });
          } catch (error) {
            setLoginError(error);
          }

          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <div className="flex flex-col items-center justify-center gap-2">
              <Field component={TextField} label="Email" name="email" />
              <Field component={TextField} label="Passwords" name="password" />
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Sign in
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <div>
          <Button href="api/auth/google" style={{ padding: 0 }}>
            <img
              style={{ cursor: 'pointer', height: 36 }}
              src="/google/2x/btn_google_signin_light_normal_web@2x.png"
              alt=""
            />
          </Button>
        </div>
      </div>
      {loginError && <div>{loginError.message}</div>}
    </div>
  );
};

export default Login;
