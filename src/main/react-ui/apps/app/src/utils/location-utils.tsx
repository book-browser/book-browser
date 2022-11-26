import * as yup from 'yup';
import { parse } from 'query-string';
import { Location } from 'react-router-dom';

export type ParamType = Record<string, string | string[] | number | number[] | Date | Date[]>;

export const parseParams = <E extends ParamType>(location: Location, schema: yup.SchemaOf<E>) => {
  const params: unknown = parse(location.search, { parseNumbers: true, parseBooleans: true });
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
    }
    if (!params[fieldName] && fieldName in (params as any) && field.isValidSync(null)) {
      params[fieldName] = null;
    } else if (!(fieldName in (params as any)) || !field.isValidSync(params[fieldName])) {
      params[fieldName] = field.getDefault();
    } else {
      params[fieldName] = field.cast(params[fieldName]);
    }
  });

  return params as E;
};

export const generateEncodedUrl = (url: string, params: Record<string, string | string[] | number | number[]>) => {
  let joinedUrl = `${url}`;
  let paramAdded = false;

  Object.entries(params)
    .filter(([, paramVal]) => paramVal !== undefined)
    .forEach(([paramName, paramVal]) => {
      if (Array.isArray(paramVal)) {
        Object.values(paramVal).forEach((val) => {
          const joinKey = paramAdded ? '&' : '?';
          joinedUrl = `${joinedUrl}${joinKey}${paramName}=${val !== null ? encodeURIComponent(val) : ''}`;
          paramAdded = true;
        });
      } else {
        const joinKey = paramAdded ? '&' : '?';
        if (paramVal !== '') {
          joinedUrl = `${joinedUrl}${joinKey}${paramName}=${paramVal !== null ? encodeURIComponent(paramVal) : ''}`;
          paramAdded = true;
        }
      }
    });
  return joinedUrl;
};

export const convertUrlEnumStringToEnumString = (str: string) => {
  if (typeof str === 'string') {
    return str.toLocaleUpperCase().replace(/-/g, '_');
  }
  return str;
};

export const convertEnumStringToUrlEnumString = (str: string) => {
  return str.toLocaleLowerCase().replace(/_/g, '-');
};
