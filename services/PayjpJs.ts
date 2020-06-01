import { useEffect, useState } from 'react'

// パブリック API キー
const PAYJP_API_PK = 'pk_test_0383a1b8f91e8a6e3ea0e2a9'

declare global {
  interface Window {
    Payjp?: any
  }
}

const loadScript = async (srcUrl: string) => {
  return new Promise<Event>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = srcUrl
    script.addEventListener('load',  event => resolve(event))
    script.addEventListener('error', event => reject(event))
    document.body.appendChild(script)
  })
}

export const usePayjp = (): any => {

  const [payjp, setPayjp] = useState<any>(null)

  useEffect(() => {
    if (payjp) {
      console.debug('payjp.js has been already loaded.')
      return
    }
    console.debug('Waiting for payjp.js to be loaded...')
    ;(async () => {
      await loadScript('https://js.pay.jp/v2/pay.js')
      console.debug('Loaded: payjp.js')
      setPayjp(window.Payjp(PAYJP_API_PK))
    })()
  }, [])

  return payjp
}
