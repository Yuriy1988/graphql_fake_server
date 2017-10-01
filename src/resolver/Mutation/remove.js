export default (entityData = []) => (_, { id }) => {
    const indexOfEntity = entityData.findIndex(e => String(e.id) === String(id));
    const removedEntity = entityData[indexOfEntity];

    entityData.splice(indexOfEntity, 1);
    return removedEntity;
};
