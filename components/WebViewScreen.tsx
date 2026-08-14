import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  Platform,
  DeviceEventEmitter,
  Animated,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function WebViewScreen({ currentRoute, setCurrentRoute }: any) {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [actualUrl, setActualUrl] = useState(currentRoute.url);
  const [isOffline, setIsOffline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Store the target URL so retrying loads the intended page
  const targetUrlRef = useRef(currentRoute.url);
  useEffect(() => {
    targetUrlRef.current = currentRoute.url;
  }, [currentRoute.url]);

  // Animations for popup
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Real-time ping checking
  const testConnection = async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2500);
      const res = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(id);
      return res.status >= 200 && res.status < 400;
    } catch (e) {
      return false;
    }
  };

  const verifyAndSyncNetwork = async () => {
    const online = await testConnection();
    if (!online) {
      setIsOffline(true);
    } else if (isOffline) {
      setIsOffline(false);
      if (webViewRef.current) {
        const dest = targetUrlRef.current || currentRoute.url || 'https://www.apnacareerai.in/dashboard';
        webViewRef.current.injectJavaScript(`window.location.href = '${dest}'; true;`);
      }
    }
    return online;
  };

  // Heartbeat network check (runs every 3 seconds)
  useEffect(() => {
    verifyAndSyncNetwork();
    const interval = setInterval(() => {
      verifyAndSyncNetwork();
    }, 3000);
    return () => clearInterval(interval);
  }, [isOffline]);

  // Pulse animation for offline icon
  useEffect(() => {
    let pulseLoop: Animated.CompositeAnimation | null = null;
    if (isOffline) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.22,
            duration: 850,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 850,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (pulseLoop) pulseLoop.stop();
    };
  }, [isOffline]);

  const handleRetry = async () => {
    setIsRetrying(true);
    const online = await testConnection();
    if (online) {
      setIsOffline(false);
      setIsRetrying(false);
      if (webViewRef.current) {
        const destination = targetUrlRef.current || currentRoute.url || 'https://www.apnacareerai.in/dashboard';
        webViewRef.current.injectJavaScript(`window.location.href = '${destination}'; true;`);
      }
    } else {
      setTimeout(() => {
        setIsRetrying(false);
      }, 1000);
    }
  };

  const openNetworkSettings = () => {
    if (Platform.OS === 'android') {
      Linking.sendIntent('android.settings.WIRELESS_SETTINGS').catch(() => {
        Linking.sendIntent('android.settings.WIFI_SETTINGS').catch(() => {
          Linking.openSettings();
        });
      });
    } else {
      Linking.openSettings();
    }
  };

  // When currentRoute changes, navigate
  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`window.location.href = '${currentRoute.url}'; true;`);
    }
  }, [currentRoute.url]);

  // JavaScript to hide the top navigation, footers, extract auth state
  const hideHeaderScript = `
    (function() {
      function injectResponsiveTables() {
        if (!document.getElementById('mobile-table-styles')) {
          const style = document.createElement('style');
          style.id = 'mobile-table-styles';
          style.textContent = 
            "table { width: 100% !important; max-width: 100vw !important; table-layout: fixed !important; border-collapse: collapse !important; } " +
            "th, td { padding: 4px 2px !important; font-size: clamp(9px, 2.4vw, 11px) !important; word-break: break-word !important; vertical-align: middle !important; overflow: hidden !important; text-overflow: ellipsis !important; } " +
            "th:nth-child(1), td:nth-child(1) { width: 10% !important; text-align: center !important; } " +
            "td:nth-child(1) * { font-size: 11px !important; } " +
            "th:nth-child(2), td:nth-child(2) { width: 33% !important; white-space: nowrap !important; text-align: left !important; } " +
            "th:nth-child(3), td:nth-child(3) { width: 22% !important; text-align: center !important; } " +
            "th:nth-child(4), td:nth-child(4) { width: 22% !important; text-align: center !important; } " +
            "th:nth-child(5), td:nth-child(5) { width: 13% !important; text-align: center !important; } " +
            "td:nth-child(4) * { font-size: 9px !important; font-weight: normal !important; letter-spacing: 0 !important; } " +
            "td:nth-child(4) span { padding: 2px 4px !important; border-radius: 4px !important; } " +
            "td:nth-child(4) img, td:nth-child(4) svg { width: 10px !important; height: 10px !important; max-width: 10px !important; display: inline-block !important; } " +
            ".table-responsive, .wdt-table-wrapper, figure.wp-block-table { overflow-x: hidden !important; width: 100% !important; max-width: 100vw !important; display: block !important; }";
          document.head.appendChild(style);
        }
      }

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

      function fixBadgesHeader() {
        try {
          const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, span, div, p');
          allHeadings.forEach(el => {
            const txt = (el.innerText || '').trim();
            const lower = txt.toLowerCase();
            if (
              txt === 'Your Badges' || (txt.startsWith('Your Badges') && txt.length < 20) ||
              txt === 'Top Streaks' || (txt.startsWith('Top Streaks') && txt.length < 20) ||
              lower.includes("week's activity") || lower.includes("week’s activity") || lower.includes("weeks activity") ||
              txt === 'Quick Actions' || (txt.startsWith('Quick Actions') && txt.length < 20)
            ) {
              el.style.setProperty('font-size', '14px', 'important');
            }
          });

          const allTextEls = document.querySelectorAll('span, div, p, label');
          allTextEls.forEach(el => {
            const txt = (el.innerText || '').trim();
            if (txt.includes('Auto-refresh') || txt.includes('auto-refresh')) {
              el.style.setProperty('font-size', '12px', 'important');
              el.style.setProperty('white-space', 'nowrap', 'important');
              el.style.setProperty('word-break', 'keep-all', 'important');
              el.style.setProperty('margin-top', '8px', 'important');

              const parent = el.parentElement;
              if (parent && parent.tagName !== 'BODY') {
                parent.style.setProperty('display', 'flex', 'important');
                parent.style.setProperty('flex-direction', 'column', 'important');
                parent.style.setProperty('align-items', 'stretch', 'important');
                parent.style.setProperty('justify-content', 'flex-start', 'important');
                parent.style.setProperty('width', '100%', 'important');
              }
            }
          });

          // Force subject tags to stack vertically
          const badgeTexts = ['jee', 'gate', 'physics', 'english', 'technical subject', 'maths', 'chemistry', 'biology', 'science'];
          const allElements = document.querySelectorAll('span, div, p');
          allElements.forEach(el => {
              const txt = (el.innerText || '').trim().toLowerCase();
              if (badgeTexts.includes(txt)) {
                  let parent = el.parentElement;
                  if (parent && parent.tagName !== 'BODY') {
                      const compStyle = window.getComputedStyle(parent);
                      if (compStyle.display === 'flex' && compStyle.flexDirection === 'row') {
                          parent.style.setProperty('flex-direction', 'column', 'important');
                          parent.style.setProperty('align-items', 'flex-start', 'important');
                          parent.style.setProperty('gap', '6px', 'important');
                          parent.style.setProperty('width', '100%', 'important');
                      }
                  }
              }
          });

          // Un-squish Dates
          allElements.forEach(el => {
              const txt = (el.innerText || '').trim();
              if (txt.includes('202') && (txt.includes('AM') || txt.includes('PM')) && txt.length > 10 && txt.length < 30) {
                  el.style.setProperty('white-space', 'nowrap', 'important');
                  el.style.setProperty('font-size', '11px', 'important');
              }
          });

          // Move View and Delete buttons to the BOTTOM next to the "Solved" text
          const viewButtons = Array.from(document.querySelectorAll('button, a')).filter(el => {
              const txt = (el.innerText || '').trim().toLowerCase();
              return txt === 'view' || txt.includes('view');
          });
          
          viewButtons.forEach(btn => {
              if (btn.getAttribute('data-moved')) return;
              
              // Find the container for View and Delete
              let childToMove = btn;
              let p = btn.parentElement;
              if (p && p.tagName !== 'BODY') {
                  const style = window.getComputedStyle(p);
                  if (style.display === 'flex' && !p.innerText.includes('202')) {
                      childToMove = p;
                  }
              }
              
              // Find the main top row holding tags, date, buttons
              let mainRow = btn.parentElement;
              for(let i=0; i<4; i++) {
                  if (mainRow && mainRow.tagName !== 'BODY') {
                      const style = window.getComputedStyle(mainRow);
                      if (style.display === 'flex' && style.flexDirection === 'row' && mainRow.innerText.includes('202')) {
                          break;
                      }
                      mainRow = mainRow.parentElement;
                  }
              }
              
              if (mainRow && childToMove) {
                  // The "Solved" text is located in a row BELOW the mainRow.
                  // Scan the siblings that come AFTER the mainRow to find it!
                  let solvedEl = null;
                  let sibling = mainRow.nextElementSibling;
                  while (sibling) {
                      const txt = (sibling.innerText || '').toLowerCase();
                      if (txt.includes('solved') || txt.includes('pending')) {
                          // Found the sibling containing the status text
                          const spans = sibling.querySelectorAll('span, p, div');
                          for (let j = 0; j < spans.length; j++) {
                              const spanTxt = (spans[j].innerText || '').trim().toLowerCase();
                              if ((spanTxt === 'solved' || spanTxt === 'pending' || spanTxt.includes('solved')) && spans[j].innerText.length < 20) {
                                  solvedEl = spans[j];
                                  break;
                              }
                          }
                          if (!solvedEl && (txt.trim() === 'solved' || txt.trim() === 'pending')) {
                              solvedEl = sibling;
                          }
                          break;
                      }
                      sibling = sibling.nextElementSibling;
                  }
                  
                  if (solvedEl) {
                      btn.setAttribute('data-moved', 'true');
                      
                      let solvedRow = solvedEl.parentElement;
                      if (solvedRow) {
                          solvedRow.style.setProperty('display', 'flex', 'important');
                          solvedRow.style.setProperty('flex-direction', 'row', 'important');
                          solvedRow.style.setProperty('justify-content', 'space-between', 'important');
                          solvedRow.style.setProperty('align-items', 'center', 'important');
                          solvedRow.style.setProperty('width', '100%', 'important');
                          
                          childToMove.style.setProperty('display', 'flex', 'important');
                          childToMove.style.setProperty('flex-direction', 'row', 'important');
                          childToMove.style.setProperty('gap', '10px', 'important');
                          childToMove.style.setProperty('align-items', 'center', 'important');
                          
                          solvedRow.appendChild(childToMove);
                      }
                  }
              }
          });
        } catch(e) {}
      }

      function fixExamCountdownButton() {
        try {
          const allButtons = document.querySelectorAll('button, a, div[role="button"]');
          allButtons.forEach(btn => {
            const txt = (btn.innerText || '').trim().toLowerCase();
            if (txt.includes('back to streak')) {
              btn.style.setProperty('width', '100%', 'important');
              btn.style.setProperty('display', 'block', 'important');
              btn.style.setProperty('text-align', 'center', 'important');
              btn.style.setProperty('padding', '12px 16px', 'important');
              btn.style.setProperty('margin', '16px auto', 'important');
              btn.style.setProperty('border-radius', '8px', 'important');
              btn.style.setProperty('box-sizing', 'border-box', 'important');
              btn.style.setProperty('max-width', '100%', 'important');
              
              const compStyle = window.getComputedStyle(btn);
              if (compStyle.display === 'flex' || compStyle.display === 'inline-flex') {
                  btn.style.setProperty('display', 'flex', 'important');
                  btn.style.setProperty('justify-content', 'center', 'important');
                  btn.style.setProperty('align-items', 'center', 'important');
              }
            }
          });
        } catch(e) {}
      }

      hideHeaders();
      checkAuth();
      injectResponsiveTables();
      fixBadgesHeader();
      fixExamCountdownButton();
      
      try {
        const observer = new MutationObserver(function() {
          injectResponsiveTables();
          fixBadgesHeader();
          fixExamCountdownButton();
        });
        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
        }
      } catch(e) {}

      setTimeout(hideHeaders, 100);
      setTimeout(checkAuth, 300);
      setTimeout(checkAuth, 1200);
      setTimeout(injectResponsiveTables, 2000);
      setTimeout(fixBadgesHeader, 2000);
      setTimeout(fixExamCountdownButton, 2000);
    })();
    true;
  `;

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backAction = () => {
        if (canGoBack && webViewRef.current && !isOffline) {
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
  }, [canGoBack, isOffline]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
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
        onError={() => {
          setIsOffline(true);
          setIsRetrying(false);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          if (nativeEvent.statusCode >= 500 || nativeEvent.statusCode === 0) {
            setIsOffline(true);
          }
        }}
        onLoadEnd={(syntheticEvent) => {
          const url = syntheticEvent.nativeEvent.url || '';
          const isErrorUrl = url.includes('chromewebdata') || url.includes('chrome-error') || url.startsWith('data:');
          
          setIsRetrying(false);

          if (!isErrorUrl && (url.startsWith('https://') || url.startsWith('http://'))) {
            setIsOffline(false);
            webViewRef.current?.injectJavaScript(hideHeaderScript);
          }
        }}
        onNavigationStateChange={(navState) => {
          const url = navState.url || '';
          const isErrorUrl = url.includes('chromewebdata') || url.includes('chrome-error') || url.startsWith('data:');

          if (!isErrorUrl && (url.startsWith('https://') || url.startsWith('http://'))) {
            setCanGoBack(navState.canGoBack);
            setActualUrl(url);

            if (currentRoute.name === 'Logout' && !url.includes('/auth/logout')) {
              setCurrentRoute({
                name: url.includes('/auth/login') ? 'Login' : 'Dashboard',
                url: url,
                icon: 'home-outline',
                isMaterial: false,
              });
            }
          }
        }}
        renderError={() => (
          <View style={styles.errorBackground} />
        )}
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
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Persistent Animated Offline Overlay */}
      {isOffline && (
        <View style={styles.offlineOverlay}>
          <Animated.View
            style={[
              styles.popupCard,
              {
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Animated Pulsing Wifi-Off Icon */}
            <View style={styles.iconPulseWrapper}>
              <Animated.View
                style={[
                  styles.pulseRing,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              />
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="wifi-off" size={42} color="#ffffff" />
              </View>
            </View>

            {/* Title & Description */}
            <Text style={styles.popupTitle}>No Internet Connection</Text>
            <Text style={styles.popupMessage}>
              Please turn on your Mobile Data or Wi-Fi to continue using ApnaCareerAI.
            </Text>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.retryButton}
                activeOpacity={0.8}
                onPress={handleRetry}
                disabled={isRetrying}
              >
                {isRetrying ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <>
                    <Ionicons name="refresh-outline" size={20} color="#ffffff" style={{ marginRight: 8 }} />
                    <Text style={styles.retryButtonText}>Try Again</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.settingsButton}
                activeOpacity={0.75}
                onPress={openNetworkSettings}
              >
                <Ionicons name="settings-outline" size={18} color="#2563eb" style={{ marginRight: 6 }} />
                <Text style={styles.settingsButtonText}>Turn on Wi-Fi / Settings</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  webview: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -18,
  },
  errorBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0f172a',
  },
  offlineOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 999999,
    elevation: 100,
  },
  popupCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.4,
    shadowRadius: 28,
    elevation: 30,
  },
  iconPulseWrapper: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  pulseRing: {
    position: 'absolute',
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: 'rgba(239, 68, 68, 0.22)',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  popupTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
    textAlign: 'center',
  },
  popupMessage: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 26,
    paddingHorizontal: 8,
  },
  buttonRow: {
    width: '100%',
  },
  retryButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  settingsButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  settingsButtonText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
  },
});
