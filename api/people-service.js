const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    isValid(people) {
        return people.name;
      }

    updatePeople(id, object) {
        if(this.isValid(object)){
            let people = this.peoples.find(element => {
                return parseInt(element.id) === parseInt(id);
            });

            if(people){
                people = {
                    ...people,
                    ...object
                }
                return people;
            }
        }
        return null;
    }
    
    getPeople(filters) {
        if(typeof filters === 'object'){
            let array = [];

            if(Object.keys(filters).length){
                const keys = Object.keys(filters);
                
                console.log(keys);
                array = this.peoples.filter(element => {
                    for (let i = 0; i < keys.length; i++) {
                        if(element[keys[i]] === filters[keys[i]]){
                            return element;
                        }
                    }
                });
            } else {
                array = this.peoples;
            }

            return array
        } else {
            return this.peoples;
        }
    }
}
