import { Session } from '../models/Session';
import { writable } from 'svelte/store';

export const sessionsStore = writable([]);

export function storeSession(_newSession) {
    const newSession = new Session(_newSession)

    sessionsStore.update( oldSessions => [...oldSessions, newSession] );
}