import * as caspar from './fakeCaspar/server'

if (!module.parent) {
	caspar.start().then(console.log, console.error)
}