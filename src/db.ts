import {
  PostgresDialect,
  Kysely,
  Generated,
  Insertable,
  KyselyPlugin,
  PluginTransformResultArgs,
  UnknownRow,
  QueryResult,
  PluginTransformQueryArgs,
  RootOperationNode,
  ColumnType,
} from 'kysely';
import { Pool } from 'pg';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'postgres',
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    port: 5001,
    max: 10,
  }),
});

const convertNullToUndefined = <T>(object: T): T => {
  const newObject: T = {} as T;

  for (const key in object) {
    const value = object[key];

    if (value === null) {
      newObject[key] = undefined as unknown as T[typeof key];
      continue;
    }

    if (value instanceof Date) {
      newObject[key] = value;
      continue;
    }

    if (typeof value === 'object') {
      newObject[key] = convertNullToUndefined(value);
      continue;
    }

    newObject[key] = value;
  }

  return newObject;
};

export const BOOK_TABLE_NAME = 'public.book';

type BookTable = {
  bookId: Generated<number>;
  title: string;
  author: string | undefined;
  createdAt: Date;
};

type Database = {
  [BOOK_TABLE_NAME]: BookTable;
};

export type InsertableBookTable = Insertable<BookTable>;

class NullToUndefinedConversionPlugin implements KyselyPlugin {
  transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
    return args.node;
  }

  async transformResult(
    args: PluginTransformResultArgs,
  ): Promise<QueryResult<UnknownRow>> {
    if (args.result.rows && Array.isArray(args.result.rows)) {
      return {
        ...args.result,
        rows: args.result.rows.map((row) => convertNullToUndefined(row)),
      };
    }

    return args.result;
  }
}

export const db = new Kysely<Database>({
  dialect,
  log: console.log,
  plugins: [new NullToUndefinedConversionPlugin()],
});
