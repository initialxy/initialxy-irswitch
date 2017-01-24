import time
import sys
import RPi.GPIO as GPIO

SIGNAL_CONFIG = {
  "signals": {
    "outlet_a": {
      "on": "1001010000001010000010000",
      "off": "1001010000001010000001100"
    }
  },
  "one_on_secs": 0.0008,
  "one_off_secs": 0.0003,
  "zero_on_secs": 0.0003,
  "zero_off_secs": 0.0008,
  "signal_delay_decs": 0.008
}

DATA_PIN = 23

class IREmitter:
  def __init__(self, attempts):
    self.__attempts = attempts

  def __emit(
    self,
    signal,
    one_on_secs,
    one_off_secs,
    zero_on_secs,
    zero_off_secs,
    signal_delay_decs
  ):
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(DATA_PIN, GPIO.OUT)
    for i in range(self.__attempts):
      for s in signal:
        if s == "1":
          GPIO.output(DATA_PIN, 1)
          time.sleep(one_on_secs)
          GPIO.output(DATA_PIN, 0)
          time.sleep(one_off_secs)
        elif s == "0":
          GPIO.output(DATA_PIN, 1)
          time.sleep(zero_on_secs)
          GPIO.output(DATA_PIN, 0)
          time.sleep(zero_off_secs)
      GPIO.output(DATA_PIN, 0)
      time.sleep(signal_delay_decs)
    GPIO.cleanup()

  def emit_on(self, signal_name):
    self.__emit(
      SIGNAL_CONFIG["signals"][signal_name]["on"],
      SIGNAL_CONFIG["one_on_secs"],
      SIGNAL_CONFIG["one_off_secs"],
      SIGNAL_CONFIG["zero_on_secs"],
      SIGNAL_CONFIG["zero_off_secs"],
      SIGNAL_CONFIG["signal_delay_decs"]
    )

  def emit_off(self, signal_name):
    self.__emit(
      SIGNAL_CONFIG["signals"][signal_name]["off"],
      SIGNAL_CONFIG["one_on_secs"],
      SIGNAL_CONFIG["one_off_secs"],
      SIGNAL_CONFIG["zero_on_secs"],
      SIGNAL_CONFIG["zero_off_secs"],
      SIGNAL_CONFIG["signal_delay_decs"]
    )