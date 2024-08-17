// Base structures
interface Step {
  timestamp: number;
  type: string;
  selector: string;
  label: string;
  value: string;
  additional: Record<string, any>;
}

interface ScreenViewport {
  width: number;
  height: number;
}

interface User {
  id: string;
}

interface Key {
  key: string;
}

interface ErrorDetails {
  id: string;
  message: string;
  filename: string;
  lineno: number;
  colno: number;
  errorStack: string;
  firstOccurredAt: string;
  lastOccurredAt: string;
  key: Key;
  occurrences: number;
  uniqueUsersAffected: number;
}

interface SessionDetails {
  id: string;
  user: User & {
    encounteredThisError: number;
    totalErrors: number;
  };
  ua: string;
  url: string;
  referrer: string;
  screen: ScreenViewport;
  viewport: ScreenViewport;
  time: {
    startedAt: string;
    endedAt: string;
    duration: number;
  };
}

export interface ReportResponse {
  id: string;
  url: string;
  severity: string;
  steps: Step[];
  videoUrl: string;
  thumbnailUrl: string;
  error: ErrorDetails & {
    key: Key;
  };
}

export interface ReportDetailsResponse extends ReportResponse {
  error: ErrorDetails & {
    key: Key & {
      user: User;
    };
    sessions: SessionDetails[];
  };
}
