export default (entityData = []) => (_, params) => {
    const indexOfEntity = entityData.findIndex(e => String(e.id) === String(params.id));
    if (indexOfEntity !== -1) {
        entityData[indexOfEntity] = Object.assign(
            {},
            entityData[indexOfEntity],
            params
        );
        return entityData[indexOfEntity];
    }
};
