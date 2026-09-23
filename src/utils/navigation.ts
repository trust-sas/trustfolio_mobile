import { router } from 'expo-router';

/**
 * router.back() is a silent no-op whenever the current screen has no previous
 * entry in the navigation stack — e.g. after a deep link, the OS restoring the
 * app directly to this screen, or a dev reload. Custom back/close buttons that
 * call router.back() directly then do nothing, leaving the user stuck. This
 * falls back to replacing with a sensible home route instead.
 */
export function goBack(fallbackHref: string) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackHref as never);
  }
}
