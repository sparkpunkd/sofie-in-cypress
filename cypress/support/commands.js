// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-wait-until'

Cypress.Commands.add("getCurrentTime", () => cy.window().then((win) => {
	return win.getCurrentTime()
}))

Cypress.Commands.add("roActivate", (onAir) => {
	if (onAir === true) {
		cy.get('body', { log: false }).type('\\', { log: false })
	} else {
		cy.get('body', { log: false }).type('{ctrl}\\', { log: false })
	}
	Cypress.log({
		name: 'activate',
		displayName: 'RO ACTIV',
		message: [ onAir ? 'ON AIR' : 'Rehearsal' ]
	})
})

Cypress.Commands.add("roDeactivate", () => {
	cy.get('body', { log: false }).type('{ctrl}{shift}\\', { log: false })
	Cypress.log({
		name: 'activate',
		displayName: 'RO DEACT',
	})
})

Cypress.Commands.add("roTake", () => {
	cy.get('body', { log: false }).trigger('keydown', { keyCode: 123, which: 123, log: false, force: true })
	cy.wait(80, { log: false })
	cy.get('body', { log: false }).trigger('keyup', { keyCode: 123, which: 123, log: false, force: true })
	Cypress.log({
		name: 'take',
		displayName: 'TAKE',
	})
})

Cypress.Commands.add("roHotkey", (keyCode, altKey, ctrlKey, shiftKey, location) => {
	cy.get('body', { log: false }).trigger('keydown', { keyCode: keyCode, which: keyCode, log: false, force: true, altKey, ctrlKey, shiftKey, location })
	cy.wait(80, { log: false })
	cy.get('body', { log: false }).trigger('keyup', { keyCode: keyCode, which: keyCode, log: false, force: true, altKey, ctrlKey, shiftKey, location })
	const combo = Cypress._.compact([ ctrlKey && 'CTRL', altKey && 'ALT', shiftKey && 'SHIFT', keyCode, location !== undefined && `(${location})`])
	Cypress.log({
		name: 'hotkey',
		displayName: 'HOTKEY',
		message: [ `[ ${combo.join(' ')} ]` ]
	})
})

Cypress.Commands.add("dialogAccept", () => {
	cy.get('dialog[open] .btn.btn-primary', { log: false }).click({ log: false })
	Cypress.log({
		name: 'hotkey',
		displayName: 'D ACCEPT',
		message: [ `Open Modal Dialog accepted` ]
	})
})
