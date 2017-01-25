import asyncio
import json
import os
import sys
import time
import tornado.gen
import tornado.ioloop
import tornado.platform
import tornado.web

from tools.iremitter import IREmitter

RESET_DELAY_SECS = 10
OUTLET_NAME = "outlet_a";

class MainHandler(tornado.web.RequestHandler):
  def get(self):
    self.redirect("/static/index.html")

class OffHandler(tornado.web.RequestHandler):
  async def post(self):
    self.write(json.dumps({"status": "success"}))
    self.finish()
    emitter = IREmitter(RESET_DELAY_SECS)
    emitter.emit_off(OUTLET_NAME)

class OnHandler(tornado.web.RequestHandler):
  async def post(self):
    self.write(json.dumps({"status": "success"}))
    self.finish()

    emitter = IREmitter(RESET_DELAY_SECS)
    emitter.emit_on(OUTLET_NAME)

class ResetHandler(tornado.web.RequestHandler):
  async def post(self):
    self.write(json.dumps({"status": "success"}))
    self.finish()

    emitter = IREmitter(RESET_DELAY_SECS)
    emitter.emit_off(OUTLET_NAME)

    await asyncio.sleep(RESET_DELAY_SECS)

    emitter.emit_on(OUTLET_NAME)

class PingHandler(tornado.web.RequestHandler):
  async def get(self):
    self.write(json.dumps({"status": "success"}))
    self.finish()

def make_app(is_debug):
  settings = {"debug": is_debug};

  return tornado.web.Application(
    [
      (r"/", MainHandler),
      (r"/off", OffHandler),
      (r"/on", OnHandler),
      (r"/reset", ResetHandler),
      (r"/ping", PingHandler),
      (
        r"/static/(.*)",
        tornado.web.StaticFileHandler,
        {"path": os.path.join(os.path.dirname(__file__), "frontend/static")}
      ),
      (
        r"/out/(.*)",
        tornado.web.StaticFileHandler,
        {"path": os.path.join(os.path.dirname(__file__), "frontend/out")}
      ),
    ],
    **settings
  )

if __name__ == "__main__":
  tornado.platform.asyncio.AsyncIOMainLoop().install()
  app = make_app("--debug" in sys.argv)
  app.listen(8000)
  loop = asyncio.get_event_loop()
  loop.run_forever()
