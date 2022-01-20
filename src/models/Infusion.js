export class Infusion {
    constructor({id, order, duration, notes}) {
        this._id = id;
        this.order = order;
        this.duration = duration;
        this.notes = notes;
    }

    get id() {
        return this._id;
    }
}