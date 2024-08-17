import { IsNotEmpty, IsArray, IsUrl } from 'class-validator';

export interface ErrorDTO {
  id: string;
  message: string;
  filename: string;
  lineno: number;
  colno: number;
  errorStack: string;
  timestamp: number;
}

export interface SessionDTO {
  id: string;
  user: string;
  ua: string;
  url: string;
  referrer: string;
  screen: {
    width: number;
    height: number;
  };
  viewport: {
    width: number;
    height: number;
  };
  time: {
    startedAt: number;
    endedAt: number;
    duration: number;
  };
}

export interface MouseMovementDTO {
  x: number;
  y: number;
  timestamp: number;
}

export interface UserInteractionDTO {
  type: string;
  timestamp: Date;
}

export interface CreateReportDTO {
  error: ErrorDTO;
  session: SessionDTO;
  mouseMovements: Uint8Array;
  interactions: Uint8Array;
}
