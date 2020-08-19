declare namespace Cypress {
	interface cy {
		getCurrentTime(): Promise<number>
	}
}