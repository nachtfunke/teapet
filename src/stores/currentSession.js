import { writable } from 'svelte/store';
import { Session } from '../models/Session';

export const currentSessionStore = writable();

export function startNewSession(_newSession) {
    const newSession = new Session(_newSession);
    currentSessionStore.update( oldSession => newSession );
}

export function addNewInfusion(infusion) {
    currentSessionStore.update( currentSession => {
        const allInfusions = [...currentSession.infusions, infusion];
        currentSession.infusions = allInfusions;
        console.log(currentSession);
        return currentSession;
    });
}

export function updateCurrentSessionInfusions(infusions) {
    currentSessionStore.update( currentSession => {
        currentSession.infusions = infusions;
        console.log(currentSession);
        return currentSession;
    });
}