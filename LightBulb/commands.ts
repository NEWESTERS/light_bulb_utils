type TransitionType = "smooth" | "sudden";

export type LightBulbCommand =
  | {
      method: "set_rgb";
      params: [number, TransitionType, number];
    }
  | {
      method: "set_bright";
      params: [number, TransitionType, number];
    };
