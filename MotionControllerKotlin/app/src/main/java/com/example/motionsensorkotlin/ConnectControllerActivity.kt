package com.example.motionsensorkotlin

import android.content.Intent
import android.os.Bundle
import android.os.PersistableBundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.zxing.integration.android.IntentIntegrator
import kotlinx.android.synthetic.main.activity_conn_ctrl.*
import java.net.URL

class ConnectControllerActivity : AppCompatActivity(){
    lateinit var introIntent : Intent
    lateinit var app_unique_id : String

    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        super.onCreate(savedInstanceState, persistentState)
        setContentView(R.layout.activity_conn_ctrl)

        // 앞에서 보낸 어플리케이션 id 를 받음
        introIntent = intent // getIntent 역할
        app_unique_id = intent.getStringExtra("intent_uniqueID")

        connectCtrlBtn.setOnClickListener {
            IntentIntegrator(this).initiateScan()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        val result = IntentIntegrator.parseActivityResult(requestCode, requestCode, data);
        var UrlRightCheck : Boolean
        if(result != null){
            if(result.contents == null){
                Toast.makeText(this, "Cancelled", Toast.LENGTH_SHORT).show()
            }else{
                Toast.makeText(this, "Scanned : " + result.contents, Toast.LENGTH_SHORT).show()

                val idPutUrl = result.contents
                UrlRightCheck = idPutUrl.contains("https://jswebgame.run.goorm.io", false)

                if(!UrlRightCheck){
                    Toast.makeText(this, "Wrong URL value", Toast.LENGTH_SHORT).show()
                }
                else{
                    var mainIntent = Intent()
                    var gamesocketId = idPutUrl.substring(idPutUrl.lastIndexOf("=")+1)

                    mainIntent.putExtra("gamesocketId", gamesocketId)
                    startActivity(mainIntent)
                    finish()
                }

            }
        }
        else{
            super.onActivityResult(requestCode, resultCode, data);
        }
    }


}