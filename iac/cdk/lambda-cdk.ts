import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = s3.Bucket.fromBucketName(this, 'BucketStore', 'report-bucket-test-185478');
    const bucketCode = s3.Bucket.fromBucketName(this, 'BucketCode', 'containers3bucket');
    const lambdaCodeObjectKey = 'my-deployment-package.zip';


      const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
        runtime: lambda.Runtime.PYTHON_3_13,
        handler: 'lambda_function.lambda_handler',
        code: lambda.Code.fromBucket(bucketCode,lambdaCodeObjectKey)
        //code: lambda.Code.fromAsset(path.resolve(__dirname,'src'))
      });

      bucket.grantReadWrite(lambdaFunction);
      bucketCode.grantRead(lambdaFunction);


      const myFunctionUrl = lambdaFunction.addFunctionUrl({
        authType: lambda.FunctionUrlAuthType.NONE,
      });

      // Define a CloudFormation output for your URL
      new cdk.CfnOutput(this, "myFunctionUrlOutput", {
        value: myFunctionUrl.url,
      })

}
}