var fs = require('fs');
// const file = './src/db.json';
// var file = '/tmp/data.json'




export default (entityData = []) => (_, params) => {
    const indexOfEntity = entityData.findIndex(e => String(e.id) === String(params.id));
    // var json = JSON.parse(require('fs').readFileSync(file, 'utf8'));
    // console.log(json)
    if (indexOfEntity !== -1) {
        entityData[indexOfEntity] = Object.assign(
            {},
            entityData[indexOfEntity],
            params
        );
        return entityData[indexOfEntity];
    }
};
