type Mapper = (a: any) => any;
abstract class _Maybe<T> {
  map(f: Mapper): Maybe<T> {
    return this;
  }

  ap(m: Maybe<T>): Maybe<T> {
    return this;
  }

  getOrElse<U>(orElseVal: U): U {
    return orElseVal;
  }
}

class _Nothing<T> extends _Maybe<T> {
  constructor() {
    super();
  }

  map(f: (a: any) => any): Nothing<T> {
    return this;
  }

  getOrElse<U>(orElseVal: U): U {
    return orElseVal;
  }

  ap(m: Maybe<T>): Nothing<T> {
    return this;
  }
}

class _Just<T> extends _Maybe<T> {
  constructor(private val: any) {
    super();
  }

  map(f: Mapper): Just<T> {
    return Just(f(this.val));
  }

  getOrElse<U>(orElseVal: U): U {
    return this.val;
  }

  ap(m: Maybe<T>): Maybe<T> {
    return m.map(this.val as Mapper);
  }
}

type Maybe<T> = _Maybe<T>;
function Maybe<T>(a?: T): Maybe<T> {
  return a ? Just(a!) : Nothing();
}

type Nothing<T> = _Nothing<T>;
function Nothing<T>(): Nothing<T> {
  return new _Nothing();
}

type Just<T> = _Just<T>;
function Just<T>(a: any): Just<T> {
  return new _Just(a);
}

export { Maybe, Nothing, Just };
