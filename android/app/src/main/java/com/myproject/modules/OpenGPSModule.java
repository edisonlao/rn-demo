package com.myproject.modules;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.widget.Toast;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.myproject.MainApplication;
import com.myproject.utils.Config;
import com.myproject.utils.PrintUtil;

import java.io.File;
import java.io.FileOutputStream;

import static com.myproject.utils.PrintUtil.printMsg;

public class OpenGPSModule extends ReactContextBaseJavaModule {
    public OpenGPSModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NewGPSModule";
    }

    @ReactMethod
    public void startActivityFromJS(String name, String action, String params) {
        try {
            if(action.equals("setting")) {
                Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                Activity currentActivity = getCurrentActivity();
                currentActivity.startActivity(intent);
            }else if(action.equals("manual")){
                printMsg("开始写入...");
                File file = new File(this.getCurrentActivity().getFilesDir(),"location.txt");
                FileOutputStream fileOutputStream = new FileOutputStream(file);
                fileOutputStream.write(params.getBytes());
                fileOutputStream.flush();
                fileOutputStream.close();
                printMsg("写入成功...");
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }


}