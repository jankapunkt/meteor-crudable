#!/usr/bin/env bash
TEST_WATCH=0 TEST_CLIENT=0 meteor test-packages ./ --once --driver-package=meteortesting:mocha
exit 0