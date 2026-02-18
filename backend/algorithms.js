function abs(a, b) {
    return Math.abs(a - b);
}

exports.fcfs = (req, head) => {
    let total = 0;
    let pos = head;
    req.forEach(r => {
        total += abs(pos, r);
        pos = r;
    });
    return total;
};

exports.sstf = (req, head) => {
    let requests = [...req];
    let total = 0;
    let pos = head;

    while (requests.length > 0) {
        requests.sort((a, b) => abs(pos, a) - abs(pos, b));
        total += abs(pos, requests[0]);
        pos = requests.shift();
    }
    return total;
};

exports.scan = (req, head) => {
    let requests = [...req].sort((a, b) => a - b);
    let total = 0;
    let pos = head;

    let right = requests.filter(r => r >= head);
    let left = requests.filter(r => r < head).reverse();

    right.forEach(r => {
        total += abs(pos, r);
        pos = r;
    });

    left.forEach(r => {
        total += abs(pos, r);
        pos = r;
    });

    return total;
};

exports.cscan = exports.scan;
exports.look = exports.scan;
exports.clook = exports.scan;
