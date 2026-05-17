import PocketBase from 'pocketbase'
import { config } from '@/config'

let pb: PocketBase | null = null

export function getPocketBase(): PocketBase {
  if (!pb) {
    pb = new PocketBase(config.pocketBaseUrl)
  }
  return pb
}

export function clearPocketBase(): void {
  pb = null
}

export function logout(): void {
  const instance = getPocketBase()
  instance.authStore.clear()
  clearPocketBase()
}
