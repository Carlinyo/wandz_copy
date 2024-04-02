import moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';

class LogicFilters {
  static shortenedFormatter(num, roundTo, fixTo) {
    return LogicFilters.currencyFormatter(
      LogicFilters.decimalFormatter(LogicFilters.sizeFormatter(num, roundTo, fixTo)),
    );
  }

  /**
   * sizeFormatter - format number's size to k/M (thousand or Millions).
   * Example: 1000 will be 1k, 1000000 will be 1M.
   * @param num - the number to be formatted.
   * @param roundTo - determines when to round up or down.
   * For example, roundTo 2 will round 1000.405 to 1000.5, but roundTo 100 will round 1000.405 to 1000.41 and will be more accurate.
   * @param fixTo - determines how many decimal places in a number.
   * */
  static sizeFormatter(num, roundTo, fixTo) {
    const round = roundTo || 1;
    const toFixed = fixTo || 0;
    const precisionRound = (number, factor) => Math.round(number * factor) / factor;
    if (num > 999999) {
      return `${Math.round(((num / 1000000) * 100) / 100)}M`;
    }
    if (num > 999) {
      let kRes = precisionRound(num / 1000, round);
      kRes = kRes.toFixed(toFixed) % 1 > 0 ? kRes.toFixed(toFixed) : kRes;
      return `${kRes}k`;
    }
    return num;
  }

  /**
   * currencyFormatter - format number with comma-separated.
   * Example: 1000 will be 1,000.
   * @param value - the number to be formatted. Can be of type String too.
   * */
  static currencyFormatter(value) {
    if (!value) return value;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static isoCurrencyToSymbolFormatter(value) {
    if (!value) return value;
    return getSymbolFromCurrency(value);
  }

  /**
   * decimalFormatter - determines 2 decimal places in a number.
   * Example: 1000.4564654564564 will be 1000.45
   * @param value - the number, can be only of type Number.
   * */
  static decimalFormatter(value) {
    if (!value || (value && typeof value === 'string')) return value;
    return Math.round(value * 100) / 100;
  }

  /**
   * dateFormatter - format the date we receive into the format of 'MM dd, yyyy'.
   * Example: '2018-03-03' will be 'Mar 3, 2018'
   * @param value - must be a Date.
   * */
  static dateFormatter(value) {
    const dateValue = new Date(value);
    if (isNaN(dateValue.valueOf())) return value;
    const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return DATE_FORMATTER.format(dateValue);
  }

  /**
   * timeFormatter - format the date we receive into the format of 'HH:MM AM'.
   * Example: '13:08' will be '01:08 PM'
   * @param value - must be a Date.
   * */
  static timeFormatter(value) {
    const dateValue = new Date(value);
    if (isNaN(dateValue.valueOf())) return value;
    const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour clock format
    });
    // example: Jan 1, 2023
    return TIME_FORMATTER.format(dateValue);
  }
  static kFormatterWithDecimal(num) {
    if (num === undefined || num === null) return '';
    if (typeof num !== 'number') return num;
    const negative = num < 0;
    const posNum = negative ? Math.abs(num) : num;
    if (posNum < 10000) {
      let posNumRound;
      if (posNum > 10) {
        posNumRound = Math.round(posNum);
        return `${negative ? '-' : ''}${LogicFilters.commasNumber(posNumRound)}`;
      } else {
        // Make sure number is actual float before toFixed(2)
        posNumRound = posNum % 1 === 0 ? posNum : posNum.toFixed(2);
        if (posNum < 0.01 && posNum > 0) {
          return '< 0.01';
        }
        return `${negative ? '-' : ''}${LogicFilters.commasNumber(posNumRound)}`;
      }
    }
    if (posNum < 1000000) {
      return `${negative ? '-' : ''}${Math.round(posNum / 1000)}K`;
    }
    if (posNum < 1000000000) {
      return `${negative ? '-' : ''}${Math.round((posNum / 1000000) * 10) / 10}M`;
    }

    return `${negative ? '-' : ''}${Math.round((posNum / 1000000000) * 10) / 10}B`;
  }

  static commasNumber(number) {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : number;
  }

  static roundFun(number, decimal) {
    return decimal ? +number.toFixed(decimal) : Math.round(number);
  }

  static kFormatter(num, decimal) {
    if (Math.abs(num) < 10000) {
      return LogicFilters.commasNumber(LogicFilters.roundFun(num, decimal));
    } else if (Math.abs(num) < 1000000) {
      return `${LogicFilters.roundFun(num / 1000, decimal)}K`;
    } else if (Math.abs(num) < 1000000000) {
      return `${LogicFilters.roundFun(((num / 1000000) * 10) / 10, decimal)}M`;
    }
    return `${LogicFilters.roundFun(((num / 1000000000) * 10) / 10, decimal)}B`;
  }

  static formatDevice(str) {
    str = str.trim();
    if (/^pc$/i.test(str)) {
      str = 'desktop';
    }
    return str
      .trim()
      .toLowerCase()
      .replace(/^(\w)/, (letter) => letter.toUpperCase());
  }

  static dropDownOptionsFormatter(item) {
    return item ? item.text : '';
  }
}

export default LogicFilters;
