const { expect } = require('chai');
const { sortTime, sortDate, moreRecent, onGoingWithTag, getUniqueTags, getRandomID } = require('../app');

//tests for sortTime(arg1, arg2)
//arg1: string with format XX:XX:XX or X:XX:XX
//arg2: string with format XX:XX:XX or X:XX:XX
//return value: -1 if arg1's time is more recent than arg2's,
//1 if arg2's is more recent, or zero if they are equal
describe('sortTime - basic functionality', () => {
    it('returns 0 when times are equal with same format', () => {
        const expected = 0;
        const actual = sortTime("55:33:22", "55:33:22");
        expect(actual).to.be.eq(expected);
    });
    it('returns 0 when times are equal with extra chars', () => {
        const expected = 0;
        const actual = sortTime("0:00:00", "00:00:00");
        expect(actual).to.be.eq(expected);
    })
    it('returns 0 when times are equal with less chars', () => {
        const expected = 0;
        const actual = sortTime("01:59:59", "1:59:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when first section is bigger', () => {
        const expected = -1;
        const actual = sortTime("12:59:59", "11:59:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when second section is bigger', () => {
        const expected = -1;
        const actual = sortTime("02:59:59", "2:40:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 when thrid section is bigger', () => {
        const expected = -1;
        const actual = sortTime("02:59:59", "2:40:17");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 when first section is smaller', () => {
        const expected = 1;
        const actual = sortTime("7:59:59", "11:59:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 when second section is smaller', () => {
        const expected = 1;
        const actual = sortTime("02:00:59", "2:40:59");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 when thrid section is smaller', () => {
        const expected = 1;
        const actual = sortTime("02:59:01", "2:59:17");
        expect(actual).to.be.eq(expected);
    })
});

//tests for sortDate(arg1, arg2)
//arg1: string with format: YYYY-MM-DD
//arg2: string with format: YYYY-MM-DD
//output: returns -1 if arg1's date is more recent than arg2's,
//1 if arg2's date is more recent, and zero if they are the 
//same date
describe('sortDate - basic functionality', () => {
    it('returns -1 if arg1 has a more recent year', () => {    
        const expected = -1;
        const actual = sortDate("1989-04-12", "1988-04-12");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 if arg2 has a more recent year', () => {    
        const expected = 1;
        const actual = sortDate("2001-04-12", "2003-04-12");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 if both have same year but arg1 has a more recent month', () => {    
        const expected = -1;
        const actual = sortDate("2001-06-12", "2001-04-12");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 if both have same year but arg2 has a more recent month', () => {    
        const expected = 1;
        const actual = sortDate("2001-06-12", "2001-11-12");
        expect(actual).to.be.eq(expected);
    })
    it('returns -1 if both have same year & month but arg1 has a more recent day', () => {    
        const expected = -1;
        const actual = sortDate("2001-04-14", "2001-04-12");
        expect(actual).to.be.eq(expected);
    })
    it('returns 1 if both have same year & month but arg2 has a more recent day', () => {    
        const expected = 1;
        const actual = sortDate("2001-04-12", "2001-04-16");
        expect(actual).to.be.eq(expected);
    })
    it('returns 0 if both have same year & month & day', () => {    
        const expected = 0;
        const actual = sortDate("2001-04-12", "2001-04-12");
        expect(actual).to.be.eq(expected);
    })
    it('returns 0 on 0 edge case', () => {    
        const expected = 0;
        const actual = sortDate("0000-00-00", "0000-00-00");
        expect(actual).to.be.eq(expected);
    })
});

//tests for mostRecent
//arg1: ISO date with format: YYYY-MM-DDTXX:XX:XX.ETC
describe('mostRecent - basic functionality', () => {
    it('returns -1 when arg1 is a more recent date & time', () => {
        const expected = -1;
        const actual = moreRecent('2001-04-16T11:59:59.856Z', '1989-04-12T7:59:59.856Z');
    })
    it('returns 1 when arg2 is a more recent date & time', () => {
        const expected = 1;
        const actual = moreRecent('2001-04-12T7:59:59.856Z', '2001-04-12T11:59:59.856Z');
    })
    it('returns 0 when arg1 * arg2 have the same date & time', () => {
        const expected = 0;
        const actual = moreRecent('1986-09-17T01:01:00.856Z', '1986-09-17T01:01:00.856Z');
    })
    it('returns 0 on 0 edge case', () => {
        const expected = 0;
        const actual = moreRecent('0000-00-00T00:00:00.856Z', '0000-00-00T00:00:00.856Z');
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

//tests for getUniqueTags(callArray)
//input: array of calls with field call.callTag
//output: a list of strings with all the unique callTags
describe('getUniqueTags - basic functionality', () => {
    it('returns an empty list if given empty json array', () => {
        const expected = {};
        const actual = getUniqueTags([]);
        expect(Object.keys(actual).length).to.be.eq(Object.keys(expected).length);
    });
    it('returns just one of each tag in the event of duplicates', () => {
        const arg = [
            {
                "callTitle": 'call1',
                "callTag": 'red'
            },
            {
                "callTitle": 'call2',
                "callTag": 'red'
            },
            {
                "callTitle": 'call3',
                "callTag": 'blue'
            }
        ]
        const expected = { red: 2, blue: 1 };
        const actual = getUniqueTags(arg);
        expect(actual.green).to.be.eq(expected.green);
        expect(actual.red).to.be.eq(expected.red);
        expect(actual.blue).to.be.eq(expected.blue);
        expect(Object.keys(actual).length).to.be.eq(Object.keys(expected).length);
    });
    it('edge case, returns just one tag with many calls of same tag', () => {
        const arg = [
            {
                "callTitle": 'call1',
                "callTag": 'green'
            },
            {
                "callTitle": 'call2',
                "callTag": 'green'
            },
            {
                "callTitle": 'call3',
                "callTag": 'green'
            }
        ]
        const expected = { green: 3 };
        const actual = getUniqueTags(arg);
        expect(actual.green).to.be.eq(expected.green);
        expect(actual.red).to.be.eq(expected.red);
        expect(Object.keys(actual).length).to.be.eq(Object.keys(expected).length);
    });
});

//tests for getRandomID(callList)
//input: array of calls with field call.callID
//output: a random ID from the list, or the string "noongoingcalls" if there are no calls
describe('getRandomID - basic functionality', () => {
    it('returns "noongoingcalls" if there are no calls', () => {
        const expected = "noongoingcalls";
        const actual = getRandomID([]);
        expect(actual).to.be.eq(expected);
    });
    it('returns the id of the only call if there is just one call', () => {
        const arg = [
            {
                "callTitle": 'call1',
                "callID": '23',
                "onGoing": true
            }
        ]
        const expected = '23';
        const actual = getRandomID(arg);
        expect(actual).to.be.eq(expected);
    });
    it('returns the id of one of the calls if there are multiple calls', () => {
        const arg = [
            {
                "callTitle": 'call1',
                "callID": '21',
                "onGoing": true
            },
            {
                "callTitle": 'call2',
                "callID": '25',
                "onGoing": true
            },
            {
                "callTitle": 'call3',
                "callID": '29',
                "onGoing": true
            },
            {
                "callTitle": 'call3',
                "callID": '50',
                "onGoing": false
            }
        ]
        const expectedLowBound = "20";
        const expectedUpperBound = "30";
        const actual = getRandomID(arg);
        expect(parseInt(actual)).to.be.greaterThan(parseInt(expectedLowBound));
        expect(parseInt(actual)).to.be.lessThan(parseInt(expectedUpperBound));
    });
    it('returns "noongoingcalls" if all calls are ended', () => {
        const arg = [
            {
                "callTitle": 'call1',
                "callID": '21',
                "onGoing": false
            },
            {
                "callTitle": 'call2',
                "callID": '25',
                "onGoing": false
            },
            {
                "callTitle": 'call3',
                "callID": '29',
                "onGoing": false
            }
        ]
        const expected = "noongoingcalls";
        const actual = getRandomID(arg);
        expect(actual).to.be.eq(expected);
    });
});