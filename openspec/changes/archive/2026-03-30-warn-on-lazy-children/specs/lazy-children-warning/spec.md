## ADDED Requirements

### Requirement: Lazy children detection

The Activity component SHALL detect when children is a React LazyComponent (created by `React.lazy()`) and emit a warning in development mode.

#### Scenario: Lazy component in development mode

- **WHEN** Activity receives a child that is a LazyComponent and `process.env.NODE_ENV` is not `'production'`
- **THEN** a console warning SHALL be emitted explaining the potential issue

#### Scenario: Lazy component in production mode

- **WHEN** Activity receives a child that is a LazyComponent and `process.env.NODE_ENV` is `'production'`
- **THEN** no warning SHALL be emitted

#### Scenario: Normal component passed

- **WHEN** Activity receives a regular React component as child
- **THEN** no warning SHALL be emitted

#### Scenario: Null or undefined children

- **WHEN** Activity receives `null` or `undefined` as children
- **THEN** no warning SHALL be emitted