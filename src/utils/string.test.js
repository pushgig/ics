import { expect } from 'chai';
import {
  escape,
  quote,
  unquote,
  shouldQuote,
  joinLines,
  foldLine,
  customPropertyName,
  LINE_MAX_LENGTH,
} from './string';

describe('ics/utils/string', () => {
  it('should escape a string', () => {
    expect(escape(';XXX;')).to.equal('\\;XXX\\;');
    expect(escape(',XXX,')).to.equal('\\,XXX\\,');
    expect(escape('"XXX"')).to.equal('\\"XXX\\"');
    expect(escape('\\\\XXX\\\\')).to.equal('\\\\\\\\XXX\\\\\\\\');
    expect(escape('\nXXX\n\n')).to.equal('\\nXXX\\n\\n');
  });

  it('should quote a string', () => {
    expect(quote('XXX')).to.equal('"XXX"');
    expect(quote('"XXX"')).to.equal('"XXX"');
    expect(quote("'")).to.equal('"\'"');
  });

  it('should unquote a string', () => {
    expect(unquote('"XXX"')).to.equal('XXX');
    expect(unquote('""XXX""')).to.equal('"XXX"');
    expect(unquote('"\'"')).to.equal("'");
  });

  it('should check if a string should be quoted', () => {
    expect(shouldQuote('XXX')).to.equal(false);
    expect(shouldQuote('XX;X')).to.equal(true);
    expect(shouldQuote(':XXX')).to.equal(true);
    expect(shouldQuote(':XXX')).to.equal(true);
    expect(shouldQuote('XXX,')).to.equal(true);
    expect(shouldQuote('💩')).to.equal(true);
    expect(shouldQuote('"XXX')).to.equal(false);
  });

  it('should join lines', () => {
    expect(joinLines(['XXX', null, 'XXX', false, 'XXX', undefined, ''])).to.equal(
      'XXX\r\nXXX\r\nXXX',
    );
  });

  it('should join lines with trailing newline', () => {
    expect(joinLines(['XXX', null, 'XXX', false, 'XXX', undefined, ''], true)).to.equal(
      'XXX\r\nXXX\r\nXXX\r\n',
    );
  });

  it('should trim joined lines', () => {
    expect(joinLines(['XXX  ', '  ', '   XXX', false, 'XXX  ', undefined, ' '], true)).to.equal(
      'XXX\r\nXXX\r\nXXX\r\n',
    );
  });

  it('should fold long lines', () => {
    const count = 200;
    const repeated = 'X'.repeat(count);
    const content = `DESCRIPTION:${repeated}`;
    const folded = foldLine(content);
    const lines = folded.split('\r\n\t');

    expect(lines.length).to.equal(Math.ceil(count / LINE_MAX_LENGTH));
  });

  it('should convert a key to a custom prop name', () => {
    expect(customPropertyName('prefix', 'key')).to.equal('X-PREFIX-KEY');
    expect(customPropertyName('testPrefix', 'testKey')).to.equal('X-TESTPREFIX-TESTKEY');
  });
});
