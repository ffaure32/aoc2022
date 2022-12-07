declare global {
    interface Array<T> {
        sum(): number;
    }
}
Array.prototype.sum = function () {
    let _self = this as Array<number>;
    return _self.reduce((acc, current) => {return acc + current;}, 0);
};
