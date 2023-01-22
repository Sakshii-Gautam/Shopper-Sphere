import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, userUpdateApi } from '../features/users/userServices';
import { userUpdateReset } from '../features/users/userSlice';

const UserEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const users = useSelector((state) => state.users);
  const { isLoading, error, userDetails, userInfo } = users;
  const userUpdate = useSelector((state) => state.users.userUpdate);
  const {
    isLoading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch(userUpdateReset());
      navigate('/admin/usersList');
    } else {
      if (!userDetails.name || userDetails._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
        setIsAdmin(userDetails.isAdmin);
      }
    }
  }, [userDetails, userId, dispatch, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateApi({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/usersList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message variant="danger">{errorUpdate.message}</Message>
        )}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
