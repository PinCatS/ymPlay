export interface MetrikaHitOptions {
  title?: string,
  referer?: string,
  callback?: Function,
  callbackCtx?: any,
  params?: MetrikaOptionsParams,
}

export interface MetrikaOptionsParams {
  order_price?: number,
  currency?: string
}
