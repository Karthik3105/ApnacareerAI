# Add project specific ProGuard rules here.

# React Native Core & Hermes Engine
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jniglue.** { *; }
-dontwarn com.facebook.react.**

# React Native Reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native Gesture Handler & Screens
-keep class com.swmansion.gesturehandler.** { *; }
-keep class com.swmansion.rnscreens.** { *; }

# React Native WebView
-keep class com.reactnativecommunity.webview.** { *; }
-keepclassmembers class * extends com.facebook.react.uimanager.ReactShadowNode {
  *** set*(...);
}

# Expo Modules
-keep class expo.modules.** { *; }

# Preserve React Native Annotations & Bridge Reflection
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod
-keepclassmembers class * {
  @com.facebook.react.bridge.ReactMethod *;
  @com.facebook.react.bridge.ReactProp *;
  @com.facebook.react.bridge.ReactPropGroup *;
}

