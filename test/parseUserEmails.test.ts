import { describe, expect, expectTypeOf, test } from 'vitest';
import { ParsedUserResultType, parseUserEmails } from '../src/parseUserEmails';

describe('parseUserEmails', () => {
  test('parses first name, last name, and email address', () => {
    const input = 'John Doe <jdoe@example.com>';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();
    expect(parsed.values.length).toEqual(1);

    const parsedValue = parsed.values[0];

    const expectedValue = {
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'jdoe@example.com',
    };

    expect(parsedValue).toEqual(expectedValue);
  });

  test('parses names with special characters', () => {
    const input = 'Zsófia Köves-Péchy <zkovespechy@example.com>';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();
    expect(parsed.values.length).toEqual(1);

    const parsedValue = parsed.values[0];

    const expectedValue = {
      firstName: 'Zsófia',
      lastName: 'Köves-Péchy',
      emailAddress: 'zkovespechy@example.com',
    };

    expect(parsedValue).toEqual(expectedValue);
  });

  test('includes middle name as part of first name', () => {
    const input = 'Alice Jones Doe <adoe@example.com>';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();
    expect(parsed.values.length).toEqual(1);

    const parsedValue = parsed.values[0];

    const expectedValue = {
      firstName: 'Alice Jones',
      lastName: 'Doe',
      emailAddress: 'adoe@example.com',
    };

    expect(parsedValue).toEqual(expectedValue);
  });

  test('parses multiple users separated by semicolon', () => {
    const input =
      'Alice Jones <ajones@example.com>; Bob Smith <bsmith@example.com>; Charlie Brown <cbrown@example.com>';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'Alice',
        lastName: 'Jones',
        emailAddress: 'ajones@example.com',
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        emailAddress: 'bsmith@example.com',
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        emailAddress: 'cbrown@example.com',
      },
    ]);
  });

  test('parses multiple users separated by comma', () => {
    const input =
      'Alice Jones <ajones@example.com>, Bob Smith <bsmith@example.com>, Charlie Brown <cbrown@example.com>';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'Alice',
        lastName: 'Jones',
        emailAddress: 'ajones@example.com',
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        emailAddress: 'bsmith@example.com',
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        emailAddress: 'cbrown@example.com',
      },
    ]);
  });

  test('parses multiple users separated by newlines', () => {
    const input = `
    Alice Jones <ajones@example.com>
    Bob Smith <bsmith@example.com>
    Charlie Brown <cbrown@example.com>
    `;
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'Alice',
        lastName: 'Jones',
        emailAddress: 'ajones@example.com',
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        emailAddress: 'bsmith@example.com',
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        emailAddress: 'cbrown@example.com',
      },
    ]);
  });

  test('parses multiple users separated by different separators', () => {
    const input = `
    Alice Jones <ajones@example.com>
    Bob Smith <bsmith@example.com>; Charlie Brown <cbrown@example.com>, Dan Theman <dantheman@example.com>;
    `;
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'Alice',
        lastName: 'Jones',
        emailAddress: 'ajones@example.com',
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        emailAddress: 'bsmith@example.com',
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        emailAddress: 'cbrown@example.com',
      },
      {
        firstName: 'Dan',
        lastName: 'Theman',
        emailAddress: 'dantheman@example.com',
      },
    ]);
  });

  test('parses an email address in angle brackets with no name', () => {
    const input = '<jdoe@example.com>';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: null,
        lastName: null,
        emailAddress: 'jdoe@example.com',
      },
    ]);
  });

  test('parses an email address with no angle brackets and no name', () => {
    const input = 'bsmith@example.com';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: null,
        lastName: null,
        emailAddress: 'bsmith@example.com',
      },
    ]);
  });

  test('parses email and name for emails without angle brackets', () => {
    const input = 'John Doe jdoe@example.com';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'jdoe@example.com',
      },
    ]);
  });

  test('parses name correctly with middle name and email without angle brackets', () => {
    const input = 'John A Doe jdoe@example.com';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'John A',
        lastName: 'Doe',
        emailAddress: 'jdoe@example.com',
      },
    ]);
  });

  test('parses a mixture of emails and names with and without angle brackets', () => {
    const input =
      'John Doe jdoe@example.com; Alice D Smith <asmith@example.com>; Charlie B Jones cjones@example.com';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'jdoe@example.com',
      },
      {
        firstName: 'Alice D',
        lastName: 'Smith',
        emailAddress: 'asmith@example.com',
      },
      {
        firstName: 'Charlie B',
        lastName: 'Jones',
        emailAddress: 'cjones@example.com',
      },
    ]);
  });

  test('returns an error on invalid input', () => {
    const input = 'invalidinput';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeFalsy();
    expect(parsed.values.length).toEqual(0);

    expect(parsed.errors.length).toEqual(1);

    const error = parsed.errors[0];

    expect(error).toEqual('Invalid input: invalidinput');
  });

  test('returns multiple errors for multiple invalid inputs separated by semicolons', () => {
    const input =
      'Valid User <vuser@example.com>; invalid1; Another Valid <avalid@example.com>; invalid2';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeFalsy();

    expect(parsed.values).toEqual([
      {
        firstName: 'Valid',
        lastName: 'User',
        emailAddress: 'vuser@example.com',
      },
      {
        firstName: 'Another',
        lastName: 'Valid',
        emailAddress: 'avalid@example.com',
      },
    ]);

    expect(parsed.errors).toEqual([
      'Invalid input: invalid1',
      'Invalid input: invalid2',
    ]);
  });

  test('accepts duplicate email addresses', () => {
    const input =
      'User One <uone@example.com>; User Two <utwo@example.com>; Duplicate User <uone@example.com>';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'User',
        lastName: 'One',
        emailAddress: 'uone@example.com',
      },
      {
        firstName: 'User',
        lastName: 'Two',
        emailAddress: 'utwo@example.com',
      },
      {
        firstName: 'Duplicate',
        lastName: 'User',
        emailAddress: 'uone@example.com',
      },
    ]);
  });

  test('succeeds for only duplicate email addresses with a semicolon at the end', () => {
    const input = 'User One <uone@example.com>; User Two <uone@example.com>;';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeTruthy();

    expect(parsed.values).toEqual([
      {
        firstName: 'User',
        lastName: 'One',
        emailAddress: 'uone@example.com',
      },
      {
        firstName: 'User',
        lastName: 'Two',
        emailAddress: 'uone@example.com',
      },
    ]);
  });
});
