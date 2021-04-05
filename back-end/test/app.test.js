const { expect } = require('chai');
const { moreRecent, onGoingWithTag } = require('../app');

//tests for moreRecent(arg1, arg2)
//arg1: string with format XX:XX:XX or X:XX:XX
//arg2: string with format XX:XX:XX or X:XX:XX
//return value: -1 if arg1's time is more recent than arg2's,
//1 if arg2's is more recent, or zero if they are equal
describe('moreRecent - basic functionality', () => {
    it('returns 0 when times are equal with same format', () => {
        const expected = 0;
        const actual = moreRecent("55:33:22", "55:33:22");
        expect(actual).to.be.eq(expected);
    });
    it('returns 0 when times are equal with extra chars', () => {
        const expected = 0;
        const actual = moreRecent("0:00:00", "00:00:00");
        expect(actual).to.be.eq(expected);
    })
    it('returns 0 when times are equal with less chars', () => {
        const expected = 0;
        const actual = moreRecent("01:59:59", "1:59:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when first section is bigger', () => {
        const expected = -1;
        const actual = moreRecent("12:59:59", "11:59:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when second section is bigger', () => {
        const expected = -1;
        const actual = moreRecent("02:59:59", "2:40:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when thrid section is bigger', () => {
        const expected = -1;
        const actual = moreRecent("02:59:59", "2:40:17");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 when first section is smaller', () => {
        const expected = 1;
        const actual = moreRecent("7:59:59", "11:59:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 when second section is smaller', () => {
        const expected = 1;
        const actual = moreRecent("02:00:59", "2:40:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 when thrid section is smaller', () => {
        const expected = 1;
        const actual = moreRecent("02:59:01", "2:59:17");
        expect(actual).to.be.eq(expected);
    })
});

// tests for onGoingWithTag(call, store)
//recieves a call JSON object and a string and returns
//true if the onGoing field is true and the call's tag matches the
//string given in the argument 'store'
describe('onGoingWithTag - basic functionality', () => {
    it('returns false if not ongoing and mismatched tag', () => {
        const expected = false;
        const actual = onGoingWithTag({ "callTag":"Red", "onGoing":false} , "Blue");
        expect(actual).to.be.eq(expected);
    });
    it('returns false if ongoing and mismatched tag', () => {
        const expected = false;
        const actual = onGoingWithTag({ "callTag":"Red", "onGoing":true} , "Blue");
        expect(actual).to.be.eq(expected);
    });
    it('returns false if not ongoing and matching tag', () => {
        const expected = false;
        const actual = onGoingWithTag({ "callTag":"Blue", "onGoing":false} , "Blue");
        expect(actual).to.be.eq(expected);
    });
    it('returns true if ongoing and matching tag', () => {
        const expected = true;
        const actual = onGoingWithTag({ "callTag":"aligators", "onGoing":true} , "aligators");
        expect(actual).to.be.eq(expected);
    });
    it('returns true if ongoing and matching tag emptystring ', () => {
        const expected = true;
        const actual = onGoingWithTag({ "callTag":"", "onGoing":true} , "");
        expect(actual).to.be.eq(expected);
    });
    it('returns false if ongoing and matching tag but different case', () => {
        const expected = false;
        const actual = onGoingWithTag({ "callTag":"aLigAtors", "onGoing":true} , "aliGatorS");
        expect(actual).to.be.eq(expected);
    });
});