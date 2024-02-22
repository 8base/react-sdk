#!/bin/bash

status=0

(./bin/try-publish-beta.sh "file-input") || status=1

exit $status
