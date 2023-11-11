---
title: 'Sending email via Gmail app directly (no chooser intent)'
excerpt: 'You are probably here because you want to let your users send email via the Gmail app directly. You also do not want to launch a disambiguation dialog. You are also tired of finding ways to do so that works in 2023. If that's all true, you are in the right place.'
publishDate: '2023-11-11'
tags: ['android']
---

You are probably here because you want to let your users send email via the Gmail app directly. You also do not want to launch a disambiguation dialog. You are also tired of finding ways to do so that works in 2023. If that's all true, you are in the right place.

In the `AndroidManifest.xml` file, specify the package name for the Gmail app, which is `com.google.android.gm`.

```xml
<queries>
	<package android:name="com.google.android.gm" />
</queries>
```

Without this, you would get an error like this in Logcat:

> Unable to find explicit activity class {component name}; have you declared this activity in your AndroidManifest.xml, or does your intent not match its declared <intent-filter>?

After that, you can create an explicit intent with the `ComposeActivityGmailExternal` activity that is exported by the Gmail app.

```kt
fun Context.sendEmail(email: String, subject: String, body: String) {
    val intent = Intent(Intent.ACTION_SENDTO)
        .setData(
            Uri.parse("mailto:$email?subject=${Uri.encode(subject)}&body=${Uri.encode(body)}")
        )
        .setClassName(
            "com.google.android.gm",
            "com.google.android.gm.ComposeActivityGmailExternal"
        )
    startActivity(intent)
}
```

For some reason, this activity app does not support the Intent extras such as `EXTRA_TEXT`, which is the reason why we have to construct the Uri from String instead.

## Learn More

- [Package visibility in Android 11 | Android Developers Blog](https://medium.com/androiddevelopers/package-visibility-in-android-11-cc857f221cd9)
- [Making sense of Intent filters in Android 13 | Android Developers Blog](https://medium.com/androiddevelopers/making-sense-of-intent-filters-in-android-13-8f6656903dde)
