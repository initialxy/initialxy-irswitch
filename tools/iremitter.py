import time
import sys
import RPi.GPIO as GPIO

SIGNAL_CONFIG = {
  "signal_patterns": {
    "outlet_a": {
      "on": "1001010000001010000010000",
      "off": "1001010000001010000001100"
    }
  },
  "signal_long_secs": 0.0008,
  "signal_short_secs": 0.0003,
  "signal_spacing_decs": 0.008
}

DATA_PIN = 11

class IREmitter:
  def __init__(self, attempts, is_debug = False):
    self.__attempts = attempts
    self.__is_debug = is_debug

  def __emit(
    self,
    signal_pattern,
    signal_long_secs,
    signal_short_secs,
    signal_spacing_decs
  ):
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(DATA_PIN, GPIO.OUT)
    for i in range(self.__attempts):
      # Deliberately use synchronous sleep because this is extremely timing
      # sensitive
      for s in signal_pattern:
        if s == "1":
          GPIO.output(DATA_PIN, 1)
          time.sleep(signal_long_secs)
          GPIO.output(DATA_PIN, 0)
          time.sleep(signal_short_secs)
        elif s == "0":
          GPIO.output(DATA_PIN, 1)
          time.sleep(signal_short_secs)
          GPIO.output(DATA_PIN, 0)
          time.sleep(signal_long_secs)
      GPIO.output(DATA_PIN, 0)
      time.sleep(signal_spacing_decs)
    GPIO.cleanup()

  def __emit_with_config(self, signal_group, signal_name):
    if self.__is_debug:
      print(
        "Emitting signal group: %s, signal name: %s" %
        (signal_group, signal_name)
      )
    else:
      self.__emit(
        SIGNAL_CONFIG["signal_patterns"][signal_group][signal_name],
        SIGNAL_CONFIG["signal_long_secs"],
        SIGNAL_CONFIG["signal_short_secs"],
        SIGNAL_CONFIG["signal_spacing_decs"]
      )

  def emit_on(self, signal_group):
    self.__emit_with_config(signal_group, "on")

  def emit_off(self, signal_group):
    self.__emit_with_config(signal_group, "off")
