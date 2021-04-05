const { expect } = require('chai');
const { moreRecent } = require('../app');
import { moreRecent } from './app';

//tests for moreRecent(arg1, arg2)
//arg1: string with format XX:XX:XX or X:XX:XX
//arg2: string with format XX:XX:XX or X:XX:XX
//return value: 1 if arg1's time is more recent than arg2's,
//-1 if arg2's is more recent, or zero if they are equal
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
    it('returns 1 when first section is bigger', () => {
        const expected = 1;
        const actual = moreRecent("12:59:59", "11:59:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 when second section is bigger', () => {
        const expected = 1;
        const actual = moreRecent("02:59:59", "2:40:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 when thrid section is bigger', () => {
        const expected = 1;
        const actual = moreRecent("02:59:59", "2:40:17");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when first section is smaller', () => {
        const expected = -1;
        const actual = moreRecent("7:59:59", "11:59:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when second section is smaller', () => {
        const expected = -1;
        const actual = moreRecent("02:00:59", "2:40:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when thrid section is smaller', () => {
        const expected = -1;
        const actual = moreRecent("02:59:01", "2:59:17");
        expect(actual).to.be.eq(expected);
    })
});
