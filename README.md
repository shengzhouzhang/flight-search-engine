# flight-search-engine

- This program is the implementation of the flight search engine based on the exercise spec.
- It includes a search results page, the unit tests, and the end-to-end automated tests.
- The JSON of search result is generated based on the front end inputs when requesting the api endpoint
- The program uses React JS + Redux + Express JS + Mocha + Enzyme

# Environment

- The program is implemented in the following environments:

- Node JS -- version 4.3.2
- NPM -- version 2.14.12
- MAC -- OS X EI Capitan -- version 10.11.3

# Installation

To install the dependencies, simply do,

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
- It needs a running server and visits `http://localhost:8080/tickets/search` by default.
- Please use a terminal to start a server. simply do,

```
$ gulp build
$ node index.js
```

- Then, use another terminal run the following command,

```
$ mocha test/automation/*.js --compilers js:babel-core/register
```

- It will save two screenshots to folder `test` with `.png` extension.

# Running

To run the program, simply do the following commands,

```
$ gulp build
$ node index.js
```
And then, visit http://localhost:8080/tickets/search from browser.

Tested on Chrome, Firefox, and Safari.

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
