i split this into two components to ease future refactoring.

### ui
Just the UI. doesn't contain any business logic. aka "presentation"

### box
container component. does all of the business logic, but delegates ui to the ui component