import json
import os
import sys
import time
import tornado.ioloop
import tornado.web
import tornado.gen

async def sleep(seconds):
  await tornado.gen.Task(
    tornado.ioloop.IOLoop.instance().add_timeout,
    time.time() + seconds
  )

class MainHandler(tornado.web.RequestHandler):
  def get(self):
    self.redirect("/static/index.html")
    self.finish()

class OffHandler(tornado.web.RequestHandler):
  async def post(self):
    await sleep(1)
    self.write(json.dumps({
      "message": "Please wait at least 10 seconds before sending another IR " +
        "signal.",
      "status": "error"
    }))
    self.finish()

class OnHandler(tornado.web.RequestHandler):
  async def post(self):
    await sleep(1)
    self.write(json.dumps({"status": "success"}))
    self.finish()

class ResetHandler(tornado.web.RequestHandler):
  async def post(self):
    await sleep(1)
    self.write(json.dumps({"status": "success"}))
    self.finish()

class PingHandler(tornado.web.RequestHandler):
  async def get(self):
    await sleep(1)
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
  app = make_app("--debug" in sys.argv)
  app.listen(8000)
  tornado.ioloop.IOLoop.current().start()

