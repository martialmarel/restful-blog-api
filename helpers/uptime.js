'use strict';

module.exports.init = () => {
	if (!global.uptimeISOString) {
		let uptime = new Date();
		uptime.setSeconds(uptime.getSeconds() - process.uptime());
		global.uptimeISOString = uptime.toISOString();
	}
};

module.exports.getData = () => {
	let data = {
		uptime: global.uptimeISOString,
		now: new Date().toISOString()
	};

	return data;
};

