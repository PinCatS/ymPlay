export interface MetrikaHitEvent {
  url: string,
  prevUrl: string,
  title?: string,
  referer?: string,
  callback?: Function,
  callbackCtx?: any,
  params?: MetrikaHitEventOptionsParams,
}

export interface MetrikaHitEventOptionsParams {
  order_price: number,
  currency: string
}
