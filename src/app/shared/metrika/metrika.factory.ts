import { environment } from "src/environments/environment";
import { CounterConfig, YandexCounterConfig } from "./metrika.config";

declare var Ya: any;

export function countersFactory(config: CounterConfig) {
  return Object.assign(new YandexCounterConfig(), config);
}

export function metrikaInitializerFactory(counterConfig: CounterConfig) {
  if (environment.useMetrika) {
    return _insertMetrika.bind(null, counterConfig);
  }

  return () => {};
}

export function getCounterNameById(id: string | number): string {
  return `yaCounter${id}`;
}

function _getWindowRef() {
  return (window as { [key: string]: any });
}

function _insertMetrika(counterConfig: CounterConfig): string {
  const name = 'yandex_metrika_callbacks2';
  const windowRef = _getWindowRef();

  windowRef[name] = windowRef[name] || [];
  windowRef[name].push(() => {
    try {
        _createCounter(counterConfig);
    } catch (e) { console.error('[metrika factory] _insertMetrika:', e) }
  });

  const n = document.getElementsByTagName('head')[0].querySelectorAll('link:last-child')[0];
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://mc.yandex.ru/metrika/tag.js';

  const no_script = document.createElement('noscript');
  no_script.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${counterConfig.id}" style="position:absolute; left:-9999px;" alt="" /></div>`;

  const insetScriptTags = () => {
    n.parentNode?.insertBefore(no_script, n.nextSibling);
    n.parentNode?.insertBefore(s, n.nextSibling);
  };

  if ((window as any).opera === '[object Opera]') {
    document.addEventListener('DOMContentLoaded', insetScriptTags, false);
  } else {
    insetScriptTags();
  }

  return name;
}

function _createCounter(config: CounterConfig) {
  const windowRef = _getWindowRef();
  windowRef[getCounterNameById(config.id)] = new Ya.Metrika2(config);
  console.log(windowRef[getCounterNameById(config.id)], getCounterNameById(config.id));
}
