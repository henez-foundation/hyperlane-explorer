import { GithubRegistry } from 'henez-hyperlane-registry';

import { MultiProvider } from '@hyperlane-xyz/sdk';

export function successResult<R>(data: R): { success: true; data: R } {
  return { success: true, data };
}

export function failureResult(error: string): { success: false; error: string } {
  return { success: false, error };
}

// TODO de-dupe this with store.ts and handle registry/multiProvider concerns in a single place
export async function getMultiProvider(): Promise<MultiProvider> {
  const registry = new GithubRegistry();
  const chainMetadata = await registry.getMetadata();
  return new MultiProvider(chainMetadata);
}
