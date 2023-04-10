export enum ParsedUserResultType {
  Error = 'error',
  Success = 'success',
}

export interface ParsedUser {
  firstName: string | null;
  lastName: string | null;
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

const emailOnlyRegExp = /<?(.+@[^>]+)>?/;

function parseUserEmail(input: string): ParsedUserResult {
  const matches = input.match(parseRegExp);

  if (!matches) {
    // try matching as email address with no name
    const emailMatch = input.match(emailOnlyRegExp);

    if (emailMatch) {
      return {
        type: ParsedUserResultType.Success,
        value: {
          firstName: null,
          lastName: null,
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
  const emailAddressesSet = new Set<string>();
  const duplicateEmailAddressesSet = new Set<string>();

  parseResult.values.forEach((v) => {
    if (emailAddressesSet.has(v.emailAddress)) {
      duplicateEmailAddressesSet.add(v.emailAddress);
    } else {
      emailAddressesSet.add(v.emailAddress);
    }
  });

  const duplicateEmailAddressesArr = Array.from(duplicateEmailAddressesSet);

  if (duplicateEmailAddressesArr.length === 0) {
    return parseResult;
  }

  return {
    ...parseResult,
    success: false,
    values: parseResult.values.filter(
      (v) => !duplicateEmailAddressesSet.has(v.emailAddress)
    ),
    errors: [
      ...parseResult.errors,
      ...duplicateEmailAddressesArr.map((e) => `Duplicate email: ${e}`),
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
