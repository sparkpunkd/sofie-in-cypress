declare namespace Cypress {
	interface cy {
		getCurrentTime(): Cypress.Chainable<number>
		roActivate(onAir?: boolean): void
		roDeactivate(): void
		roTake(): void
		roHotkey(keyCode: number, altKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean, location?: number): void
		dialogAccept(): void
	}
}