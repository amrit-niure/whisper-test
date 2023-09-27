import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Message = ({ text, isSent }) => {
  return (
    <div
      className={`p-2 rounded-lg ${isSent ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
    >
      {text}
    </div>
  );
};

const ChatApp = () => {
  const initialValues = {
    message: '',
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Handle sending the message (e.g., via API or WebSocket)
    console.log('Sending message:', values.message);
    resetForm();
  };

  return (
    <div className="container mx-auto px-4">
      <div className="border rounded-lg px-4 h-[60vh] overflow-y-scroll">
        {/* Messages */}
        <Message text="Hello!" isSent={true} />
        <Message text="Hi there!" isSent={false} />
        {/* Add more messages here */}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex mt-2">
            <Field
              type="text"
              name="message"
              className={`flex-grow rounded-lg p-2 border ${
                errors.message && touched.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatApp;
