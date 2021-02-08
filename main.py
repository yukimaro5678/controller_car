def みぎタイア(すぴーど: number):
    # みぎタイアをうごかす
    # すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.set_led_duty_cycle(PCA9685.LEDNum.LED3, 0 if すぴーど >= 0 else 100, 67)
    PCA9685.set_led_duty_cycle(PCA9685.LEDNum.LED4, abs(すぴーど), 67)

def ひだリタイア(すぴーど: number):
    # ひだリタイアをうごかす
    # すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.set_led_duty_cycle(PCA9685.LEDNum.LED1, 0 if すぴーど >= 0 else 100, 67)
    PCA9685.set_led_duty_cycle(PCA9685.LEDNum.LED2, abs(すぴーど), 67)

def ゆうくんのリモコンチェック():
    global left, right
    # ひだりのアルミが押された？
    cur_left = 50 if input.pin_is_pressed(TouchPin.P0) else 0
    cur_right = 50 if input.pin_is_pressed(TouchPin.P1) else 0
    if left != cur_left:
        left = cur_left
        serial.write_value("left", left)
        radio.send_value("left", left)
    if right != cur_right:
        right = cur_right
        serial.write_value("right", right)
        radio.send_value("right", right)

def on_received_value(name, value):
    serial.write_value(name, value)
    # 左に行くときは右を回す、その逆も同じ
    if name == "left":
        みぎタイア(value)
    elif name == "right":
        ひだリタイア(value)
    else:
        pass
radio.on_received_value(on_received_value)

right = 0
left = 0
すぴーど = 0
radio.set_group(1)
PCA9685.reset(67)
basic.show_icon(IconNames.HEART)
music.play_tone(2000, music.beat(BeatFraction.QUARTER))
music.play_tone(1000, music.beat(BeatFraction.QUARTER))
basic.clear_screen()

def on_forever():
    ゆうくんのリモコンチェック()
basic.forever(on_forever)
