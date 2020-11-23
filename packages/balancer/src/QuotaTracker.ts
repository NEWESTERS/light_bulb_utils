import { getCurrentTime } from "./utils";

export interface QuotaConfig {
  /** Timeout for callback quota reset (ms) */
  timeout: number;
  /** Count of times that item can be accessed in specified `timeout` */
  maxAccessCount: number;
}

/** Restricts operations with specified item for some quota */
class QuotaTracker<T> {
  private _item: T;
  private _streakStartTime: number;
  private _streakCount: number;
  private _timeout: number;
  private _maxAccessCount: number;

  constructor(item: T, quota: QuotaConfig) {
    this._item = item;
    this._timeout = quota.timeout;
    this._maxAccessCount = quota.maxAccessCount;
    this.resetQuota();
  }

  private isQuotaTimeoutReached(): boolean {
    const currentTime = getCurrentTime();

    return currentTime - this._streakStartTime > this._timeout;
  }

  private validateCountQuota(): boolean {
    return this._streakCount < this._maxAccessCount;
  }

  private resetQuota() {
    this._streakStartTime = getCurrentTime();
    this._streakCount = 0;
  }

  private beforeCall(): boolean {
    if (this.isQuotaTimeoutReached()) {
      this.resetQuota();
      return true;
    } else {
      if (this.validateCountQuota()) {
        return true;
      } else {
        return false;
      }
    }
  }

  /** Pass contained item to callback if quota is not exceeded */
  public call(callback: (item: T) => void): boolean {
    if (!this.beforeCall()) {
      return false;
    }

    this._streakCount++;

    callback(this._item);

    return true;
  }
}

export default QuotaTracker;
