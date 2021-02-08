function みぎタイア(すぴーど: number) {
    //  みぎタイアをうごかす
    //  すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, すぴーど >= 0 ? 0 : 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, Math.abs(すぴーど), 67)
}

function ひだリタイア(すぴーど: number) {
    //  ひだリタイアをうごかす
    //  すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, すぴーど >= 0 ? 0 : 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, Math.abs(すぴーど), 67)
}

function ゆうくんのリモコンチェック() {
    
    //  ひだりのアルミが押された？
    let cur_left = input.pinIsPressed(TouchPin.P0) ? 50 : 0
    let cur_right = input.pinIsPressed(TouchPin.P1) ? 50 : 0
    if (left != cur_left) {
        left = cur_left
        serial.writeValue("left", left)
        radio.sendValue("left", left)
    }
    
    if (right != cur_right) {
        right = cur_right
        serial.writeValue("right", right)
        radio.sendValue("right", right)
    }
    
}

radio.onReceivedValue(function on_received_value(name: string, value: number) {
    serial.writeValue(name, value)
    //  左に行くときは右を回す、その逆も同じ
    if (name == "left") {
        みぎタイア(value)
    } else if (name == "right") {
        ひだリタイア(value)
    } else {
        
    }
    
})
let right = 0
let left = 0
let すぴーど = 0
radio.setGroup(1)
PCA9685.reset(67)
basic.showIcon(IconNames.Heart)
music.playTone(2000, music.beat(BeatFraction.Quarter))
music.playTone(1000, music.beat(BeatFraction.Quarter))
basic.clearScreen()
basic.forever(function on_forever() {
    ゆうくんのリモコンチェック()
})
