export class Session {
    constructor({id, name, infusions}) {
        this._id = id;
        this._created = Date.now();
        this.name = name;
        this.infusions = infusions;
    }

    get id() {
        return this._id;
    }

    get created() {
        return this._created;
    }
}