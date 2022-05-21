import * as yup from 'yup';
import { parse } from 'query-string';
import { Location } from 'react-router-dom';

export declare type ParamType = Record<string, string | string[] | number | number[]>;

export const parseParams = <E extends ParamType>(location: Location, schema: yup.SchemaOf<E>) => {
  const params: any = parse(location.search, { parseNumbers: true, parseBooleans: true });
  Object.entries(schema.fields).forEach(([fieldName, field]) => {
    if (field.type === 'array') {
      if (!params[fieldName]) {
        params[fieldName] = [];
      } else if (!Array.isArray(params[fieldName])) {
        params[fieldName] = [params[fieldName]];
      }

      params[fieldName] = params[fieldName].filter((item) => field.isValidSync([item]));

      if (params[fieldName].length === 0) {
        params[fieldName] = field.getDefault() || [];
      } else {
        params[fieldName] = field.cast(params[fieldName]);
      }
    } else {
      if (Array.isArray(params[fieldName])) {
        params[fieldName] = params[fieldName][0];
      }

      if (params[fieldName] == null || !field.isValidSync(params[fieldName])) {
        params[fieldName] = field.getDefault();
      } else {
        params[fieldName] = field.cast(params[fieldName]);
      }
    }
  });

  return params as E;
};

export const generateEncodedUrl = (url: string, params: ParamType) => {
  let joinedUrl = `${url}`;
  let paramAdded = false;

  Object.entries(params).forEach(([paramName, paramVal]) => {
    if (Array.isArray(paramVal)) {
      Object.values(paramVal).forEach((val) => {
        const joinKey = paramAdded ? '&' : '?';
        joinedUrl = `${joinedUrl}${joinKey}${paramName}=${val}`;
        paramAdded = true;
      });
    } else {
      const joinKey = paramAdded ? '&' : '?';
      if (paramVal !== '') {
        joinedUrl = `${joinedUrl}${joinKey}${paramName}=${paramVal}`;
        paramAdded = true;
      }
    }
  });

  return joinedUrl;
};
