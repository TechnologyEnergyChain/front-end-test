import {ToastType} from "@src/core/toast/domain/entities/ToastType";

export class Toast {
  message: string | null = null
  type: ToastType | null = null
  constructor(message?: string, type?: ToastType) {
    this.message = message ?? null
    this.type = type ?? null
  }
}
