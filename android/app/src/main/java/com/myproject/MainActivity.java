package com.myproject;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.NotificationManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.google.firebase.messaging.FirebaseMessaging;
import com.myproject.modules.GPSModule;
import com.myproject.utils.Config;
import com.myproject.utils.NotificationUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Vector;

import static com.myproject.utils.PrintUtil.printMsg;

public class MainActivity extends ReactActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private BroadcastReceiver mRegistrationBroadcastReceiver;
    private Bitmap bitmap;
    private int notifiIndex = 0;

    @Override
    protected String getMainComponentName() {
        return "MyProject";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mRegistrationBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {

                // checking for type intent filter
                if (intent.getAction().equals(Config.REGISTRATION_COMPLETE)) {
                    // gcm successfully registered
                    // now subscribe to `global` topic to receive app wide notifications
                    FirebaseMessaging.getInstance().subscribeToTopic(Config.TOPIC_GLOBAL);

                    displayFirebaseRegId();

                } else if (intent.getAction().equals(Config.PUSH_NOTIFICATION)) {
                    // new push notification is received
                    Config config = new Config();
                    final String iconUrl = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=651475608,268057290&fm=27&gp=0.jpg";
                    String notifiMessage = intent.getStringExtra("message");
                    String notifiTitle = intent.getStringExtra("title");
                    String notifiAddress = intent.getStringExtra("address");
                    String cityName = getLocation();
                    if(cityName == null) {
                        cityName = GPSModule.getCNBylocation(context);
                    }

                    Toast.makeText(getApplicationContext(), "您有新的消息", Toast.LENGTH_SHORT).show();
                    if(notifiAddress.equals(cityName) || cityName == null) {
                        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
                        PendingIntent intentPend = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
                        final NotificationCompat.Builder compat = new NotificationCompat.Builder(context);
                        compat.setContentTitle(notifiTitle)
                                .setContentText(notifiMessage + "/地址:" + cityName)
                                .setWhen(System.currentTimeMillis())
                                .setContentIntent(intentPend)
                                .setSmallIcon(R.mipmap.sendroid);

                        //android 4.0之后不允许在主线程HttpURLConnection,
                        // 需要子线程执行HttpURLConnection，等待子线程结束，再启动主线程
                        Vector<Thread> threadVector = new Vector<>();
                        Thread iconThread = new Thread(new Runnable() {
                            @Override
                            public void run() {
                                // 在线图片转Bitmap
                                urlToBitmap(iconUrl);
                            }
                        });
                        threadVector.add(iconThread);
                        iconThread.start();
                        for (Thread thread : threadVector) {
                            try {
                                thread.join();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        compat.setLargeIcon(bitmap)
                                .setOnlyAlertOnce(true)
                                .setSound(Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.fcmsound))
                                .setAutoCancel(true)
                                .setPriority(NotificationCompat.PRIORITY_MAX);

                        Notification notification = compat.build();
                        notification.contentView.setImageViewBitmap(10, bitmap);
                        manager.notify(notifiIndex++, notification);
                        bitmap = null;
                    }
                }
            }
        };

        displayFirebaseRegId();
    }

    // Fetches reg id from shared preferences
    // and displays on the screen
    private void displayFirebaseRegId() {
        SharedPreferences pref = getApplicationContext().getSharedPreferences(Config.SHARED_PREF, 0);
        String regId = pref.getString("regId", null);

        Log.e(TAG, "Firebase reg id: " + regId);

        if (!TextUtils.isEmpty(regId))
            Toast.makeText(this, "Firebase Reg Id: " + regId, Toast.LENGTH_SHORT).show();
        else
            Toast.makeText(this, "Firebase Reg Id is not received yet!", Toast.LENGTH_SHORT).show();
    }

    private Bitmap urlToBitmap(final String imageUri) {
        HttpURLConnection conn = null;
        try {
            URL myFileUrl = new URL(imageUri);
            conn = (HttpURLConnection) myFileUrl.openConnection();
            conn.setConnectTimeout(10000);// 设置链接超时
            conn.setReadTimeout(5000);
            conn.setRequestMethod("GET");// 设置请求方法为get
            conn.connect();
            int responseCode = conn.getResponseCode();
            if (responseCode == 200) {
                InputStream is = conn.getInputStream();
                bitmap = BitmapFactory.decodeStream(is);
                is.close();
            }
        } catch (OutOfMemoryError e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return bitmap;
    }

    private String getLocation(){
        printMsg("开始读取...");
        String location = null;
        try {
            File file = new File(this.getFilesDir(), "location.txt");
            FileInputStream fileInputStream = new FileInputStream(file);
            int length = fileInputStream.available();
            byte[] buffer = new byte[length];
            StringBuilder sb = new StringBuilder("");
            int len = 0;
            while ((len = fileInputStream.read(buffer)) > 0){
                sb.append(new String(buffer, 0, len));
            }
            fileInputStream.close();
            location = sb.toString();
        }catch (Exception e){
            location = null;
        }
        printMsg("读取成功..." + location);
        return location;
    }

    @Override
    protected void onResume() {
        super.onResume();

        // register GCM registration complete receiver
        LocalBroadcastManager.getInstance(this).registerReceiver(mRegistrationBroadcastReceiver,
                new IntentFilter(Config.REGISTRATION_COMPLETE));

        // register new push message receiver
        // by doing this, the activity will be notified each time a new message arrives
        LocalBroadcastManager.getInstance(this).registerReceiver(mRegistrationBroadcastReceiver,
                new IntentFilter(Config.PUSH_NOTIFICATION));

        // clear the notification area when the app is opened
        NotificationUtils.clearNotifications(getApplicationContext());
    }

    @Override
    protected void onPause() {
        LocalBroadcastManager.getInstance(this).unregisterReceiver(mRegistrationBroadcastReceiver);
        super.onPause();
    }
}
