import { generateStudentFacingTally, checkTally } from './index';

const exampleDailyRota1: Array<string[]> = [
  ['PH', 'PH', 'PH', 'BA', 'BA', 'TA', 'TA', 'BR', 'BR', 'BA', 'BA', 'HE', 'HE', 'PH', 'PH', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['HE', 'RE', 'RE', 'HE', 'HE', 'CH', 'CH', 'CH', 'CH', 'BR', 'BR', 'HE', 'HE', 'HE', 'HE', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['CH', 'CH', 'CH', 'CH', 'CH', 'PH', 'PH', 'PH', 'PH', 'BR', 'BR', 'PH', 'PH', 'BA', 'BA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['PH', 'PH', 'PH', 'BA', 'BA', 'PH', 'PH', 'BR', 'BR', 'PH', 'PH', 'PH', 'PH', 'BA', 'BA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'HE', 'HE', 'PH', 'PH', 'CH', 'CH', 'PH', 'PH', 'HE', 'HE', 'BR', 'BR', 'CH', 'CH', 'HE', 'HE', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'CH', 'CH', 'CH', 'CH', 'BA', 'BA', 'HE', 'HE', 'BR', 'BR', 'HE', 'HE', 'RE', 'RE', 'CH', 'CH', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'TR', 'TR', 'TR', 'TR', 'BA', 'BA', 'BA', 'BA', 'BR', 'BR', 'BA', 'BA', 'TR', 'TR', 'TR', 'TR', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'HE', 'HE', 'HE', 'HE', 'BA', 'BA', 'BA', 'BA', 'BR', 'BR', 'RE', 'RE', 'HE', 'HE', 'HE', 'HE', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'TR', 'TR', 'TR', 'TR', 'HE', 'HE', 'HE', 'HE', 'BR', 'BR', 'RE', 'RE', 'HE', 'HE', 'CH', 'CH', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'NA', 'NA', 'CH', 'CH', 'CH', 'CH', 'TR', 'TR', 'PH', 'PH', 'BR', 'BR', 'CH', 'CH', 'PH', 'PH', 'PH', 'PH', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'NA', 'NA', 'HE', 'HE', 'HE', 'HE', 'CH', 'CH', 'RE', 'RE', 'BR', 'BR', 'HE', 'HE', 'ME', 'ME', 'HE', 'HE', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'NA', 'NA', 'PH', 'PH', 'HE', 'HE', 'RE', 'RE', 'HE', 'HE', 'BR', 'BR', 'CH', 'CH', 'HE', 'HE', 'CH', 'CH', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'NA', 'NA', 'PH', 'PH', 'PH', 'PH', 'HE', 'HE', 'TR', 'TR', 'BR', 'BR', 'PH', 'PH', 'CH', 'CH', 'HE', 'HE', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
  ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'CH', 'CH', 'CH', 'CH', 'PH', 'PH', 'BR', 'BR', 'PH', 'PH', 'TR', 'TR', 'PH', 'PH', 'BA', 'BA'],
  ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'BA', 'BA', 'PH', 'PH', 'PH', 'PH', 'BR', 'BR', 'TR', 'TR', 'PH', 'PH', 'CH', 'CH', 'PH', 'PH'],
  ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'PH', 'PH', 'CH', 'CH', 'CH', 'CH', 'PH', 'PH', 'BR', 'BR', 'PH', 'PH', 'CH', 'CH', 'PH', 'PH'],
  ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'CH', 'CH', 'TR', 'TR', 'TR', 'TR', 'BR', 'BR', 'CH', 'CH', 'CH', 'CH', 'PH', 'PH', 'CH', 'CH'],
];

const studentFacingRoleTally = {
  chat: [1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1],
  helpDesk: [1, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0],
  phone: [2, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
};

describe('start', () => {
  it('should return an array of numbers between 1 and 4', () => {
    const studentFacing = generateStudentFacingTally(exampleDailyRota1);

    expect(studentFacing).toEqual(studentFacingRoleTally);
  });

  it.each([
    [
      '0 people on "chat" role between 8:30am - 9:00am',
      ['Not enough people for this "chat" role, requires at least 1 person at 8:30'],
      { ...studentFacingRoleTally, chat: [0, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      '0 people on "phone" role between 8:30am - 9:00am',
      ['Not enough people for this "phone" role, requires at least 1 person at 8:30'],
      { ...studentFacingRoleTally, phone: [0, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      '0 people on "help desk" role between 8:30am - 9:00am',
      ['Not enough people for this "help desk" role, requires at least 1 person at 8:30'],
      { ...studentFacingRoleTally, helpDesk: [0, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      '0 people on all roles between 8:30am - 9:00am',
      [
        'Not enough people for this "chat" role, requires at least 1 person at 8:30',
        'Not enough people for this "phone" role, requires at least 1 person at 8:30',
        'Not enough people for this "help desk" role, requires at least 1 person at 8:30',
      ],
      {
        chat: [0, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1],
        helpDesk: [0, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0],
        phone: [0, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      },
    ],
    [
      '1 person on role "chat" between 9am - 5pm',
      ['Not enough people for this "chat" role, requires between 2-4 people at 14:30'],
      { ...studentFacingRoleTally, chat: [1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      '1 person on role "phone" between 9am - 5pm',
      ['Not enough people for this "phone" role, requires between 2-4 people at 14:30'],
      { ...studentFacingRoleTally, phone: [1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      '1 person on role "help desk" between 9am - 5pm',
      ['Not enough people for this "help desk" role, requires between 2-4 people at 14:30'],
      { ...studentFacingRoleTally, helpDesk: [1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      '5 people on role "chat" between 9am - 5pm',
      ['Too many people for this "chat" role, requires between 2-4 people at 14:30'],
      { ...studentFacingRoleTally, chat: [1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 5, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      '5 people on role "phone" between 9am - 5pm',
      ['Too many people for this "phone" role, requires between 2-4 people at 14:30'],
      { ...studentFacingRoleTally, phone: [1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 5, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      '5 people on role "help desk" between 9am - 5pm',
      ['Too many people for this "help desk" role, requires between 2-4 people at 14:30'],
      { ...studentFacingRoleTally, helpDesk: [1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 5, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1] },
    ],
    [
      'mulitple end times and roles 9am - 5pm',
      [
        'Too many people for this "chat" role, requires between 2-4 people at 8:30',
        'Too many people for this "phone" role, requires between 2-4 people at 9:30',
        'Not enough people for this "help desk" role, requires between 2-4 people at 9:00',
      ],
      {
        chat: [1, 5, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 3, 3, 2, 2, 1, 1, 2, 2, 1, 1],
        helpDesk: [1, 2, 1, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0],
        phone: [2, 2, 2, 5, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      },
    ],
  ])('errors when %s with expected error message', (_, errorMessages, tally) => {
    const { errors } = checkTally(tally);
    expect(errors).toEqual(errorMessages);
  });
});

// Solution
// Input - the Shifts for the entire day
// Output - rota types slots for student facing roles for entire day

// 4 people number of timeslots
// generates 1-6 - different role types
// append zero <empty> slots
//
