import { Injectable } from '@angular/core';

@Injectable()
export class ScrollProvider {

  constructor() {
  }
  smoothScrollTo(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
      return Promise.reject('bad duration');
    }
    if (duration === 0) {
      element.scrollTop = target;
      return Promise.resolve();
    }

    const start_time = Date.now();
    const end_time = start_time + duration;

    const start_top = element.scrollTop;
    const distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    const smooth_step = function (start, end, point) {
      if (point <= start) { return 0; }
      if (point >= end) { return 1; }
      const x = (point - start) / (end - start); // interpolation
      return x * x * (3 - 2 * x);
    };
    return new Promise(function (resolve, reject) {
      // This is to keep track of where the element's scrollTop is
      // supposed to be, based on what we're doing
      let previous_top = element.scrollTop;

      // This is like a think function from a game loop
      const scroll_frame = function () {
        // if (element.scrollTop !== previous_top) {
        //   resolve('interrupted');
        //   return;
        // }

        // set the scrollTop for this frame
        const now = Date.now();
        const point = smooth_step(start_time, end_time, now);
        const frameTop = Math.round(start_top + (distance * point));
        element.scrollTop = frameTop;

        // check if we're done!
        if (now >= end_time) {
          resolve();
          return;
        }
        // If we were supposed to scroll but didn't, then we
        // probably hit the limit, so consider it done; not
        // interrupted.
        if (element.scrollTop === previous_top
          && element.scrollTop !== frameTop) {
          resolve();
          return;
        }
        previous_top = element.scrollTop;

        // schedule next frame for execution
        setTimeout(scroll_frame, 0);
      };
      setTimeout(scroll_frame, 0);
    });
  }
}
