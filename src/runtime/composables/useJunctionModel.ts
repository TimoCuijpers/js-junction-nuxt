import { Model } from '../builder/model'

export function useJunctionModel<Model>(): { Model: typeof Model } {
  return { Model }
}
