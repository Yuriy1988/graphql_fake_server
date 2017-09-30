export default (entityData = []) => (_, params) => {
    const indexOfEntity = entityData.findIndex(e => String(e.id) === String(params.id));
    console.log('indexOfEntity', indexOfEntity);
    console.log('indexOfEntity', indexOfEntity);
    console.log('entityData', entityData);
    if (indexOfEntity !== -1) {
        entityData[indexOfEntity] = Object.assign(
            {},
            entityData[indexOfEntity],
            params
        );
        return entityData[indexOfEntity];
    }
};
