#!/usr/bin/env bash

PROJECT_ROOT=$(pwd)
cd $PROJECT_ROOT/tests

METEOR_PACKAGE_DIRS=$PROJECT_ROOT/packages meteor --port=5555
