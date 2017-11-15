import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin, startGithubLogin } from '../actions/auth';

export const LoginPage = ({ startGoogleLogin, startGithubLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It is time to get your expenses under control</p>

      <div className="box-layout__actions">
        <div className="box-layout__actions_action">
          <button
            onClick={() => startGoogleLogin()}
            className="button"
          >
            Login with Google
          </button>
        </div>

        <div className="box-layout__actions_action">
          <button
            onClick={() => startGithubLogin()}
            className="button"
          >
            Login with Github
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default connect(null, {
  startGoogleLogin,
  startGithubLogin,
})(LoginPage);
