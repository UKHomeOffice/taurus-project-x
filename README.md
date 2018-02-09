# taurus-project-x
This is a example project for taurus usage for automated performance testing.

To generate performance reports for your project the following tasks need to be added to your drone pipeline:

```yaml
  performance-test:
    image: quay.io/ukhomeofficedigital/taurus-bzt:0.0.0
    commands:
      - bzt -o settings.artifacts-dir=taurus_artifacts <YOUR-TAURUS-CONFIGURATION>.yml
      - bash ~/.bzt/jmeter-taurus/3.3/bin/jmeter -g taurus_artifacts/kpi.jtl -o taurus_artifacts/dashboard/
```
```yaml
  save-report:
    image: quay.io/ukhomeofficedigital/awscli:latest
    secrets: [s3_access_key, s3_secret_key, kms_key]
    environment:
      - AWS_DEFAULT_REGION=eu-west-2
    commands:
      - export AWS_ACCESS_KEY_ID=$S3_ACCESS_KEY
      - export AWS_SECRET_ACCESS_KEY=$S3_SECRET_KEY
      - SHORT_HASH=$(echo $DRONE_COMMIT | cut -c1-7)
      - aws s3 cp --recursive ./taurus_artifacts/dashboard/ s3://<YOUR-S3-BUCKET>/$SHORT_HASH --sse aws:kms --sse-kms-key-id $KMS_KEY
```

To configure the **performance-test** task - add your test scenarios to your `<taurus-configuration>.yml` using the [taurus configuration syntax](https://gettaurus.org/docs/ConfigSyntax/)

Once the **performance-test** task is complete the generated html dashboard can be uploaded to an s3 bucket using the **save-report** task. You will need to create an s3 bucket, configure your bucket in the `aws s3 cp` command, and add the secrets `s3_access_key`, `s3_secret_key`, `kms_key` to Drone.

The **save-report** task will upload the html dashboard to your s3 bucket under the path of the short commit hash (first 7 chars). You can list and download the reports using the aws cli.

###### NOTE: the [docker image for taurus](quay.io/ukhomeofficedigital/taurus-bzt) is forked from the [official image](https://github.com/Blazemeter/taurus) with changes to enable generation of the jmeter APDEX dashboard. See [this thread](https://groups.google.com/forum/#!topic/codename-taurus/1vyu4Yy8ipw) for more information


An alternative to the APDEX report dashboards... public blazemeter link??? `-report` option...