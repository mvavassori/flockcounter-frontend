// backendCallsWrapper.ts
import { useSession } from "next-auth/react";
import * as backendCalls from "@/service/backendCalls";

export function useBackendCalls() {
  const { data: session, update } = useSession();

  const wrapBackendCall = async (call: Function, ...args: any[]) => {
    if (!session?.backendTokens.accessToken) {
      throw new Error("No access token available");
    }

    try {
      return await call(...args, session.backendTokens.accessToken);
    } catch (error) {
      if (error instanceof Error && error.message === "Unauthorized") {
        // Update the session
        await update();
        // Retry the call with the new token
        if (!session?.backendTokens.accessToken) {
          throw new Error("Failed to refresh access token");
        }
        return await call(...args, session.backendTokens.accessToken);
      }
      throw error;
    }
  };

  // Wrap each function from backendCalls
  const wrappedCalls = {
    getTopStats: (...args: Parameters<typeof backendCalls.getTopStats>) =>
      wrapBackendCall(backendCalls.getTopStats, ...args),
    getPages: (...args: Parameters<typeof backendCalls.getPages>) =>
      wrapBackendCall(backendCalls.getPages, ...args),
    getReferrers: (...args: Parameters<typeof backendCalls.getReferrers>) =>
      wrapBackendCall(backendCalls.getReferrers, ...args),
    getDeviceTypes: (...args: Parameters<typeof backendCalls.getDeviceTypes>) =>
      wrapBackendCall(backendCalls.getDeviceTypes, ...args),
    getOSes: (...args: Parameters<typeof backendCalls.getOSes>) =>
      wrapBackendCall(backendCalls.getOSes, ...args),
    getBrowsers: (...args: Parameters<typeof backendCalls.getBrowsers>) =>
      wrapBackendCall(backendCalls.getBrowsers, ...args),
    getLanguages: (...args: Parameters<typeof backendCalls.getLanguages>) =>
      wrapBackendCall(backendCalls.getLanguages, ...args),
    getCountries: (...args: Parameters<typeof backendCalls.getCountries>) =>
      wrapBackendCall(backendCalls.getCountries, ...args),
    getRegions: (...args: Parameters<typeof backendCalls.getRegions>) =>
      wrapBackendCall(backendCalls.getRegions, ...args),
    getCities: (...args: Parameters<typeof backendCalls.getCities>) =>
      wrapBackendCall(backendCalls.getCities, ...args),
    getEvents: (...args: Parameters<typeof backendCalls.getEvents>) =>
      wrapBackendCall(backendCalls.getEvents, ...args),
  };

  return wrappedCalls;
}
