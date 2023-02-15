/**
 * It takes a string like "1h" and returns the current time plus the number of seconds in the string
 * @param {string} time - The time you want to set the expiration time for the token.
 * @returns The time in seconds that the token will expire.
 */
export function getTimeAccessToken(time: string) {
  const now_time = Math.floor(new Date().getTime() / 1000);

  const unit_time = time.substring(time.length - 1); // => "1"

  const str_time = time.substring(0, time.length - 1);

  const num_time = Number(str_time);

  switch (unit_time) {
    case 's':
      return now_time + num_time;

    case 'm':
      return now_time + num_time * 60;

    case 'h':
      return now_time + num_time * 60 * 60;
    case 'd':
      return now_time + num_time * 60 * 60 * 24;
    case 'M':
      return now_time + num_time * 60 * 60 * 24 * 30;
  }
}
