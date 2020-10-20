import { useMemo } from 'react'
import { usePromise } from 'react-hook-utils'

type T=any;
export default (fetchResult: () => Promise<T>, setResult: (result: T) => any) => {
  const refresh = async () => {
    return fetchResult()
      .then((result) => {
        setResult(result)
      })
  }
  const fetchMemo = useMemo(refresh, [])
  const [, error, isLoading] = usePromise(fetchMemo)

  return {
    isLoading,
    error,
    refresh
  }
}