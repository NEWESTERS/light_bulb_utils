import QuotaTracker, { QuotaConfig } from "./QuotaTracker";

/** Balances usage of items with quota */
class QuotaBalancer<T> {
  private _queue: QuotaTracker<T>[];

  constructor(items: T[], quota: QuotaConfig) {
    this._queue = items.map((item) => new QuotaTracker(item, quota));
  }

  /**
   * Iterate over items with quota
   * and execute callback on item
   * which quota isn't exceeded
   */
  public call(callback: (item: T) => void) {
    let hasCalled = false;

    for (let queueItem of this._queue) {
      hasCalled = queueItem.call(callback);

      if (hasCalled) {
        break;
      }
    }

    return hasCalled;
  }
}

export default QuotaBalancer;
