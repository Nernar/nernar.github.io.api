/*

    Inner Core API: Core Engine API Reference
    Copyright (C) 2022  Nernar (https://github.com/nernar)

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

	Maintained and distributed by MaXFeeD (maxfeed.nernar@outlook.com)

*/

import { join } from 'path';
import { sync as glob } from 'glob';
import { writeFile } from 'fs/promises';
import * as readline from 'readline';
import * as events from 'events';
import * as fs from 'fs';

async function trimDeclaration(path: fs.PathLike) {
	const rl = readline.createInterface({
		input: fs.createReadStream(path),
		crlfDelay: Infinity
	});
	let content = '';
	rl.on('line', line => {
		line = line.trimEnd();
		if (line.length != 0) {
			content += line + '\n';
		}
	});
	await events.once(rl, 'close');
	return content;
}

async function concernModules(input: fs.PathLike, output: fs.PathLike) {
	const rl = readline.createInterface({
		input: fs.createReadStream(input),
		crlfDelay: Infinity
	});
	const stream = fs.createWriteStream(output);
	rl.on('line', line => {
		const trimmed = line.trimStart();
		if (trimmed.startsWith('declare ')) {
			const index = line.length - trimmed.length;
			stream.write(line.substring(0, index) + 'export');
			line = line.substring(index + 7);
			stream.write(
				line.trimStart().startsWith('var ')
					? line.replace('var', 'let')
					: line
			);
		} else {
			stream.write(line);
		}
		stream.write('\n');
	});
	await events.once(rl, 'close');
	stream.end();
}

const typesRollup = join(__dirname, '..', 'declarations', `${ process.argv[2] }.d.ts`);
const typesRollupES6 = join(__dirname, '..', 'declarations', `${ process.argv[2] }.es6.d.ts`);

(async () => {
	let content = '/// <reference path=\'./android.d.ts\' />\n';
	for (const input of glob(
		'com/zhekasmirnov/**/*.d.ts', { cwd: join(__dirname, '..', process.argv[2]) }
	).concat(glob(
		'*.d.ts', { cwd: join(__dirname, '..', process.argv[2]) }
	))) {
		content += await trimDeclaration(join(__dirname, '..', process.argv[2], input));
	}
	await writeFile(typesRollup, content);
	await concernModules(typesRollup, typesRollupES6);
})();