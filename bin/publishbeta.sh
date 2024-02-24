#!/bin/bash

status=0

(./bin/try-publish-beta.sh "app-provider") || status=1
(./bin/try-publish-beta.sh "auth") || status=1
(./bin/try-publish-beta.sh "crud") || status=1
(./bin/try-publish-beta.sh "file-input") || status=1
(./bin/try-publish-beta.sh "forms") || status=1
(./bin/try-publish-beta.sh "permissions-provider") || status=1
(./bin/try-publish-beta.sh "table-schema-provider") || status=1
(./bin/try-publish-beta.sh "utils") || status=1
(./bin/try-publish-beta.sh "8base-react-sdk") || status=1

exit $status
