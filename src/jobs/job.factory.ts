import { SystemJobs } from ".";
import { createFirebaseService } from "../commons/firebase/firebase.factory";

export function createSystemJobsEntity() {
  const firebaseService = createFirebaseService();
  return new SystemJobs(firebaseService);
}