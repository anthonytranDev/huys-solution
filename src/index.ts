enum RoleTypes {
  BR = 'BR', // 'BREAK',
  PH = 'PH', // 'PHONES',
  CH = 'CH', // 'CHAT',
  HE = 'HE', // 'HELPDESK',
  BA = 'BA', // 'BACK_OFFICE',
  TR = 'TR', // 'TRIAGE',
  TA = 'TR', // 'TRAINING',
  ME = 'ME', // 'MEETINGS',
  RE = 'RE', // 'RECEPTION_COVER',
  NA = 'NA', //  no role assigned
}

interface StudentFacingTally {
  chat: number[];
  helpDesk: number[];
  phone: number[];
}

interface Checker {
  errors?: string[];
}

const endTimes = [
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
];

const evaluateRoles9am5pm = (type: string, count: number[]) =>
  count
    .slice(1, 17)
    .map((slot: number, index: number) => {
      let message = '';

      if (slot < 2) {
        message = `Not enough people for this "${type}" role, requires between 2-4 people at ${endTimes[index]}`;
      }
      if (slot > 4) {
        message = `Too many people for this "${type}" role, requires between 2-4 people at ${endTimes[index]}`;
      }

      return message;
    })
    .filter(Boolean);

const generateStudentFacingTally = (dailyRota: Array<string[]>): StudentFacingTally => {
  const chat = Array(25).fill(0);
  const helpDesk = Array(25).fill(0);
  const phone = Array(25).fill(0);

  for (let i = 0; i < dailyRota.length; i++) {
    const shift = dailyRota[i];

    for (let j = 0; j < shift.length; j++) {
      if (shift[j] === RoleTypes.CH) {
        chat[j] = chat[j] + 1;
      } else if (shift[j] === RoleTypes.HE) {
        helpDesk[j] = helpDesk[j] + 1;
      } else if (shift[j] === RoleTypes.PH) {
        phone[j] = phone[j] + 1;
      }
    }
  }

  return { chat, helpDesk, phone };
};

const checkTally = (tally: StudentFacingTally): Checker => {
  const { chat, phone, helpDesk } = tally;
  let errors = [];

  if (chat[0] < 1) {
    errors.push('Not enough people for this "chat" role, requires at least 1 person at 8:30');
  }

  if (phone[0] < 1) {
    errors.push('Not enough people for this "phone" role, requires at least 1 person at 8:30');
  }

  if (helpDesk[0] < 1) {
    errors.push('Not enough people for this "help desk" role, requires at least 1 person at 8:30');
  }

  console.log(!chat.slice(1, 17).every((slot: number) => slot >= 2 && slot <= 4));

  if (!chat.slice(1, 17).every((slot: number) => slot >= 2 && slot <= 4)) {
    const erroneousEndTimes = evaluateRoles9am5pm('chat', chat);
    errors = [...errors, ...erroneousEndTimes];
  }

  if (!phone.slice(1, 17).every((slot: number) => slot >= 2 && slot <= 4)) {
    const erroneousEndTimes = evaluateRoles9am5pm('phone', phone);
    errors = [...errors, ...erroneousEndTimes];
  }

  if (!helpDesk.slice(1, 17).every((slot: number) => slot >= 2 && slot <= 4)) {
    const erroneousEndTimes = evaluateRoles9am5pm('help desk', helpDesk);
    errors = [...errors, ...erroneousEndTimes];
  }

  return { errors };
};

export { generateStudentFacingTally, checkTally };
export type { RoleTypes };
