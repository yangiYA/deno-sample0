/**
 * 値を返却するif関数
 * 使用サンプル
 * 
 * ```
 * const dayText =
 *   if_func(isHoliday)
 *    .then(() => "お休み")
 *    .else(() => "平日");
 * ```
 *
 * @param {*} condition
 * @returns
 */
export const if_func = (condition) => {
  const thenMethod = (thenFunc) => {
    const elseMethod = (elseFunc) => {
      return condition ? thenFunc() : elseFunc();
    };
    return { else: elseMethod };
  };
  return { then: thenMethod };
};

/**
 * condition が true なら func を実行する
 *
 * @param {boolean} condition
 * @param {Functiont} func
 */
export function doIf(condition, func) {
  if (condition) {
    func();
  }
}
