package com.example.motionsensorkotlin


import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONObject


class AccelerometerSensorListener(IoSocket : IoSocket) :  AppCompatActivity(), SensorEventListener{

    var IoSocket = IoSocket
    var accDataArray = arrayOfNulls<Float>(3)
    // 배열의 크기는 3이고 각 자리에는 0이 들어가 있음



    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // 센서 정밀도가 변경되면 호출

    }

    override fun onSensorChanged(event: SensorEvent?) {
        // 센서값이 변경되면 호출

        event?.let{

            /*
            accDataArray[0] = event.values[0]
            accDataArray[1] = event.values[1]
            accDataArray[2] = event.values[2]


             */

            var accDataJson = JSONObject()

            accDataJson.put("x", event.values[0])
            accDataJson.put("y", event.values[1])
            accDataJson.put("z", event.values[2])

            // IoSocket.sendAccData(accDataArray)
            IoSocket.sendAccData(accDataJson)

            //Log.d("MainActivity","onSensorChanged: x" + " ${event.values[0]}, y: ${event.values[1]}, z : ${event.values[2]}")
        }
        // d: 디버그용 로그를 표시할 때 사용
        // tag : logcat 상에서 필터링을 할시 입력되는 태그명
        // msg : 출력할 메세지

        // let 함수를 호출하는 객체 (여기서는 event) 를 블록 ( {} )으로 넘기고 사용
        // 코드가 간결해짐
    }


}