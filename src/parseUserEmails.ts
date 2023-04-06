export enum ParsedUserResultType {
  Error = 'error',
  Success = 'success',
}

export interface ParsedUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export type ParsedUserError = {
  type: ParsedUserResultType.Error;
  value: string;
};

export type ParsedUserSuccess = {
  type: ParsedUserResultType.Success;
  value: ParsedUser;
};

export type ParsedUserResult = ParsedUserSuccess | ParsedUserError;

// prettier-ignore
const parseRegExp = RegExp(
  // start of string
  '^' +

  // first and middle names
  '((?:\\S *)+) ' +

  // last name
  '(\\S+) ' +

  // email address
  '<(.+@.+)>' +

  // end of string
  '$'
);

function parseUserEmail(input: string): ParsedUserResult {
  const matches = input.match(parseRegExp);

  if (!matches)
    return {
      type: ParsedUserResultType.Error,
      value: input,
    };

  return {
    type: ParsedUserResultType.Success,
    value: {
      firstName: matches[1],
      lastName: matches[2],
      emailAddress: matches[3],
    },
  };
}

export interface ParseUserEmailsResult {
  success: boolean;
  values: Array<ParsedUser>;
  errors: Array<string>;
}

export function parseUserEmails(input: string): ParseUserEmailsResult {
  const resultArr = input.split(';').map((str) => parseUserEmail(str.trim()));

  const initialValue: ParseUserEmailsResult = {
    success: true,
    values: [],
    errors: [],
  };

  return input.split(';').reduce((acc, str) => {
    const parsed = parseUserEmail(str.trim());

    if (parsed.type == ParsedUserResultType.Error) {
      acc.success = false;
      acc.errors.push(parsed.value);
    } else {
      acc.values.push(parsed.value);
    }

    return acc;
  }, initialValue);
}
