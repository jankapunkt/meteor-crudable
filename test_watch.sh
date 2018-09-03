#!/usr/bin/env bash

PROJECT_ROOT=$(pwd)
cd $PROJECT_ROOT/packages/crudable
TEST_WATCH=1 TEST_CLIENT=0 meteor test-packages ./ --driver-package=meteortesting:mocha
