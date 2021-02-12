#!/bin/bash

# By default a GitHub action checkout is shallow. Get all the tags, branches,
# and history. Redirect output to standard error which we can collect in the
# action.
git fetch --depth=1 origin +refs/tags/*:refs/tags/* 1>&2
git fetch --no-tags --prune --depth=1 origin +refs/heads/*:refs/remotes/origin/* 1>&2
git fetch --prune --unshallow 1>&2

tag=$(git describe --tags --abbrev=0)
git log --pretty=format:"%s" $tag