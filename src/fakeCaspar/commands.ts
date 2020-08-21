import { ChanLayer } from '../chanLayer'

function chanLayerFromString(chanLayStr: string): ChanLayer {
	let valid = false
	let channel = 0
	let layer = 0
	const match = chanLayStr?.match('(?<channel>\\d+)-?(?<layer>\\d*)')
	if (match?.groups) {
		valid = true
		const chanLay = match.groups
		channel = parseInt(chanLay.channel)
		if (chanLay.layer !== '') {
			layer = parseInt(chanLay.layer)
		}
	}
	return { valid: valid, channel: channel, layer: layer }
}

interface CmdEntry {
	cmd: string
	fn: (chanLayer: ChanLayer, params: string[]) => Promise<boolean>
}

export class Commands {
	private readonly map: CmdEntry[]

	constructor() {
		this.map = []
	}

	add(entry: CmdEntry): void {
		this.map.push(entry)
	}
	async process(command: string[]): Promise<boolean> {
		let result = false
		const entry = this.map.find(({ cmd }) => cmd === command[0])
		if (entry) {
			const chanLayer = chanLayerFromString(command[1])
			result = await entry.fn(chanLayer, command.slice(chanLayer ? 2 : 1))
		}

		return result
	}
}
