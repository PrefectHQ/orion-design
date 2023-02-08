export const stateType = [
  'completed',
  'running',
  'scheduled',
  'pending',
  'failed',
  'cancelled',
  'crashed',
  'paused',
] as const

export type StateType = typeof stateType[number]
export type ServerStateType = Uppercase<StateType>

export function isStateType(value: unknown): value is StateType {
  return typeof value === 'string' && stateType.includes(value as StateType)
}

export const terminalStateType = [
  'completed',
  'cancelled',
  'failed',
  'crashed',
]

export type TerminalStateType = typeof terminalStateType[number]
export type ServerTerminalStateType = Uppercase<TerminalStateType>

export function isTerminalStateType(value: string): value is TerminalStateType {
  return terminalStateType.includes(value as TerminalStateType)
}

export const stuckStateTypes = ['running', 'scheduled', 'pending', 'paused']
export type StuckStateType = typeof stuckStateTypes[number]
export function isStuckStateType(value: string): value is StuckStateType {
  return stuckStateTypes.includes(value as StuckStateType)
}

export function isPausedStateType(value: string): boolean {
  return value === 'paused'
}

export function isRunningStateType(value: string): boolean {
  return value === 'running'
}