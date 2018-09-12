'use strict';

const childProcess = require('child_process');
const exec = childProcess.exec;
const isWindows = process.platform === 'win32';
const downgradePs = false;

module.exports = function(pid, signal, callback) {
    if (isWindows) {
        exec('taskkill /pid ' + pid + ' /T /F', callback);
    } else {
        let tree = {};
        let pidsToProcess = {};
        buildProcessTree(pid, tree, pidsToProcess, function() {
            try {
                killAll(tree, signal);
            } catch (err) {
                if (callback) {
                    return callback(err);
                } else {
                    throw err;
                }
            }
            callback && callback();
        });
    }
};

function killAll(tree, signal) {
    let killed = {};
    Object.keys(tree).forEach((pid) => {
        tree[pid].forEach((inPid) => {
            if (!killed[inPid]) {
                killPid(inPid, signal);
                killed[inPid] = 1;
            }
        });
        if (!killed[pid]) {
            killPid(pid, signal);
            killed[pid] = 1;
        }
    });
}

function killPid(pid, signal) {
    try {
        process.kill(parseInt(pid, 10), signal);
    } catch (err) {
        if (err.code !== 'ESRCH') {
            throw err;
        }
    }
}