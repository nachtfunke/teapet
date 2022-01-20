import { writable } from 'svelte/store';
import { Infusion } from '../models/infusion';

// collects all the infusions that have happened
export const infusions = writable([]);

// a generic function to add a new infusion to the store
export function storeInfusion(_newInfusion) {
    const newInfusion = new Infusion(_newInfusion);
    infusions.update( oldInfusions => [newInfusion, ...oldInfusions] );
}