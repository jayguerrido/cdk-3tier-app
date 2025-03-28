import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class Cdk3TierAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a VPC with public subnets
    const vpc = new ec2.Vpc(this, 'AppVPC', {
      maxAzs: 2,
      natGateways: 0, // Optional: saves free tier usage
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'public-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    // Security Group to allow HTTP and SSH
    const securityGroup = new ec2.SecurityGroup(this, 'WebSG', {
      vpc,
      description: 'Allow HTTP and SSH traffic',
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH');

    // User Data to install Nginx
    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      'sudo yum update -y',
      'sudo amazon-linux-extras install nginx1 -y',
      'sudo systemctl enable nginx',
      'sudo systemctl start nginx'
    );

    // Create EC2 instance
    new ec2.Instance(this, 'WebServer', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC, // ⬅️ Ensure it's in a public subnet
      },
      securityGroup,
      userData,
      associatePublicIpAddress: true, // ⬅️ This ensures a public IP
    });
  }
}
