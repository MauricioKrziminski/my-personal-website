import loader from "."
import { isBrowser, sleep } from "../functions"
import { pageReady } from "../pageReady"

/**
 * duracao alvo do loader. e ao mesmo tempo o piso (o loader nunca acaba antes
 * disso) e o denominador do contador, em updatePercent mais abaixo. os dois
 * precisam ser o mesmo numero, senao a contagem e cortada no meio.
 *
 * o loader cobre a pagina inteira (o Content de Transition.tsx fica em
 * opacity: 0 ate ele terminar), entao enquanto ele estiver na tela o unico
 * conteudo pintavel e o proprio contador: este numero e literalmente o quanto o
 * site demora para aparecer, tanto para o visitante quanto para o Lighthouse.
 *
 * a versao antiga estimava a duracao a partir de quanto tempo o bundle levou
 * para avaliar, o que era invertido: quanto mais lento o aparelho, MAIS longo
 * ficava o loader. no mobile emulado do Lighthouse isso passava dos 30s e a run
 * inteira abortava com NO_FCP.
 */
const LOADER_MS = 1700

/**
 * teto de seguranca, caso a hidratacao trave de vez.
 *
 * na pratica ele quase nunca decide nada: mesmo quando dispara, a animacao de
 * saida so roda quando o Transition registra o callback, o que tambem depende da
 * hidratacao. serve como guarda contra o loader ficar presa para sempre.
 */
const MAX_LOADER_MS = 3000

/**
 * tempo parado em 100% antes de chamar as animacoes de saida.
 *
 * somado ao sleep(200) do onComplete, precisa cobrir um ciclo inteiro do
 * typewriter do contador (PERCENT_ANIM_MS em Transition.tsx, hoje 400ms) e ainda
 * sobrar um respiro. senao o wipe comeca enquanto o "100%" esta sendo digitado e
 * o loader parece terminar antes da hora.
 *
 * 200 + 450 = 650ms: o "100%" fica pronto aos 400ms e parado por 250ms.
 */
const ANIMATION_DELAY = 450

type Animation = {
  callback: VoidFunction
  duration: number
}

type ProgressCallback = (percent: number) => void
const progressCallbacks: ProgressCallback[] = []
let animations: Animation[] = []
let isComplete = false
const startTime = performance.now()
let loaderIsDone = false
export const getLoaderIsDone = () => loaderIsDone
export const getIsComplete = () => isComplete

/**
 * call all callbacks and set done to true
 */
async function onComplete() {
  loader.dispatchEvent("anyStart", new CustomEvent("anyStart"))
  loader.dispatchEvent("initialStart", new CustomEvent("initialStart"))

  progressCallbacks.forEach(cb => cb(100))
  loader.dispatchEvent(
    "progressUpdated",
    new CustomEvent("progressUpdated", { detail: 100 })
  )
  isComplete = true
  await sleep(200)

  const longestAnimation = animations.reduce((longest, animation) => {
    setTimeout(animation.callback, ANIMATION_DELAY)
    return Math.max(longest, animation.duration)
  }, 0)

  await sleep(ANIMATION_DELAY)
  await sleep(longestAnimation * 1000 + 10)
  loaderIsDone = true

  loader.dispatchEvent("anyEnd", new CustomEvent("anyEnd"))
  loader.dispatchEvent("initialEnd", new CustomEvent("initialEnd"))
}

/**
 * percentage based loader
 *
 * anima o contador de 0 a 99 ao longo de LOADER_MS. o denominador aqui e o mesmo
 * LOADER_MS que o finish() usa como piso, de proposito: e o que faz o contador
 * chegar perto de 100 exatamente quando o loader acaba. com denominadores
 * diferentes o contador era cortado no meio (ficava em ~70% e saltava para 100).
 */
const updatePercent = () => {
  if (isComplete) return
  const progress = Math.min(
    99,
    ((performance.now() - startTime) / LOADER_MS) * 100
  )
  progressCallbacks.forEach(cb => cb(progress))
  loader.dispatchEvent(
    "progressUpdated",
    new CustomEvent("progressUpdated", { detail: progress })
  )
  if (isBrowser()) requestAnimationFrame(updatePercent)
}
if (isBrowser()) updatePercent()

/**
 * conclusao do loader
 *
 * espera a pagina ficar realmente pronta (pageReady, ou seja o React hidratado),
 * com MAX_LOADER_MS como guarda. depois disso ainda espera o contador terminar a
 * escala: o loader nunca acaba antes de LOADER_MS, senao o "100%" nunca chega a
 * ser exibido e a saida parece atropelar a contagem.
 *
 * note que a guarda usa setTimeout, e nao requestAnimationFrame: rAF congela em
 * aba de fundo, entao sem isso o loader podia ficar preso indefinidamente.
 */
async function finish() {
  const remaining = LOADER_MS - (performance.now() - startTime)
  if (remaining > 0) await sleep(remaining)
  if (!isComplete) await onComplete()
}

if (isBrowser())
  Promise.race([pageReady(), sleep(MAX_LOADER_MS)]).then(finish).catch(finish)

/**
 * register a callback (such as an animation) to be called when the page is loaded
 *
 * note that the callback should return its duration in seconds
 *
 * @param completionFunction function to call when the page is loaded
 */
export const registerLoaderCallback = (completionFunction: Animation) => {
  // Quando a hidratacao demora mais que o loader, este callback so existe depois
  // do onComplete. Sem o mesmo respiro do caminho normal, a animacao de saida
  // dispararia no frame em que o Transition monta, com o contador ainda em 0%.
  if (isComplete) setTimeout(completionFunction.callback, ANIMATION_DELAY)
  else animations.push(completionFunction)
}

/**
 * register a callback (such as a progress bar or percentage) to be called while the page is loading
 * @param callback function to call with the percentage of the page loaded
 */
export const registerProgress = (callback: ProgressCallback) => {
  if (isComplete) callback(100)
  else progressCallbacks.push(callback)
}

/**
 * remove a callback from the list of callbacks
 * @param callback function to remove from the list of callbacks
 */
export const unregisterLoaderCallback = (completionFunction: VoidFunction) => {
  animations = animations.filter(
    animation => animation.callback !== completionFunction
  )
}

/**
 * remove a progress callback from the list
 * @param callback function to remove from the list of callbacks
 */
export const unregisterProgress = (callback: ProgressCallback) => {
  const index = progressCallbacks.indexOf(callback)
  if (index > -1) progressCallbacks.splice(index, 1)
}
