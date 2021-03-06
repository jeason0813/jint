/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-b-10.js
 * @description Array.prototype.reduceRight - deleting property of prototype in step 8 causes deleted index property not to be visited on an Array-like Object
 */


function testcase() {

        var accessed = false;
        var testResult = true;

        function callbackfn(preVal, val, idx, obj) {
            accessed = true;
            if (idx === 3) {
                testResult = false;
            }
        }

        var obj = { 2: 2, length: 20 };

        Object.defineProperty(obj, "5", {
            get: function () {
                delete Object.prototype[3];
                return 0;
            },
            configurable: true
        });

        try {
            Object.prototype[3] = 1;
            Array.prototype.reduceRight.call(obj, callbackfn);
            return testResult && accessed;
        } finally {
            delete Object.prototype[3];
        }
    }
runTestCase(testcase);
