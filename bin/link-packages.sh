#!/bin/bash

lerna exec -- yarn link > /dev/null && lerna list --scope "8base-react/*" --scope "8base-react-sdk"  | xargs -I {} echo yarn link {}

