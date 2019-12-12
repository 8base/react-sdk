import React, { Component } from 'react';
import * as R from 'ramda';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { SchemaNameGenerator } from '@8base/schema-name-generator';
import { PermissionsContext } from '@8base-react/permissions-provider';
import { createTableRowQueryTag, TableSchema, tableSelectors } from '@8base/utils';

type RecordDataProps = {
  tableId?: string;
  tableSchema: TableSchema;
  recordId: string;
  variables?: object;
  skip?: boolean;
  children: (recordData: QueryResult) => JSX.Element;
};

export class RecordData extends Component<RecordDataProps> {
  public static contextType = PermissionsContext;

  public getRecordData(tableSchema: TableSchema, data: any): any {
    const tableItemFieldName = SchemaNameGenerator.getTableItemFieldName(tableSchema.name);
    const tableAppName: string = tableSelectors.getTableAppName(tableSchema) as string;

    if (tableAppName) {
      return R.path([tableAppName, tableItemFieldName], data);
    }

    return R.path([tableItemFieldName], data);
  }

  public render() {
    const { tableId, variables, tableSchema, children, recordId, ...rest } = this.props;

    return (
      <Query
        {...rest}
        query={gql(createTableRowQueryTag([tableSchema], tableSchema.id, { permissions: this.context }))}
        variables={{ id: recordId }}
      >
        {({ data, ...rest }: QueryResult) =>
          children({
            ...rest,
            data: this.getRecordData(tableSchema, data),
          })
        }
      </Query>
    );
  }
}
