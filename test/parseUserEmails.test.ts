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

  test('returns an error on invalid input', () => {
    const input = 'invalidinput';
    const parsed = parseUserEmails(input);

    expect(parsed.success).toBeFalsy();
    expect(parsed.values.length).toEqual(0);

    expect(parsed.errors.length).toEqual(1);

    const error = parsed.errors[0];

    expect(error).toEqual('invalidinput');
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

    expect(parsed.errors).toEqual(['invalid1', 'invalid2']);
  });
});
