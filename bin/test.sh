#!/bin/bash

status=0

(./bin/run.sh "app-provider" "test" "yarn test --verbose") || status=1
(./bin/run.sh "file-input" "test" "yarn test --verbose") || status=1
(./bin/run.sh "table-schema-provider" "test" "yarn test --verbose") || status=1
(./bin/run.sh "forms" "test" "yarn test --verbose") || status=1
(./bin/run.sh "permissions-provider" "test" "yarn test --verbose") || status=1
(./bin/run.sh "auth" "test" "yarn test --verbose") || status=1
(./bin/run.sh "8base-react-sdk" "test" "yarn test --verbose") || status=1

exit $status
