import puppeteer from "puppeteer";
import path from "path";

enum BrowserEvent {
  VideoInitSucceed = "[event] Play started",
  VideoInitFailed = "[event] Play failed",
}

async function initializeVideo(
  page: puppeteer.Page
): Promise<puppeteer.ElementHandle<Element>> {
  return new Promise((resolve, reject) => {
    page.on("console", async (msg) => {
      switch (msg.text()) {
        case BrowserEvent.VideoInitSucceed:
          const video = await page.$("#video");
          resolve(video);
          break;

        case BrowserEvent.VideoInitFailed:
          reject("Video initialization failed");
          break;
      }
    });

    page.goto(`file:${path.join(__dirname, "video.html")}`);
  });
}

export async function createUsbScreenshoter() {
  const browser = await puppeteer.launch({
    args: ["--use-fake-ui-for-media-stream"],
  });

  const page = await browser.newPage();

  let video: puppeteer.ElementHandle<Element>;

  try {
    video = await initializeVideo(page);
  } catch (error) {
    browser.close();
    throw new Error(error);
  }

  return {
    getScreenshot: () => video.screenshot({ type: "jpeg" }),
    close: () => browser.close(),
  };
}
