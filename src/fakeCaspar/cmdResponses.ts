/*
  Phaneron - Clustered, accelerated and cloud-fit video server, pre-assembled and in kit form.
  Copyright (C) 2020 Streampunk Media Ltd.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
  https://www.streampunk.media/ mailto:furnace@streampunk.media
  14 Ormiscaig, Aultbea, Achnasheen, IV22 2JJ  U.K.
*/

import * as responses from './testResponses'

export interface Responses {
	[command: string]: ((req: string[] | null) => string) | Responses
}

export const responses218: Responses = {
	LOADBG: () => '202 LOADBG OK',
	LOAD: () => '202 LOAD OK',
	PLAY: () => '202 PLAY OK',
	PAUSE: () => '202 PAUSE OK',
	RESUME: () => '202 RESUME OK',
	STOP: () => '202 STOP OK',
	CLEAR: () => '202 CLEAR OK',
	CALL: () => 'CALL', // TODO
	SWAP: () => 'SWAP', // TODO
	ADD: () => '202 ADD OK',
	REMOVE: () => '202 REMOVE OK',
	PRINT: () => '202 PRINT OK',
	LOG: {
		LEVEL: (c): string =>
			c &&
			c.length === 3 &&
			c[2].toLowerCase() in ['trace', 'debug', 'info', 'warning', 'error', 'fatal']
				? '202 LOG OK'
				: '400 ERROR',
		CATEGORY: (c): string => (c && c.length === 4 ? '202 LOG OK' : '400 ERROR') // TODO
	},
	SET: () => 'SET',
	LOCK: () => 'LOCK',
	DATA: {
		STORE: (): string => 'DATA STORE',
		RETRIEVE: (): string => 'DATA RETRIEVE',
		LIST: (): string => 'DATA LIST',
		REMOVE: (): string => 'DATA REMOVE'
	},
	CG: {
		layer: {
			ADD: (): string => 'CG ADD',
			PLAY: (): string => 'CG PLAY',
			STOP: (): string => 'CG STOP',
			NEXT: (): string => 'CG NEXT',
			REMOVE: (): string => 'CG REMOVE',
			CLEAR: (): string => 'CG CLEAR',
			UPDATE: (): string => 'CG UPDATE',
			INVOKE: (): string => 'CG INVOKE',
			INFO: (): string => 'CG INFO'
		}
	},
	MIXER: {
		layer: {
			KEYER: (): string => '202 MIXER OK',
			CHROMA: (): string => '202 MIXER OK',
			BLEND: (): string => '202 MIXER OK',
			INVERT: (): string => '202 MIXER OK',
			OPACITY: (): string => '202 MIXER OK',
			BRIGHTNESS: (): string => '202 MIXER OK',
			SATURATION: (): string => '202 MIXER OK',
			CONTRAST: (): string => '202 MIXER OK',
			LEVELS: (): string => '202 MIXER OK',
			FILL: (): string => '202 MIXER OK',
			CLIP: (): string => '202 MIXER OK',
			ANCHOR: (): string => '202 MIXER OK',
			CROP: (): string => '202 MIXER OK',
			ROTATION: (): string => '202 MIXER OK',
			PERSPECTIVE: (): string => '202 MIXER OK',
			MIPMAP: (): string => '202 MIXER OK',
			VOLUME: (): string => '202 MIXER OK',
			MASTERVOLUME: (): string => '202 MIXER OK',
			STRAIGHT_ALPHA_OUTPUT: (): string => '202 MIXER OK',
			GRID: (): string => '202 MIXER OK',
			COMMIT: (): string => '202 MIXER OK',
			CLEAR: (): string => '202 MIXER OK'
		}
	},
	CHANNEL_GRID: () => '202 CHANNEL_GRID OK',
	THUMBNAIL: {
		LIST: (): string => 'THUMBNAIL LIST',
		RETRIEVE: (): string => 'THUMBNAIL RETRIEVE',
		GENERATE: (): string => 'THUMBNAIL GENERATE',
		GENERATE_ALL: (): string => 'THUMBNAIL GENERATE_ALL'
	},
	CINF: () => 'CINF',
	CLS: () => responses.clsResponse218,
	FLS: () => responses.flsResponse218,
	TLS: () => responses.tlsResponse218,
	VERSION: () => '201 VERSION OK\r\n2.1.8.12205 62ea2b24d NRK',
	INFO: {
		none: (): string => '200 INFO\r\n1 1080i5000 PLAYING\r\n',
		number: (): string => 'INFO 201 INFO OK\r\n<?xml version="1.0" encoding="utf-8"?>\n<channel>\n   <video-mode>1080i5000</video-mode>\n   <audio-channel-layout>[audio_channel_layout] num_channels=2 type=STEREO channel_order=FL FR</audio-channel-layout>\n   <stage/>\n   <mixer>\n      <mix-time>2</mix-time>\n   </mixer>\n   <output/>\n   <index>0</index>\n</channel>\n',
		TEMPLATE: (): string => 'INFO TEMPLATE',
		CONFIG: (): string => 'INFO CONFIG',
		PATHS: (): string => 'INFO PATHS',
		SYSTEM: (): string => 'INFO SYSTEM',
		SERVER: (): string => 'INFO SERVER',
		THREADS: (): string => 'INFO THREADS',
		DELAY: (): string => 'INFO DELAY'
	},
	DIAG: () => '202 DIAG OK',
	// BYE: () => 'BYE',
	KILL: () => '202 KILL OK',
	RESTART: () => '202 RESTART OK',
	PING: (c) => (c && c.length > 1 ? 'PONG ' + c.slice(1).join(' ') : 'PONG'),
	HELP: {
		none: (): string => 'HELP', // commands
		string: (): string => 'HELP command',
		PRODUCER: (): string => 'HELP PRODUCER',
		CONSUMER: (): string => 'HELP CONSUMER'
	},
	TIME: () => 'TIME',
	SCHEDULE: {
		SET: (): string => 'SCHEDULE_SET',
		LIST: (): string => 'SCHEDULE_LIST',
		CLEAR: (): string => 'SCHEDULE_CLEAR',
		REMOVE: (): string => 'SCHEDULE_REMOVE',
		INFO: (): string => 'SCHEDULE_INFO'
	},
	TIMECODE: {
		layer: {
			SOURCE: (): string => 'TIMECODE_SOURCE'
		}
	}
}

export const responses207: Responses = Object.assign({}, responses218, {
	VERSION: () => '201 VERSION OK\r\n2.0.7.e9fc25a Stable',
	ROUTE: () => 'ROUTE',
	GL_INFO: () => 'GL INFO',
	GL_GC: () => 'GL GC',
	CLS: () => responses.clsResponse207,
	TLS: () => responses.tlsResponse207
})

responses207.LOG = Object.assign({}, responses218.LOG)
delete (responses207.LOG as Responses).CATEGORY
let mixerLayer = Object.assign({}, (responses218.MIXER as Responses).layer)
delete (mixerLayer as Responses).INVERT
responses207.MIXER = Object.assign({}, { layer: mixerLayer })
delete responses207.FLS
delete responses207.HELP
delete responses207.TIME
delete responses207.PING
delete responses207.SCHEDULE
delete responses207.TIMECODE

const info = Object.assign({}, responses218.INFO as Responses)
info.QUEUES = (): string => 'INFO QUEUES'
responses207.INFO = info

export const responses220: Responses = Object.assign({}, responses218, {
	VERSION: () => '201 VERSION OK\r\n2.2.0 66a9e3e2 Stable'
})

responses220.LOG = Object.assign({}, responses218.LOG, {
	CLS: () => responses.clsResponse220,
	FLS: () => responses.flsResponse220,
	TLS: () => responses.tlsResponse220
})
delete (responses220.LOG as Responses).CATEGORY
const cgLayer = Object.assign({}, (responses218.CG as Responses).layer)
delete (cgLayer as Responses).INFO
responses220.CG = Object.assign({}, { layer: cgLayer })
delete (responses220.CG.layer as Responses).INFO
mixerLayer = Object.assign({}, (responses218.MIXER as Responses).layer)
delete (mixerLayer as Responses).INVERT
delete (mixerLayer as Responses).STRAIGHT_ALPHA_OUTPUT
responses220.MIXER = Object.assign({}, { layer: mixerLayer })
responses220.INFO = {
	none: (responses218.INFO as Responses).none,
	number: (responses218.INFO as Responses).number
}
delete responses220.HELP
delete responses220.TIME
delete responses220.SCHEDULE
delete responses220.TIMECODE
