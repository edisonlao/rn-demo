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
import com.myproject.utils.Config;
import com.myproject.utils.NotificationUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends ReactActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private BroadcastReceiver mRegistrationBroadcastReceiver;

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

                    String iconUrl = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=651475608,268057290&fm=27&gp=0.jpg";
                    String notifiMessage = intent.getStringExtra("message");
                    String notifiTitle = intent.getStringExtra("title");
//                    String notifiAddress = intent.getStringExtra("address");

                    Toast.makeText(getApplicationContext(), "Push Title: " + notifiTitle, Toast.LENGTH_LONG).show();
                    Toast.makeText(getApplicationContext(), "Push message: " + notifiMessage, Toast.LENGTH_LONG).show();

                    NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
                    PendingIntent intentPend = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
                    NotificationCompat.Builder compat = new NotificationCompat.Builder(context);
                    compat.setContentTitle(notifiTitle);
                    compat.setContentText(notifiMessage);
                    compat.setWhen(System.currentTimeMillis());
                    compat.setContentIntent(intentPend);
                    compat.setSmallIcon(R.mipmap.sendroid);
                    compat.setLargeIcon(urlToBitmap(iconUrl));
                    compat.setOnlyAlertOnce(true);
                    compat.setSound(Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.fcmsound));
                    compat.setAutoCancel(true);
                    compat.setPriority(NotificationCompat.PRIORITY_MAX);
                    Notification notification = compat.build();
                    manager.notify(1, notification);

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

    private Bitmap urlToBitmap(String imageUri){
//        Bitmap bitmap;
//        InputStream in;
//        BufferedOutputStream out;
//        try {
//            in = new BufferedInputStream(new URL(url).openStream(), Constant.IO_BUFFER_SIZE);
//            final ByteArrayOutputStream dataStream = new ByteArrayOutputStream();
//            out = new BufferedOutputStream(dataStream, Constant.IO_BUFFER_SIZE);
//            copy(in, out);
//            out.flush();
//            byte[] data = dataStream.toByteArray();
//            bitmap = BitmapFactory.decodeByteArray(data, 0, data.length);
//            return bitmap;
//        } catch (IOException e) {
//            e.printStackTrace();
//            return null;
//        }
        // 显示网络上的图片
        Bitmap bitmap = null;
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
                return bitmap;
            }
        } catch (OutOfMemoryError e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return null;
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
