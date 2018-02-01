#!/bin/bash

export KUBE_NAMESPACE="perf-test"
export KUBE_SERVER=${KUBE_SERVER}
export KUBE_TOKEN=${KUBE_TOKEN}

kd --insecure-skip-tls-verify \
   -f kube/configmap.yml \
   -f kube/deployment.yml \
   -f kube/service.yml
