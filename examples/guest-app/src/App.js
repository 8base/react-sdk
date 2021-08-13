import React from 'react';
import { AppProvider, FileInput } from '8base-react-sdk';
import { ApolloLink } from 'apollo-link';

// 8base api endpoint
// const API_ENDPOINT_URI = 'https://api.8base.com/cjxotvdpv006501l68k94dz80';
// AWS
const API_ENDPOINT_URI = 'https://staging-api.8basedev.com/ckol7pw34004008k174kfhmt4';
const TOKENT = '83cd5898-0b2e-42df-a3ff-3139d435758b';

// FILESTACK
// const API_ENDPOINT_URI = 'https://staging-api.8basedev.com/ckpcn6bqx092g08mihor93cru';
// const TOKENT = '1e3493c8-0ce6-4c5e-88e0-f6ca195f8cc1';


const muLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
      return {
        headers: {
          ...headers,
          authorization: TOKENT,
        },
      };
  });

  return forward && forward(operation);
});

const App = () => (
  <AppProvider uri={ API_ENDPOINT_URI } extendLinks={(links) => [muLink, ...links,]} >
    { ({ loading }) => {
      if (loading) {
        return <p>Loading...</p>;
      }

      return (
        <React.Fragment>
          <h1>Guest App</h1>
          {/* <Query query={ CAT_BREEDS_LIST_QUERY }>
            { ({ loading, data }) => <CatBreeds loading={ loading } data={ data } /> }
          </Query> */}
          <FileInput onUploadDone={(val) => console.log('onUploadDone', val)} >
            {({pick, value}) => (
              <>
              <button onClick={() => pick({})}>CLICK</button>
              <pre>
              {Array.isArray(value) ? value.map(el => <div><a href={el.downloadUrl} >{el.filename}</a></div>) : value && <a href={value.downloadUrl} >{value.filename}</a>}
              </pre>
              </>
            )}
          </FileInput>
        </React.Fragment>
      );
    } }
  </AppProvider>
);

export { App };
