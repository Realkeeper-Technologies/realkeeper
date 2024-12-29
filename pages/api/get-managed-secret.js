import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// Initialize Secret Manager Client
const secretClient = new SecretManagerServiceClient();

// Function to get secret from Google Secret Manager (if necessary)
export default async function getSecret(secretName) {
  const projectId = 'inspired-victor-446107-t9';  // Replace with your GCP project ID
  const [version] = await secretClient.accessSecretVersion({
    name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
  });

  const payload = version.payload.data.toString('utf8');
  return payload;
}