/**
 * Created by shupeng on 2016/9/26.
 */
module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
};
