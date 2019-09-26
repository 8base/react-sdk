#!/bin/bash

lerna exec -- yarn link > /dev/null && lerna list --scope @8base/* 8base-react/*  | xargs -I {} echo yarn link {}

