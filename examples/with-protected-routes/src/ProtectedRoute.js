import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '8base-react-sdk';

const renderComponent = props => {
  const { render, children, component, ...rest } = props;

  let rendered = null;

  if (component) {
    rendered = React.createElement(component, { ...rest }, children);
  }

  if (render) {
    rendered = render({ ...rest, children });
  }

  if (typeof children === 'function') {
    rendered = children(rest);
  } else if (children) {
    rendered = children;
  } else if (!rendered) {
    throw new Error('Error: must specify either a render prop, a render function as children, or a component prop.');
  }

  return rendered;
};

const ProtectedRoute = (props) => {
  const { isAuthorized } = useAuth();

  const renderRoute = () => {
    if (isAuthorized) {
      return renderComponent(props);
    }

    return <Redirect to={{ pathname: '/auth' }} />;
  };

  const { component, render, ...routeProps } = props;

  return <Route {...routeProps} render={renderRoute} />;
};

export { ProtectedRoute };
