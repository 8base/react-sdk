import React from 'react';
import gql from 'graphql-tag';
import * as R from 'ramda';
import { Query } from 'react-apollo';
import { withAuth, WithAuthProps } from '@8base-react/auth';

import { PermissionsContext } from './PermissionsContext';
import { getPermissions } from './getPermissions';
import { RequestPermissions } from './types';

const USER_PERMISSIONS_QUERY = gql`
  query UserPermissions {
    user {
      id
      permissions {
        items {
          resource
          resourceType
          permission
        }
      }
      roles {
        items {
          id
          name
        }
      }
    }
  }
`;

const TEAM_MEMBER_PERMISSIONS_QUERY = gql`
  query TeamMemberPermissions {
    teamMember {
      id
      permissions {
        items {
          resource
          resourceType
          permission
        }
      }
      roles {
        items {
          id
          name
        }
      }
    }
  }
`;

type PermissionsProviderCommonProps = {
  type?: 'teamMember' | 'user';
};

type PermissionsProviderProps =
  | ({
      children: React.ReactNode;
    } & PermissionsProviderCommonProps)
  | ({
      children: (props: { loading: boolean }) => React.ReactNode;
    } & PermissionsProviderCommonProps);

/**
 * Provider for 8base user permissions
 * @property {Function} children Children of the provider. Could be either react node or function with loading state.
 */
const PermissionsProvider: React.ComponentType<PermissionsProviderProps> = withAuth(
  class PermissionsProvider extends React.Component<WithAuthProps & PermissionsProviderProps> {
    public renderChildren = (args: { loading: boolean }) => {
      const { children } = this.props;

      if (typeof children === 'function') {
        return children(args);
      }

      return children;
    };

    public renderContent = ({ data, loading }: { data: RequestPermissions; loading: boolean }) => {
      const { children, type = 'teamMember' } = this.props;

      const permissions = getPermissions(data, type);

      const roles = R.pipe(
        R.pathOr([], [type, 'roles', 'items']),
        R.map(({ name }) => name),
      )(data);

      return (
        <PermissionsContext.Provider value={{ permissions, roles }}>
          {this.renderChildren({ loading })}
        </PermissionsContext.Provider>
      );
    };

    public render() {
      const {
        auth: { isAuthorized, authState },
        children,
        type,
        ...rest
      } = this.props;

      return (
        <Query
          query={type === 'user' ? USER_PERMISSIONS_QUERY : TEAM_MEMBER_PERMISSIONS_QUERY}
          skip={!isAuthorized || !authState.workspaceId}
          {...rest}
        >
          {this.renderContent}
        </Query>
      );
    }
  },
);

export { PermissionsProvider };
