import uuidv1 from 'uuid/v1';

export default (entityData = []) => (_, entity) => {
    const time = new Date();
    const id = uuidv1();
    const createdAt = time.toISOString();

    const newEntity = Object.assign({ id, createdAt, updatedAt: createdAt }, entity);
    entityData.push(newEntity);
    return newEntity;
};
