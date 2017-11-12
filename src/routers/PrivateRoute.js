import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { history } from './AppRouter';
import Header from '../components/Header';

export const PrivateRoute = ({ isAuthenticated, ...otherProps }) => {
  if (isAuthenticated) {
    return (
      <div>
        <Header />
        <Route {...otherProps} />
      </div>
    );
  }
  return <Redirect to="/" />;
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);
