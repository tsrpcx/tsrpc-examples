export interface RoomUserState {
    uid: string,
    pos: [number, number, number],
    rotation: [number, number, number, number],
    aniState: PlayerAniState
}

export type PlayerAniState = 'idle' | 'walking' | 'wave' | 'punch';