import consola from "consola"
import * as uuid from "uuid"

import { getModels } from "~/services/copilot/get-models"
import { getVSCodeVersion } from "~/services/get-vscode-version"

import { state } from "./state"

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const isNullish = (value: unknown): value is null | undefined =>
  value === null || value === undefined

export async function cacheModels(): Promise<void> {
  const models = await getModels()
  state.models = models
}

export const cacheVSCodeVersion = async () => {
  const response = await getVSCodeVersion()
  state.vsCodeVersion = response

  consola.info(`Using VSCode version: ${response}`)
}

const NAMESPACE = "8cb40dd5-8c92-47c1-bf8c-7a8f49ef50a1" // This is a fixed namespace UUID for generating deterministic GUIDs;

export function deriveGuid(originalGuid: string, seed: number = 0): string {
  let derivedGuid = uuid.v5(originalGuid, NAMESPACE)

  for (let i = 0; i < seed; i++) {
    derivedGuid = uuid.v5(derivedGuid, NAMESPACE)
  }

  return derivedGuid
}
