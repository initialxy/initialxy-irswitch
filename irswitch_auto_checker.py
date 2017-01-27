import aiohttp
import asyncio
import copy
import sys

from random import shuffle
from tools.iremitter import IREmitter

SIGNAL_ATTEMPTS = 10
OUTLET_NAME = "outlet_a";
RESET_DELAY_SECS = 10

EXTERNAL_URLS = [
  "https://www.google.com",
  "https://www.youtube.com",
  "https://www.facebook.com",
  "https://www.wikipedia.org",
  "https://www.yahoo.com",
  "https://www.amazon.com",
  "https://www.live.com",
  "https://twitter.com",
  "https://www.instagram.com",
  "https://www.reddit.com",
  "https://www.linkedin.com",
  "http://www.bing.com",
  "http://www.msn.com",
  "https://www.microsoft.com"
]

PING_RETRY_COUNT = 2

async def main(loop, is_debug = False):
  print("Network auto checker start")
  shuffled_external_urls = copy.copy(EXTERNAL_URLS)
  shuffle(shuffled_external_urls);
  client = aiohttp.ClientSession(loop=loop)

  is_ping_success = False
  for i in range(PING_RETRY_COUNT):
    try:
      url = shuffled_external_urls[i]
      print("ping URL: %s" % (url))
      response = await client.get(url, timeout=30)
      response.close()
      is_ping_success = True
      break
    except Error as e:
      print(e.strerror)
  client.close()

  print("Is ping successful: %r" % (is_ping_success))

  if not is_ping_success:
    emitter = IREmitter(SIGNAL_ATTEMPTS, is_debug)
    print("Turing off")
    emitter.emit_off(OUTLET_NAME)
    await asyncio.sleep(RESET_DELAY_SECS)
    print("Turning on")
    emitter.emit_on(OUTLET_NAME)

  print("Network auto check complete")

if __name__ == "__main__":
  loop = asyncio.get_event_loop()
  loop.run_until_complete(main(loop, "--debug" in sys.argv))
