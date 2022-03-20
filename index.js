const { readFileSync, writeFileSync } = require("fs");

class Database {
    constructor(options = {}) {
        if(!options.path) throw new Error('Database path is required');
        this.options = options;
        try {
            this.storage = JSON.parse(readFileSync(options.path, 'utf8') || "{}");
        } catch(e) {
            if(e.code === 'ENOENT') {
                writeFileSync(options.path, "{}");
                this.storage = {};
            } else {
                throw new Error(e);
            }
        }
    }

    get size() {
        return Object.values(this.storage).length;
    }

    get entries() {
        return Object.entries(this.storage);
    }

    get keys() {
        return Object.keys(this.storage);
    }

    get values() {
        return Object.values(this.storage);
    }

    sync() {
        writeFileSync(this.options.path, JSON.stringify(this.storage, null, this.options.space || 0));
        return this;
    }

    get(key) {
        return this.storage[key];
    }

    set(key, value) {
        this.storage[key] = value;
        if(this.options.sync) this.sync();
        return value;
    }

    setMany(data, overwrite = true) {
        if(overwrite) {
            this.storage = data;
        } else {
            Object.assign(this.storage, data);
        }

        if(this.options.sync) this.sync();
        
        return this;
    }

    has(key) {
        return this.storage.hasOwnProperty(key);
    }

    hasAll(keys) {
        return keys.every(key => this.has(key));
    }

    hasAny(keys) {
        return keys.some(key => this.has(key));
    }

    delete(key) {
        delete this.storage[key];
        if(this.options.sync) this.sync();
        return this;
    }

    clear() {
        this.storage = {};
        if(this.options.sync) this.sync();
        return this;
    }

    ensure(key, defaultValue = {}) {
        if(!this.has(key)) {
            this.set(key, defaultValue);
            if(this.options.sync) this.sync();
            return defaultValue;
        }
        return this.get(key);
    }

    at(index) {
        return this.entries[index];
    }

    keyAt(index) {
        return this.keys[index];
    }

    first() {
        return this.values[0];
    }

    firstKey() {
        return this.keys[0];
    }

    last() {
        return this.values[this.values.length - 1];
    }

    lastKey() {
        return this.keys[this.keys.length - 1];
    }

    assign(data) {
        return Object.assign(this.storage, data);
    }

    forEach(callback) {
        this.entries.forEach(callback);
    }

    map(callback) {
        return this.values.map(callback);
    }

    random() {
        return this.values[Math.floor(Math.random() * this.values.length)];
    }

    randomKey() {
        return this.keys[Math.floor(Math.random() * this.keys.length)];
    }

    reduce(callback, initialValue) {
        return this.values.reduce(callback, initialValue);
    }

    reverse() {
        return this.values.reverse();
    }

    some(callback) {
        return this.values.some(callback);
    }

    sort(callback) {
        return this.values.sort(callback);
    }

    filter(callback) {
        return this.values.filter(callback);
    }

    sweep(callback) {
        let filtered = this.filter(callback);
        filtered.map((key, i) => this.delete(this.keyAt(i)));
        if(this.options.sync) this.sync();
        return filtered;
    }

    every(callback) {
        return this.values.every(callback);
    }

    find(callback) {
        return this.values.find(callback);
    }

    toJSON() {
        return this.storage;
    }

    toString() {
        return JSON.stringify(this.storage);
    }
}

module.exports = Database;