import { expect } from 'chai';
import { moreRecent } from './RecentCallsPage';

//tests for moreRecent(arg1, arg2)
//arg1: string with format XX:XX:XX or X:XX:XX
//arg2: string with format XX:XX:XX or X:XX:XX
//return value: 1 if arg1's time is more recent than arg2's,
//-1 if arg2's is more recent, or zero if they are equal
describe('moreRecent - basic functionality', () => {
    it('returns 0 when times are equal', () => {
        const expected = 0;
        const actual = moreRecent("55:33:22", "55:33:22");
        expect(actual).to.deep.equal(expected);
    })/*
    it('returns 0 when times are equal', () => {
        const expected = 0;
        const actual = moreRecent("00:00:00", "00000:00:00");
        expect(actual).to.equal(expected);
    })*/
})


