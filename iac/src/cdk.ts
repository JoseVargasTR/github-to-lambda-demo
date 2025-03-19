#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaCdkStack } from 'lambda-cdk';

const app = new cdk.App();
new LambdaCdkStack(app, 'LambdaCdkStack', {
   env: { account: '816069130705', region: 'us-east-1' },
});