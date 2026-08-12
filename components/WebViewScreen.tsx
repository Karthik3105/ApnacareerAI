import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler, ActivityIndicator, Platform, DeviceEventEmitter } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewScreen({ currentRoute, setCurrentRoute }: any) {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  
  // Track the actual URL the WebView is currently displaying
  const [actualUrl, setActualUrl] = useState(currentRoute.url);

  // When the user clicks a tab in the side drawer, currentRoute changes.
  // We explicitly tell the ONE existing WebView to navigate to the new URL!
  // This totally prevents unmounting, saving memory and perfectly sharing cookies.
  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`window.location.href = '${currentRoute.url}'; true;`);
    }
  }, [currentRoute.url]);

  // JavaScript to hide the top navigation and footers, and extract auth state
  const hideHeaderScript = `
    (function() {
      function hideHeaders() {
        try {
          const selectors = ['header', 'nav:not([class*="quiz"])', '.navbar', '.header', '#header', '.elementor-location-header', '.site-header'];
          selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              if(el) el.style.setProperty('display', 'none', 'important');
            });
          });
        } catch(e) {}
      }

      function checkAuth() {
        try {
          const url = window.location.href;
          
          // If on explicit auth pages
          if (url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/signup') || url.includes('/auth/reset_password')) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'AUTH_STATE', loggedIn: false, name: 'Profile', premium: false }));
            return;
          }

          let name = "Profile";
          let premium = false;
          let hasWelcomeGreeting = false;

          const textNodes = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, span, a, div')).map(e => e.innerText || '');
          for (let i = 0; i < textNodes.length; i++) {
             let text = textNodes[i];
             if (text.includes('Welcome, ') || text.includes('Welcome back, ') || text.includes('Hello, ') || text.includes('Hi, ')) {
                const match = text.match(/(Welcome(?: back)?|Hello|Hi),\\s*([^!\\n]+)/i);
                if (match && match[2] && match[2].trim().length < 30) {
                   name = match[2].trim();
                   hasWelcomeGreeting = true;
                   break;
                }
             }
          }

          if (document.body.innerText.includes('Premium') || document.body.innerText.includes('PREMIUM')) {
             premium = true;
          }

          const hasLogout = !!document.querySelector('a[href*="/auth/logout"]') || 
                            Array.from(document.querySelectorAll('a, button, span')).some(el => {
                              const t = (el.innerText || '').trim().toLowerCase();
                              return t === 'logout' || t === 'log out' || t === 'sign out';
                            });

          const hasLoginBtn = !!document.querySelector('a[href*="/auth/login"], a[href*="/auth/register"]') ||
                              Array.from(document.querySelectorAll('a, button')).some(el => {
                                const t = (el.innerText || '').trim().toLowerCase();
                                return t === 'login' || t === 'sign in' || t === 'sign up' || t === 'get started';
                              });

          let isLoggedIn = false;
          if (hasLogout || hasWelcomeGreeting) {
            isLoggedIn = true;
          } else if (url.includes('/dashboard') || url.includes('/payments/account') || url.includes('/resume/my-resumes')) {
            isLoggedIn = true;
          } else if (hasLoginBtn) {
            isLoggedIn = false;
          }

          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'AUTH_STATE', 
            loggedIn: isLoggedIn, 
            name: name, 
            premium: premium 
          }));
        } catch(e) {}
      }

      hideHeaders();
      checkAuth();
      setTimeout(hideHeaders, 100);
      setTimeout(checkAuth, 300);
      setTimeout(checkAuth, 1200);
    })();
    true;
  `;

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backAction = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        // Initialize with the very first URL. Future changes are handled via injectJavaScript
        source={{ uri: currentRoute.url }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        injectedJavaScript={hideHeaderScript}
        onLoadEnd={() => {
          webViewRef.current?.injectJavaScript(hideHeaderScript);
        }}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'AUTH_STATE') {
              DeviceEventEmitter.emit('authStateChanged', data);
            }
          } catch(e) {}
        }}
        renderLoading={() => (
          <ActivityIndicator color="#60a5fa" size="large" style={styles.loading} />
        )}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setActualUrl(navState.url);
          
          // When logout finishes and redirects to /auth/login or /, reset currentRoute
          // so future form submissions (like logging in) are not trapped by the logout state!
          if (currentRoute.name === 'Logout' && !navState.url.includes('/auth/logout')) {
            setCurrentRoute({
              name: navState.url.includes('/auth/login') ? 'Login' : 'Dashboard',
              url: navState.url,
              icon: 'home-outline',
              isMaterial: false,
            });
          }
        }}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -18,
  },
});
