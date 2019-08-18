import { GotInstance, GotJSONFn } from 'got'
import { BitrixListPayload, BitrixMethod } from '../types'

const handleGetPayload = <P>(payload: BitrixListPayload<P>) => {
  // tslint:disable-next-line no-if-statement
  if (payload.error) {
  // tslint:disable-next-line no-throw
    throw new Error(
      `[get] failed to get the resource: ${payload.error}.`
    )
  }

  return payload
}

// @todo `getList` is temporary workaround. Bitrix will return different signature
//       depending on `get` and `list` methods. Until we can automatically
//       map those types based on methods and thus infer output types, we need this helper
export default ({ get }: GotInstance<GotJSONFn>) =>
  <P>(method: BitrixMethod, options: object): Promise<BitrixListPayload<P>> =>
    get(method, options)
      .then(({ body }) => handleGetPayload(body as BitrixListPayload<P>))