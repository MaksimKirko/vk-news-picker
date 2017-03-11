module.exports = class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    test() {
        console.log(this.name);
    }
};
