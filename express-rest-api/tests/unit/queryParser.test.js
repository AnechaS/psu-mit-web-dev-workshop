const queryParser = require('../../utils/queryParser');

describe('queryParser', () => {
  it('should return object when query is empty', () => {
    expect(queryParser({})).toEqual({});
  });

  it('ignores keys that are not whitelisted', () => {
    let query = {
      foo: 'bar',
    };

    expect(queryParser(query)).toEqual({});
  });

  it('should return object when where key is valid json', () => {
    const query = {
      where: '{"foo":"bar"}',
    };

    expect(queryParser(query)).toEqual({ where: { foo: 'bar' } });
  });

  it('should error when where key invalid json', () => {
    const query = {
      where: 'abc',
    };

    expect(() => queryParser(query)).toThrow(
      '"where" must be a json'
    );
  });

  it('should return object when sort key is valid json', () => {
    let query = {
      sort: '{"foo":"bar"}',
    };

    expect(queryParser(query)).toEqual({ sort: JSON.parse(query.sort) });
  });

  it('should return when sort key is a string', () => {
    let query = {
      sort: 'foo',
    };
    expect(queryParser(query)).toEqual(query);
  });

  it('should return when skip key is a string', () => {
    let query = {
      skip: '1',
    };
    expect(queryParser(query)).toEqual({ skip: 1 });
  });

  it('should return when limit key is a string', () => {
    let query = {
      limit: '1',
    };

    expect(queryParser(query)).toEqual({ limit: 1 });
  });

  it('should return when distinct key is a string', () => {
    let query = {
      distinct: 'foo',
    };

    expect(queryParser(query)).toEqual(query);
  });

  it('should return when populate key is a string', () => {
    let query = {
      populate: 'foo',
    };

    expect(queryParser(query)).toEqual({
      populate: [
        {
          path: 'foo',
        },
      ],
    });
  });
});
