#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Cdk3TierAppStack } from '../lib/cdk-3tier-app-stack';

const app = new cdk.App();
new Cdk3TierAppStack(app, 'Cdk3TierAppStack');
