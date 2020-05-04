import React from 'react';
import moment from 'moment';
import utf8 from 'utf8';
import Cookies from 'js-cookie';
import { sortBy } from 'lodash';
import { Select } from 'antd';

const { Option } = Select;

export function isEmpty(value) {
  return value === undefined || value === null || value === '';
}

export function isEmptyObject(obj) {
  if (obj !== null && obj !== undefined) return Object.keys(obj).length === 0;
  return true;
}

export function removeParamsForServer(
  requestData,
  excludeParamsToRemove = [],
  param_remove = -1,
) {
  Object.keys(requestData).forEach((propName) => {
    const isExistedParam = excludeParamsToRemove.includes(propName);
    if (!isExistedParam) {
      if (
        isEmpty(requestData[propName]) ||
        requestData[propName] === param_remove
      ) {
        delete requestData[propName];
      }
    }
  });
  return requestData;
}

export function formatCurrency(value, locale = 'vi', digit = 0, unit = '₫') {
  const v = value.toLocaleString(locale, {
    minimumFractionDigits: digit,
  });

  return `${v} ${unit}`;
}

export const arrayToObject = (arr, keyField) => {
  const returnObject = {};
  arr.forEach((item) => {
    returnObject[item[keyField]] = item;
  });
  return returnObject;
};

export const arrayToMultiObject = (arr, keyArray, keyField) => {
  const returnObject = {};
  arr.forEach((item) => {
    item[keyArray].forEach((key) => {
      returnObject[key[keyField]] = key;
    });
  });
  return returnObject;
};

export function objectToArray(object) {
  return Object.keys(object).map((key) => object[key]);
}

export function days(range = 0) {
  return moment()
    .add(range, 'days')
    .format('YYYY-MM-DD');
}

export function startDateFilter() {
  return moment()
    .date(20)
    .format('YYYY-MM-DD');
}

export function endDateFilter() {
  return moment()
    .add(1, 'months')
    .date(19)
    .format('YYYY-MM-DD');
}
export function formatDatetime(date, isStartDate = false) {
  if (isStartDate) {
    return `${moment(date).format('YYYY-MM-DD')} 00:00:00`;
  }
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

export function toDates(date) {
  return moment(date).toDate();
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getCookie(name) {
  return Cookies.get('name');
}

export function setCookie(name, value) {
  Cookies.remove(name);
  Cookies.set(name, value);
}

export function genCSRFToken() {
  let text = '';
  const possible = '0123456789';

  for (let i = 0; i < 64; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export function numberWithCommas(value) {
  const [integerPart, fractionPart = ''] = value.toString().split('.');
  return (
    integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (fractionPart !== '' ? `.${fractionPart}` : '')
  );
}

export function formatNumber(number, roundScale = 2) {
  if (!Number.isNaN(number)) {
    const roundedNumber = 10 ** roundScale;
    return numberWithCommas(Math.round(number * roundedNumber) / roundedNumber);
  }
  return number;
}

export function convertEpochTime(time) {
  const date = new Date(0);
  date.setUTCSeconds(time);
  return moment(date).format('MM/DD/YYYY HH:mm');
}

export function convertEpochTimeToDate(time) {
  const date = new Date(0);
  date.setUTCSeconds(time);
  return date;
}

export function formatUnixTime(date) {
  return moment(date).unix();
}

export function searchFor(objects, field, value) {
  function trimString(s) {
    let l = 0;
    let r = s.length - 1;
    while (l < s.length && s[l] === ' ') l += 1;
    while (r > l && s[r] === ' ') r -= 1;
    return s
      .substring(l, r + 1)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  const results = [];
  value = trimString(value); // trim it
  Object.keys(objects).forEach((id) => {
    if (trimString(objects[id][field]).indexOf(value) !== -1) {
      results.push(id);
    }
  });
  return results;
}

export function mergeArrayUndup(arr1, arr2) {
  const array1 = arr1 || [];
  const array2 = arr2 || [];
  return [...new Set([...array1, ...array2])];
}

export function diffDaysFromToday(date) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const fromDate = moment(date, 'YYYY-MM-DD').toDate();
  const today = new Date();

  const diffDays = Math.round(
    Math.abs((today.getTime() - fromDate.getTime()) / oneDay),
  );
  return diffDays;
}

export function ascii_to_hexa(str) {
  const arr1 = [];
  str = utf8.encode(str);
  for (let n = 0, l = str.length; n < l; n += 1) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}

export function extractZones(extracted, input) {
  input.forEach((zone) => {
    extracted[zone.id] = zone;
    if (zone.children) {
      extractZones(extracted, zone.children);
    }
  });
}

export function sortNestedZones(input, height = 0) {
  return sortBy(input, ['level', 'id'])
    .reverse()
    .map((zone) => {
      if (zone.children) {
        return {
          ...zone,
          children: sortNestedZones(zone.children, height + 1),
          height,
          parent: zone.id,
        };
      }
      return { ...zone, height };
    });
}

export function flattenToId(zoneInfo) {
  if (zoneInfo.children) {
    return zoneInfo.children.reduce((flattenId, childZone) => {
      if (childZone.children) {
        return [...flattenId, childZone.id, ...flattenToId(childZone)];
      }
      return [...flattenId, childZone.id];
    }, []);
  }
  return [];
}

export function isNumber(n) {
  // eslint-disable-next-line no-restricted-properties
  return !window.isNaN(parseFloat(n)) && window.isFinite(n);
}

export function generateOptionsFromEnum(
  enumType,
  defaultOptions = false,
  labelKey = 'id',
  nameKey = 'name',
  excludedIds = [],
) {
  if (defaultOptions) {
    return [
      defaultOptions,
      ...Object.keys(enumType)
        .filter((key) => !excludedIds.includes(enumType[key].id))
        .map((key) => ({
          [labelKey]: enumType[key].id,
          [nameKey]: enumType[key].description,
        })),
    ];
  }
  return Object.keys(enumType)
    .filter((key) => !excludedIds.includes(enumType[key].id))
    .map((key) => ({
      [labelKey]: enumType[key].id,
      [nameKey]: enumType[key].description,
    }));
}

export function generateAntOptionsFromArray(
  array,
  defaultOptions = false,
  labelKey,
  nameKey,
  excludedIds = [],
) {
  if (defaultOptions) {
    return [
      defaultOptions,
      ...array
        .filter((key) => !excludedIds.includes(key.id))
        .map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Option key={index} value={item[labelKey]}>
            {item[nameKey]}
          </Option>
        )),
    ];
  }
  return array
    .filter((key) => !excludedIds.includes(key.id))
    .map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Option key={index} value={item[labelKey]}>
        {item[nameKey]}
      </Option>
    ));
}

export function generateAntOptionsFromEnum(enumValue, defaultOptions = null) {
  const options = [];
  if (!isEmptyObject(defaultOptions)) {
    const { id, name } = defaultOptions;
    options.push(
      <Option key={`${name}-${id}`} value={id} title={name}>
        <strong>{name}</strong>
      </Option>,
    );
  }
  Object.entries(enumValue).forEach(([key, data]) =>
    options.push(
      <Option key={data.id} value={data.id}>
        {data.description}
      </Option>,
    ),
  );
  return options;
}

export function generateZoneOptions(zones, defaultOptions = false) {
  const optionsZone = [];
  if (defaultOptions) {
    const { id, name } = defaultOptions;
    optionsZone.push(
      <Option key={`${name}-${id}`} value={id} title={name}>
        <strong>{name}</strong>
      </Option>,
    );
  }

  let filterZonesGroup = zones.filter((z) => z.parentId === 0 && z.status);
  filterZonesGroup = sortBy(filterZonesGroup, 'sortOrder');
  filterZonesGroup.forEach((zoneGroup) => {
    const { id, name } = zoneGroup;
    optionsZone.push(
      // eslint-disable-next-line react/no-array-index-key
      <Option key={`${name}-${id}`} value={id} title={name}>
        <strong>{name}</strong>
      </Option>,
    );
    const zoneItems = zones.filter((z) => z.parentId === id && z.status);
    zoneItems.forEach((zoneItem) => {
      const { id, name } = zoneItem;
      optionsZone.push(
        // eslint-disable-next-line react/no-array-index-key
        <Option key={`${name}-${id}`} value={id} title={name}>
          &nbsp;&nbsp;&nbsp;{name}
        </Option>,
      );
    });
  });
  return optionsZone;
}

export function increment(num, incr) {
  return Number((num + incr).toFixed(6));
}

export function getDescription(id, enumType, descriptionField = 'description') {
  let result = '';

  if (enumType) {
    Object.entries(enumType).forEach(([key, value]) => {
      if (value.id === id) {
        result = value[descriptionField];
      }
    });
  }

  return result;
}
