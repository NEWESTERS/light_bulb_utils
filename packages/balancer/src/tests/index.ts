import QuotaBalancer from "../QuotaBalancer";

async function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), time);
  });
}

class Counter {
  count = 0;

  increment() {
    this.count++;
  }
}

const counter1 = new Counter(),
  counter2 = new Counter();

const balancer = new QuotaBalancer([counter1, counter2], {
  timeout: 600,
  maxAccessCount: 2,
});

(async () => {
  for (let i = 0; i < 12; i++) {
    const hasCalled = balancer.call((item) => item.increment());

    if (!hasCalled) {
      console.log("Quota exceeded");
    }

    await delay(100);
  }

  console.log("Counter 1: " + counter1.count);
  console.log("Counter 2: " + counter2.count);
})();
