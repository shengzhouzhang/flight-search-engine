# flight-search-engine

- This program is the implementation of the flight search engine based on the exercise spec.
- It includes a search results page, the unit tests, and the end-to-end automated tests.
- The search results are generated based on the form inputs through requesting to the endpoint `/api/tickets/search`.
- The search results page is under the path `/api/tickets/search`

# Environment

- The program is implemented in the following environments:

- Node JS -- version 4.3.2
- NPM -- version 2.14.12
- MAC -- OS X EI Capitan -- version 10.11.3

# Installation

```
$ npm install
```

# Testing

- Unit tests are under folder `test/specs`.

- To run the unit tests, simply do

```
$ npm test
```

- Automated End-to-End tests are under folder `test/automation`.
- It needs a running server, it visits `http://localhost:8080/tickets/search` by default.
- Please use a terminal to start a server. simply do,

```
$ gulp build
$ node index.js
```

- Then, use another terminal run the following command,

```
$ mocha test/automation/*.js --compilers js:babel-core/register
```

- After the End-to-End test completed, it will save two screenshots to folder `test` with `.png` extension.

# Running

To run the worker, simply do the following commands,

```
$ gulp build
$ node index.js
```
- Then, visit http://localhost:8080/tickets/search in browser.

# Code Structure

- `src` - source files
- `src/components` - the react components
- `src/browser` - browser side logic, includes the scss style, redux stores, repository objects
- `src/server` - server side code, includes express routers (controllers)
- `src/domains` - domain objects
- `src/config` - config files

- `test` - test files
- `test/automation` - end-to-end tests
- `test/specs` - unit tests
- `test/specs/components` - unit tests for react components
- `test/specs/browser` - unit tests for browser side code
- `test/specs/server` - unit tests for server side code
- `test/specs/domains` - unit tests for domain objects
- `test/utils` - test helper util file
- `test/*.png` - screenshots saved from the end-to-end test

- `libs` - third party files
- `.env` - environments setting file
