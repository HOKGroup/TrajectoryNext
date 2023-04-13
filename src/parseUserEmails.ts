import { titleCase } from 'title-case';

export enum ParsedUserResultType {
  Error = 'error',
  Success = 'success',
}

interface ParsedName {
  firstName: string | null;
  lastName: string | null;
}

export type ParsedUser = {
  emailAddress: string;
} & ParsedName;

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
  '<?([^\\s<>]+@[^\\s<>]+)>?' +

  // end of string
  '$'
);

const emailOnlyRegExp = /<?([^\s<]+@[^>\s]+)>?/;

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

function parseNameFromEmail(emailAddress: string): ParsedName {
  const namePart = emailAddress.split('@')[0];
  const splitName = namePart.split('.');

  const titleCased = splitName.map(titleCase);

  if (!titleCased.length) {
    return {
      firstName: null,
      lastName: null,
    };
  } else if (titleCased.length === 1) {
    return {
      firstName: null,
      lastName: titleCased[0],
    };
  }

  const firstName = titleCased.slice(0, titleCased.length - 1).join(' ');
  const lastName = titleCased[titleCased.length - 1];

  return {
    firstName,
    lastName,
  };
}

export interface ParseUserEmailsResult {
  success: boolean;
  values: Array<ParsedUser>;
  errors: Array<string>;
}

const splitRegex = /[;\n,]/;

export function parseUserEmails(input: string): ParseUserEmailsResult {
  const initialValue: ParseUserEmailsResult = {
    success: true,
    values: [],
    errors: [],
  };

  const parsed = input
    .split(splitRegex)
    .map((str) => str.trim())
    .filter((str) => str.length > 0)
    .reduce((acc, str) => {
      const parsed = parseUserEmail(str);

      if (parsed.type == ParsedUserResultType.Error) {
        acc.success = false;
        acc.errors.push(parsed.value);
      } else {
        if (!parsed.value.firstName && !parsed.value.lastName) {
          parsed.value = {
            ...parsed.value,
            ...parseNameFromEmail(parsed.value.emailAddress),
          };
        }
        acc.values.push(parsed.value);
      }

      return acc;
    }, initialValue);

  return parsed;
}
