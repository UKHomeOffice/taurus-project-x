#!/bin/bash

export KUBE_NAMESPACE='Perf-Test'
export KUBE_SERVER=${KUBE_SERVER}
export KUBE_TOKEN=${KUBE_TOKEN}

kd --insecure-skip-tls-verify \
   -f kube/deployment.yaml \
   -f kube/service.yaml
