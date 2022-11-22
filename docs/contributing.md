# Contributing

## Adding a new field to an entity

### Backend

1. Update entity
2. Update the database - Add the sql file and update the `changelog.yaml`
3. Update the form DTO entity. Update the form dto converion logic. Add a new enum converter if necessary.
4. Update the DTO entity (summary and complete). Update dto conversion logic.
5. Update the search endpoint if necessary.

### Frontend

1. Update the types
2. Update the entity service
3. Update yup schema and form component
4. Update the details component
5. Update the search pages

### Other

1. Update any scripts in the scraper repository
