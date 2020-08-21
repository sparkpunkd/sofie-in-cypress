# sofie-in-cypress
Performance testing Sofie with Cypress.

This work was carried out as part of the development of the [Sofie TV Automation](https://github.com/nrkno/Sofie-TV-automation) project at [NRK](https://nrk.no).

## Use

To run tests against a specific machine use:

```
cypress run --env host=http://sofie,ro_id=G6xVUpdg91LOM2Hx2Dv4NpJFuaw_
```

## Mocks

A fake Caspar and Atem are provided with these tests. Follow the instructions below to set them up. This must currently be on the same machine as where cypress is executing.

Important. Before running the tests, ensure both that:
* The mocks used by the test are running.
* Sofie's _playout gateway_ has been configured to point at the mock applications.

Note that both mocks send messages to Cypress as unicast datagrams. As such, note that:

* Only one test engine can receive updates at a time.
* The message transport is, by its nature, unreliable. If the machine is heavily loaded and/or too much logging-to-the-console is taking place, messages will be lost.

### Mock Caspar

Mock Caspar is a self-contained typescript module. Run with ....

    yarn ts-node src/mockCaspar.ts

The server runs on port `5250`. It sends log messages out as datagrams on port `52500`.

### Mock Atem

Mock Atem is a C# program and linux and windows installations are provided with this project. 

To install the mock application:

1. `cd src/fakeAtem`
2. `unzip dist-win.zip` or `unzip dist-linux.zip` depending on your platform.
3. `cd ../..`

To run the the mock:

    yarn ts-node src/mockAtem.ts

The mock is configured to be a _2me_ v8.1. Edit the script to change this. List of commands the mock device has been requested to process are sent as datagrams on port `52502`.

Details are provided on [how to build the variant of the Atem mock](./src/fakeAtem/build.md) used in this project.#

## License

[MIT](./LICENSE).

(c) 2020 Norsk rikskringkasting AS