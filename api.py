import os
import sys
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
  async def get(self):
    self.write("Hello, world!")
    self.finish()

def make_app(is_debug):
  settings = {"debug": is_debug};

  return tornado.web.Application(
    [
      (r"/", MainHandler),
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
