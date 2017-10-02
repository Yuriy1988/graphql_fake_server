export default (entityData = []) => (_, params) => {
    const indexOfEntity = entityData.findIndex(e => String(e.id) === String(params.id));
    if (indexOfEntity !== -1) {
        const time = new Date();
        const updatedAt = time.toISOString();
        entityData[indexOfEntity] = Object.assign(
            {},
            entityData[indexOfEntity],
            params,
            { updatedAt }
        );
        return entityData[indexOfEntity];
    }
};
