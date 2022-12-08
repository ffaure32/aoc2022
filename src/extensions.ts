declare global {
    interface Array<T> {
        sum(): number;
        max(): number;
    }
}
Array.prototype.sum = function () {
    let _self = this as Array<number>;
    return _self.reduce((acc, current) => {return acc + current;}, 0);
};
Array.prototype.max = function () {
    let _self = this as Array<number>;
    return _self.sort()[_self.length-1];
};
