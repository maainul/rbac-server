const filterFields = (sourceObject, fields) => {
    return Object.fromEntries(
        fields
            .filter(field =>
                sourceObject[field] !== undefined &&
                sourceObject[field] !== null &&
                sourceObject[field] !== '')
            .map(field => [field, sourceObject[field]])
    );
}

export default filterFields 