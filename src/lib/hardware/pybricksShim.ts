export const PYBRICKS_SHIM = `
from pybricks.hubs import PrimeHub, InventorHub, EssentialHub, TechnicHub, CityHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port
import pybricks.tools as tools
import sys

# Try to initialize the correct hub
try:
    hub = PrimeHub()
except:
    try:
        hub = InventorHub()
    except:
        hub = TechnicHub()

# Fallback motor mapping - assuming standard differential drive on Ports A and B
try:
    _left_motor = Motor(Port.A)
    _right_motor = Motor(Port.B)
except Exception as e:
    print("Could not initialize motors on Port A/B:", e)

class HarmoniaRobot:
    def drive(self, left, right):
        try:
            # Pybricks motor.dc() takes -100 to 100 percentage.
            _left_motor.dc(left)
            _right_motor.dc(right)
        except NameError:
            pass # Motors not initialized

harmonia = HarmoniaRobot()

# -- Student Code Below --
`;
