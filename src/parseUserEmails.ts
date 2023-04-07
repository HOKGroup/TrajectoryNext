import groupBy from 'lodash/groupBy';
import pickBy from 'lodash/pickBy';

export enum ParsedUserResultType {
  Error = 'error',
  Success = 'success',
}

export interface ParsedUser {
  firstName: string | undefined;
  lastName: string | undefined;
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

  if (!matches) {
    // try matching as email address with no name
    const emailMatch = input.match(/<?(.+@[^>]+)>?/);

    if (emailMatch) {
      return {
        type: ParsedUserResultType.Success,
        value: {
          firstName: undefined,
          lastName: undefined,
          emailAddress: emailMatch[1],
        },
      };
    }

    return {
      type: ParsedUserResultType.Error,
      value: `Invalid input: ${input}`,
    };
  }

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

function validateUniqueEmails(parseResult: ParseUserEmailsResult) {
  const grouped = groupBy(parseResult.values, (v) => v.emailAddress);
  const duplicates = pickBy(grouped, (x) => x.length > 1);

  const duplicateEmailAddresses = Object.keys(duplicates);

  if (duplicateEmailAddresses.length === 0) {
    return parseResult;
  }

  return {
    ...parseResult,
    success: false,
    values: parseResult.values.filter((v) => !duplicates[v.emailAddress]),
    errors: [
      ...parseResult.errors,
      ...duplicateEmailAddresses.map((e) => `Duplicate email: ${e}`),
    ],
  };
}

export function parseUserEmails(input: string): ParseUserEmailsResult {
  const initialValue: ParseUserEmailsResult = {
    success: true,
    values: [],
    errors: [],
  };

  const parsed = input
    .split(';')
    .map((str) => str.trim())
    .filter((str) => str.length > 0)
    .reduce((acc, str) => {
      const parsed = parseUserEmail(str);

      if (parsed.type == ParsedUserResultType.Error) {
        acc.success = false;
        acc.errors.push(parsed.value);
      } else {
        acc.values.push(parsed.value);
      }

      return acc;
    }, initialValue);

  return validateUniqueEmails(parsed);
}
