import {
  Box,
  Container,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSocketEvent } from 'socket.io-react-hook';
import { useQuery } from 'react-query';
import { useAuthenticatedSocket } from '../hooks/useAuthenticatedSocket';
import { getHello } from '../api/api';

const Index = () => {
  const { socket, connected, error } = useAuthenticatedSocket();
  const { lastMessage } = useSocketEvent<string>(socket, 'randomNumber');
  const { data: hello } = useQuery('hello', getHello);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          React + NestJS starter
        </Typography>

        {connected ? (
          <div>
            <div>Number from socket.io: {lastMessage}</div>
            <Formik
              initialValues={{
                message: '',
              }}
              onSubmit={({ message }, { setSubmitting }) => {
                socket.emit('message', message);
                setSubmitting(false);
              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <Field component={TextField} label="Message" name="message" />
                  {isSubmitting && <LinearProgress />}
                  <br />
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Send message to server
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div>
            <div>{error && error.message}</div>
            <div>Sign in to initiate an authenticated socket.io connection</div>
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Index;
