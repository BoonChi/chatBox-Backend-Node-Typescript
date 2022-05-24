import appConfig from '@config/app.config';
import { Column, ColumnOptions, ColumnType } from 'typeorm';

const mysqlSqliteTypeMapping: { [key: string]: ColumnType } = {
  mediumtext: 'text',
  timestamp: 'datetime',
  mediumblob: 'blob',
};

export function resolveDbType(mySqlType: ColumnType): ColumnType {
  if (appConfig.isTest) {
    return mysqlSqliteTypeMapping[mySqlType.toString()];
  }
  return mySqlType;
}

export function DbAwareColumn(columnOptions: ColumnOptions) {
  if (columnOptions.type) {
    columnOptions.type = resolveDbType(columnOptions.type);
  }
  return Column(columnOptions);
}
